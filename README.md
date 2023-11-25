# \<lit-gauge>

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

Run local
```bash
npm dev
```
