# \<lit-gauge>
<img src="https://thewebkid.com/lit-gauges.png?v=1" width=800>
A snazzy gauge to visualize telemetry. If I can wind my way through the 100s of different customizations, edge cases, error handling, tests... I will package this up on npm!

The following assumes I have created a lit-gauge NPM package (not yet)

## Installation

```bash
npm i lit-gauge
```

## Usage Examples
Declaratively set attributes inline like this:

```html

<script type='module'>
  import {LitGauge} from 'lit-gauge';
</script>
<lit-gauge
  id=small size="200"
  scaleValues="0,5,20,65,80,90,100" scaleColors="#0909FB,#1EB3B3,#375a7f,#444,#777,#999"
  fluidcolors="true" ticks="5" minorTicks="5" value="40" valuePrecision="1"
>
</lit-gauge>
<lit-gauge
  id=large size="300"
  scaleColors="blue,aqua,green,yellow,red"
  fluidcolors="true" ticks="10" minorTicks="5" value="60" label="AMPS"
  valuePrecision="1"
>
</lit-gauge>

<lit-gauge
  id=med size="250"
  scaleValues="25000,40000,55000,65000,70000,75000"
  scaleColors="#999,#ccc,#D85F03,#a00,#ff7b7b"
  ticks="thresholds" value="60" label="RPM"
  tickLabels="25k,35k,45k,55k,65k,75k"
  valuePrecision="0"
>
</lit-gauge>
<br>
<lit-gauge
  id=white size="200"
  scaleValues="0,5,20,65,80,90,100" scaleColors="#0909FB,#1EB3B3,#375a7f,#444,#777,#999"
  plain="true" ticks="5" minorTicks="5" value="40" valuePrecision="1"
>  
```
## Usage with single options object
```html
<script type='module'>
  import {LitGauge} from 'lit-gauge';

  let g = document.querySelector('lit-gauge');
  g.options = {
    scaleValues: [50, 60, 70, 115, 130, 150],
    scaleColors: ['midnightblue','blue','green','yellow','rgba(255,0,0,1)'],
    ticks: 10, minorTicks: 5,
    fluidColors: false, plain: true, 
    valuePrecision: 1
  }
</script>
```
## Attributes
- **size**: _Number_ - Sets the height and width of the component. This component is square. It starts to look bad below 150px.
- **scaleValues**: _String_ - `(scaleValues="0,10,50,90,100")` Sets the value ranges that will correspond with the color thresholds.
- **scaleColors**: _String_ - `(scaleColors="#333,#888,#ccc")` Sets the colors that fill each value range. Must be exactly one value less than the scaleValues attrib. If you set a `scaleValue=0,10,20,30` then you have created 3 ranges (thresholds) that require a color. scaleColors=#333,#888,#ccc would set 0-10 to #333, 10-20 to #888, and 20-30 to #ccc. Use any valid css color string for each value.  
- **fluidColors**: _Boolean_ - Shows a fluid gradient instead of hard stops for the color ranges.
- **ticks**: _String_ - `(ticks="10")` Accepts either a numeric divisor (represents the total count of ranges created by the tick marks), or a csv value string representing custom value positions to place ticks (minor ticks will be disabled). Optionally you can enter ticks="thresholds" to place ticks on the scaleValues attrib values. The tick mark total will be one greater than the value you enter since the ranges are bounded on both sizes by marks.
- **minorTicks**: _Number_ - `(minorTicks=5)` Available only when ticks is a numeric value. Subdivides each tick range by the specified value.
- **value**: _Number_ - `(value=runtimeValue)` The runtime value that positions the needle and sets the runtime color value. 
- **label**: _String_ - `(label=volts)` The runtime label to display below the value. If unspecified, the value moves upwards. Will make this much more configurable at some point.
- **plain**: _Boolean_ - Overrides the lighted glassy appearance. Uses a flat look. You can also do this with the css variables shown below.
- **decimalPrecision** _Int_ - For readability the label displays value.toFixed(decimalPrecision). If you have a suggestion for large numbers, please open an issue and share! 



## Styling
To set custom colors and appearance
```html
<style>
lit-gauge{
  --font-fam: Roboto, -apple-system, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  
  --outer-color:#444;//this is the outermost background ring
  //outer-lighting is the lighting effect on the outer band. Uses a conic semi-opaque gradient overlay.
  --outer-lighting-effect:conic-gradient(from 180deg at 50.0% 50.0%,
    rgba(0,0,0,0) 98.00deg,
    rgba(255,255,255,0.3) 103.00deg,
    rgba(255,255,255,0.5) 180.00deg,
    rgba(255,255,255,0.3) 257.00deg,
    rgba(0,0,0,0) 265.00deg
  );
  
  // styles for the label at the bottom center
  --label-bg: #000; // the label that shows the current value inside
  --label-color:#fff; // font color of the label
  --label-min-width:3em; // customize to your value so the container does not jiggle when updating the value
  
  // ticks/label styles
  --tick-color:#fff; //the tick line color
  --tick-label-color:#fff;// the outer numeric tick label colors
  --tick-label-shadow:0 1px 1px black;//shadow to apply to the tick-labels to enhance visibility
  
  //dial styles
  --dial-background:rgb(22,22,22);//the main inner color
  --dial-gradient:none;//you can play with gradients to create your own lighting effect
  --dial-shadow: 0 0 1em .25em rgba(122,122,122,.8), inset 0 0 2em #bbb;//used to enhance the space between the color thresholds.
  --dial-border-width: 1px;//the dial border is where the outer ring meets the color threshold bands
  --dial-border-color:#111;
  --hand-color: #ddd; //the needle color
}
</style>
```

## Run local
```bash
npm dev
```

I am open to work if you need a dev like me. Snatch me up. My linkedIn is on thewebkid.com :)
