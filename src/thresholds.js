import {Color} from 'modern-color';
import {isType} from './my-type.js';


class DataItem{
  constructor(min=null, max=null) {
    this.min = min;
    this.max = max;
  }
  static create(scaleValues, min=null, max=null, initialVal){
    min = min ?? Math.min(...scaleValues);
    max = max ?? Math.max(...scaleValues);
    let inst = new DataItem(min,max);
    inst.val = initialVal;
    return inst;
  }
  get spread(){
    return this.max - this.min;
  }
  get valAtPct(){//expects float: 0-1
    return pct => this.min + (this.spread * pct);
  }
  get pctAtVal(){
    return val => (val-this.min)/this.spread;
  }
  get pct(){
    return (this._val - this.min) / this.spread;
  }
  get cssPct(){
    return `${(this.pct * 100).toFixed(1)}%`;
  }
  get val(){return this._val;}
  set val(v){
    this._val = v;
  }
}

const parseValuesAttrib = (attr, errorCallback) => {
  let isPercent = false;
  if (attr.split(',').length < 2){
    errorCallback('scale', 'invalid scaleValues attribute string');
    return null;
  }
  const values = attr.split(',').map((v,i) => {
    v = v.trim();
    if (!i){
      isPercent = v.endsWith('%');
    }

    if (v.endsWith('%')){
      if (i && !isPercent){
        errorCallback('scale', 'Error: mixture of percent and number values found in scaleValues')
      }
      v = Number(v.replace('%','')) / 100;
      if (v < 0 || v > 100){
        errorCallback('scale', `Percentage scale values must begin with 0% and end with 100%`)
      }
    }else{
      if (i && isPercent){
        errorCallback('scale', 'Error: mixture of percent and number values found in scaleValues')
      }
      v = Number(v);
    }
    if (isNaN(v)){
      errorCallback('scale', 'Error parsing scale values. Enter comma-separated scale from low to high. Append with % for a percent scale')
    }
    return v;
  });
  return values;
}
export class Thresholds {
  constructor(stops, {fluid, reversed, dataItem} = {}){
    this.fluid = fluid;
    this.reversed = reversed;
    this.dataItem = dataItem;
    this.initInputs(stops);
  }

  static fromScaleAttributes(args, errorCallback) {
    let {values, colors, min, max, fluid} = args;
    let valid = true;
    //let isPercent = false;
    let errHandler = (type,msg)=>{
      valid = false;
      errorCallback(type,msg);
    }
    values = Array.isArray(values) ? values : parseValuesAttrib(values, errHandler);
    if (!valid){
      return null;
    }
    const dataItem = DataItem.create(values,min,max);
    colors = Array.isArray(colors) ? colors.map(c => Color.parse(c)) : colors.split(',').map(c => Color.parse(c.trim()));
    if (colors.length === values.length -1){

      let stops = colors.map((color,i) => ({
        color,
        pos: dataItem.pctAtVal(values[i])
      }));
      return new Thresholds(stops, {fluid,dataItem});
    }else{
      errHandler('scale', 'colors.length should be scaleValues.length - 1.')
    }
  }

  initInputs(stops){


    let inputs = Array.isArray(stops[0]) ? [...stops].map(s => {

      return {pos: Number(s[0]), color: Color.parse(s[1]), lbl: s[2]};
    }) : [...stops];
    try {
      inputs = sortByKey(inputs, 'pos');
      if (this.reversed){
        inputs = inputs.reverse();
      }
      this.inputs = inputs.map((inp, i) => {
        inp.index = i;
        return inp;
      });

    }catch (ex){
      console.warn({inputsSort: ex, inputs});
    }
  }


  get spread(){
    //let {min, max} = this.parent;
    return this.dataItem.spread;
  }
  get posFromVal(){
    return (v) => {
      if (isType.nullOrUndef(v)){
        return this.dataItem.pct;
      }
      let {min, max} = this.dataItem;
      let pos =  (v - min) / (max - min) ;

      return Math.max(0, Math.min(pos, 1));
    };
  }
  getColor(pos, compute){
    if (compute){
      pos = this.posFromVal(pos);
    }
    if (isNaN(pos)){
      return '#ccc';
    }
    let i1 = this.stops.findIndex(s => s.pos >= pos);
    if (pos <= 0 || !i1){
      return this.colors[0];
    }
    if (i1 === -1){
      return this.colors[this.colors.length - 1];
    }
    let i2 = Math.max(0, i1 - 1);
    if (!this.fluid){
      return this.stops[i2]?.color;
    }
    let {stops, positions} = this;
    let c1 = stops[i1].color;
    let c2 = stops[i2].color;
    let p1 = stops[i1].pos;
    let p2 = stops[i2].pos;
    let ratio = (pos - p1) / (p2 - p1);
    if (isNaN(ratio)){
      console.warn({p1, p2, pos, positions, i1, i2});
    }
    return Color.parse(c1).mix(c2, ratio);
  }

  get valFromPos(){
    return pos => {
      if (!this.dataItem?.valAtPct){
        return pos * 100;
      }
      return this.dataItem.valAtPct(pos);
    };
  }
  get ticks(){
    return [...this.positions.map(p => this.valFromPos(p)), this.dataItem.max];
  }
  get positions(){
    return this.inputs.map(s => s.pos);
  }
  get colors(){
    //this.log('colors', this.id);
    return this.inputs.map(s => s.color);
  }

  get stops(){
    //this.log('stops', this.id);
    let {inputs, fluid} = this;
    inputs = [...inputs, {pos: 1, color: inputs[inputs.length-1].color}];

    if (fluid){
      let last = inputs.length-1;
      const midPoint = i => {
        let p1 = inputs[i].pos;
        if (p1 === 1){
          return p1;
        }
        let p2 = inputs[i + 1]?.pos ?? 1;
        let d = p2 - p1;
        return p1 + (d / 2);
      };
      return this.inputs.map((stop, i) => {
        return {
          color: stop.color,
          pos: midPoint(i)
        };
      });
    }
    return this.inputs.flatMap(({color, pos}, i) => {
      return [
        {color, pos},
        {color, pos: this.inputs[i + 1]?.pos ?? 1}
      ];
    });
  }
  get scaledStops(){
    return (min, max,adjRatio = 1, off = 0) => {
      let difMin = this.dataItem.min - min;
      let difMax = max - this.dataItem.max;
      let newSpread = this.spread + difMax + difMin;
      let vals = this.stops.map(s => this.valFromPos(s.pos));
      vals[0] = min;
      if (this.fluid){
        vals.push(this.dataItem.max)
      }
      let zeroed = vals.map(v => v - min);

      let stops = [...this.stops];
      if (this.fluid) {//prevent early fade-out
        let last = {color: stops[stops.length - 1].color, pos: 1};
        stops.push(last);
      }
      let positions = zeroed.map(v => off + ((v / newSpread) * adjRatio));
      let s = stops.map((s, i) => {
        return `${s.color} ${(positions[i] * 100).toFixed(1)}%`;
      });

      return s
    };
  }
  get stopCss(){
    //console.log('stopCss',this.id)
    return this.stops.map(({color, pos}) => `${color} ${(pos * 100).toFixed(1)}%`).join(', ');
  }

}

const sortByKey = (arr, k) => arr.sort((a, b) => {
  let a1 = k === undefined ? a : a[k];
  let b1 = k === undefined ? b : b[k];
  if (!isNaN(a1) && !isNaN(b1)) {
    return a1 - b1;
  }
  else if (typeof a1 === 'string' && typeof b1 === 'string'){
    return a1 < b1 ? -1 : a1 > b1 ? 1 : 0;
  }
});
