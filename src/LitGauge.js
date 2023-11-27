import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import {guageStyles} from './css.js';
import {Thresholds} from './thresholds';
import {isType} from './my-type.js';

export const px = n => `${n}px`;
export class LitGauge extends LitElement {
  static styles = guageStyles;

  static properties = {
    size: { type: Number }, //50-1000
    scaleValues: {type: String}, //0,10, 40, 65, 90,100
    scaleColors: {type: String}, //blue, aqua, green, yellow, red
    value: { type: Number }, //50
    fluidColors: { type: Boolean }, //false
    label: {type: String}, //RPM
    ticks: { type: String}, //thresholds, auto, or csv: 20,40,60,80
    tickLabels: {type: String}, // optional
    thresholds: {type: Object},
    minorTicks: {type: Number},
    plain: {type: Boolean},
    valuePrecision: {type: Number},
    setDynamicOuterColor: {type: Boolean},
    options: {type: Object}
  };

  constructor() {
    super();
    this.size = 300;
    this.scaleValues = `0,10,20,70,80,90,100`;
    this.scaleColors = '#666, #888, green, yellow, orange, red';
    this.value = 0;
    this.valuePrecision = 0;

    //this.fluidColors = true;
    this.ticks = '10';//'0,10,20,30,40,50,60,70,80,90,100';
    this.minorTicks = 5;

    //this.label = 'Degrees'
    this.errors = [];
    this.hasErrors = false;
  }
  errorHandler(type, message){
    console.error({[type + 'Error']: message});
    this.errors.push({[type + 'Error']: message});
    this.hasErrors = true;
  }

  initThresholds(debug){
    let {scaleValues, scaleColors, min, max, fluidColors} = this;
    const thresholdArgs = {
      values: scaleValues,
      colors: scaleColors,
      min, max, fluid: fluidColors
    };
    if (debug){
      debugger;
    }
    const errCallback = (type, message) => this.errorHandler(type, message);
    this.thresholds = Thresholds.fromScaleAttributes(thresholdArgs, errCallback);
    if (!this.errors.length){
      this.ticks = this.tickAttr;
    }
  }

  willUpdate(props) {
    if (this.thresholds) {
      if (props.has('fluidColors')) {
        this.thresholds.fluid = this.fluidColors;
        //console.log(this.thresholds);
      }
      const reinit = ['scaleColors','scaleValues', 'minorTicks'].some(key=>props.has(key));
      if (reinit) {
        this.initThresholds();
      }
    }
    if (props.has('options')){
      // overwrite attribs
      Object.entries(this.options).forEach(([k, v]) => {
        this[k] = v;
      });
      this.initThresholds();
    }
    super.willUpdate(props);
  }

  firstUpdated(){
    this.initThresholds();
  }

  get ticks(){
    return this._ticks;
  }
  set ticks(v){
    this.tickAttr = v;
    if (!this.thresholds){
      return;
    }

    let ticks;
    if (!v || v === 'thresholds'){
      ticks = this.thresholds.ticks;
      v = 'thresholds';
    }
    else if (isType.snum(v) || !v.includes(',')){
      ticks = [];
      let count = Number(v);
      let incr = this.spread / count;
      for (let val = this.min; val < this.max; val += incr){
        ticks.push(val);
      }
      ticks.push(this.max);
    }
    else {
      ticks = v.split(',').map(t => Number(t)).filter(t => isFinite(t));
    }

    let minor = [];
    if (v !== 'thresholds' && isFinite(this.minorTicks)){
      let mtCount = this.minorTicks;
      ticks.slice(0, ticks.length - 1).forEach((t, i) => {
        let next = ticks[i + 1];
        let spread = next - t;
        let incr = spread / mtCount;

        for (let v = t + incr; v < next; v += incr){
          minor.push({v, d: this.val2Deg(v)});
        }
      });

    }
    this._minor = minor;
    this._ticks = ticks.map(v => {
      const d = this.val2Deg(v);
      return {d, v};
    });

  }

  get minor(){
    return this._minor ?? [];
  }

