# \<lit-gauge>
<img src="https://thewebkid.com/lit-gauges.png" width=600>
A snazzy gauge to visualize telemetry. If I can wind my way through the 100s of different customizations, edge cases, error handling, tests... I will package this up on npm!



## Installation

```bash
npm i lit-gauge
```

## Usage

```html
<script type='module' src="index.js"></script>
<lit-gauge
  size="200"
  scaleValues="0,5,20,65,80,90,100" scaleColors="#555,#999,green,yellow,orange,red"
  fluid-colors="false" ticks="5" minorTicks="5" value="40"
>
</lit-gauge>
<lit-gauge
  size="300"
  scaleValues="50,60,70,115,140,150" scaleColors="blue,aqua,green,yellow,red"
  fluidcolors="true" ticks="10" minorTicks="5" value="60" label="RPS"
>
</lit-gauge>
```
## Attributes
- **size**: _Number_ - Sets the height and width of the component. This component is square. It starts to look bad below 150px.
- **scaleValues**: _String_ - `(scaleValues="0,10,50,90,100")` Sets the value ranges that will correspond with the color thresholds.
- **scaleColors**: _String_ - `(scaleColors="#333,#888,#ccc")` Sets the colors that fill each value range. Must be exactly one value less than the scaleValues attrib. If you set a `scaleValue=0,10,20,30` then you have created 3 ranges (thresholds) that require a color. scaleColors=#333,#888,#ccc would set 0-10 to #333, 10-20 to #888, and 20-30 to #ccc. Use any valid css color string for each value.  
- **fluidColors**: _Boolean_ - Shows a fluid gradient instead of hard stops for the color ranges.
- **ticks**: _String_ - `(ticks="10")` Accepts either a numeric divisor (represents the total count of ranges created by the tick marks), or a csv value string representing custom value positions to place ticks (minor ticks will be disabled). Optionally you can enter ticks="thresholds" to place ticks on the scaleValues attrib values. The tick mark total will be one greater than the value you enter since the ranges are bounded on both sizes by marks.
- **minorTicks**: _Number_ - `(minorTicks=5)` Available only when ticks is a numeric value. Subdivides each tick range by the specified value.
- **value**: _Number_ - `(value=runtimeValue)` The runtime value that positions the needle and sets the runtime color value. 
- **label**: _String_ - `(label=volts)` The runtime label to display below the value. If unspecified, the value moves upwards. Will make this much more configurable at some point


## Run local
```bash
npm dev
```

### Todos
Ability to set values as props or a single config data object. Parsing declared string attribs is fine, but feels hacky.

Need to add deep rich themeability, value precision (there will be limitations to what can be displayed - but defer to a percentage should solve this case). 

Testing