  get min(){
    return this.thresholds?.dataItem.min;
  }
  get max(){
    return this.thresholds?.dataItem.max;
  }
  get tickSize() {
    return px((9 + (this.size / 33)).toFixed(1));
  }
  get transform() {
    return (d, scale = true, flipped = true) => {
      //flipped = scale && Math.abs(d) > 100;
      if (flipped) {
        if (d > 0) {
          d = 0 - d;
        } else {
          d = Math.abs(d);
        }
      }
      return `${flipped ? 'scale(-1, 1)' : ''} translateX(-100%) translateY(-50%) rotate(${d}deg)`;
    };
  }

  get val2Deg() {
    return v => {
      let degSpread = 270;
      let vdeg = (1 - ((v - this.min) / this.spread));
      return (Math.max(0, Math.min(degSpread, vdeg * degSpread)) % 360) - 136;

    };
  }
  get spread(){
    return this.thresholds?.dataItem.spread;
  }

  get outerClass(){
    return {
      'outer-gauge': true,
      'no-lighting': this.plain
    };
  }

  get outerStyle(){
    let {size, setDynamicOuterColor} = this;
    let style = {
      height: px(size),
      width: px(size),
      padding: px((size / 40).toFixed(1))
    };
    if (setDynamicOuterColor){
      style['--outer-color'] = this.valueColor;
    }
    return style;
  }

  get flipClass(){
    return (i, maj) => {
      return {
        flip: !i || (maj && i === this.ticks.length - 1),
        tick: true,
        maj, minor: !maj
      };
    };
  }
  get labelClass(){
    return {
      lbl: true,
      plain: !this.label
    };
  }

  get tickAt(){
    return i => {
      if (this.tickLabels){
        return this.tickLabels.split(',')[i];
      }
      let t = this.ticks[i];
      return (Math.round(t.v * 10) / 10).toLocaleString();
    };
  }
  get fontSize(){
    return {
      fontSize: this.tickSize
    };
  }
  get labelStyle(){
    const {valueColor, fontSize} = this;
    return  {
      boxShadow: this.plain ? 'none' : `inset 0 -4px 8px ${valueColor}`,
      outline: this.plain ? `2px solid ${valueColor}` : 'none',
      paddingBottom: px(3),
      borderRadius: this.plain ? '.41em' : '.5em',
      ...fontSize
    };
  }

  get dialGradient(){
    /*if (!this.thresholds){
      return {}
    }*/
    let stops = this.thresholds.scaledStops(this.min, this.max, .75, .125);
    let conic = 'conic-gradient(from 181deg, rgba(1,1,1,0) 12%,';
    return {background: `${conic} ${stops.join(', ')}, rgba(1,1,1,0) 88%)`};
  }
  get tickStyle(){
    return (t, i) => {
      let {tickSize, transform, ticks} = this;
      return {
        fontSize: tickSize,
        transform: transform(t.d, true, !(i === 0 || i === ticks.length - 1))
      };
    };
  }
  get valueColor(){
    const {thresholds, value} = this;
    return thresholds.getColor(thresholds.dataItem.pctAtVal(value));
  }
  render() {
    if (!this.thresholds){
      return html``;
    }

    const {dialGradient, flipClass, labelStyle,
      outerStyle, fontSize, value, outerClass,
      labelClass, label, valuePrecision,
      tickStyle, tickAt, ticks, minor, val2Deg} = this;

    const handStyle = {transform: `rotate(${val2Deg(value)}deg)`};

    return html`
      <div class=${classMap(outerClass)} style=${styleMap(outerStyle)}>
        <div class="gauge-wrap">
          ${ticks?.map((t, i) => html`
            <div class="${classMap(flipClass(i, true))}" style="${styleMap(tickStyle(t, i))}" v="${tickAt(i)}"></div>`)}
          ${minor?.map((t, i) => html`
            <div class="${classMap(flipClass(i, false))}" style="${styleMap(tickStyle(t, i))}" v=""></div>`)}


          <div class="hand" style="${styleMap(handStyle)}"></div>
          <div class="dial">
            <div class="color-band" style="${styleMap(dialGradient)}"></div>
            <div class="dial-border"></div>
            <div class="${classMap(labelClass)}">
              <span style="${styleMap(labelStyle)}">
                <strong style="${styleMap(fontSize)}">
                  ${Number(value.toFixed(valuePrecision)).toLocaleString('en-US')}
                </strong><br>${label}

              </span>
        </div>
      </div>
    </div>
  </div>
    `;
  }
}

customElements.define('lit-gauge', LitGauge);
