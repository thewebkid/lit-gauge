import {css} from 'lit';

export const guageStyles = css`
  :host {
    --font-fam:  Roboto, -apple-system, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    --outer-color:#444;
    --hand-color: #ddd;
    --outer-lighting-effect:conic-gradient(from 180deg at 50.0% 50.0%,
      rgba(0,0,0,0) 98.00deg,
      rgba(255,255,255,0.3) 103.00deg,
      rgba(255,255,255,0.5) 180.00deg,
      rgba(255,255,255,0.3) 257.00deg,
      rgba(0,0,0,0) 265.00deg
    );
    --label-bg: #000;
    --label-color:#fff;
    --tick-color:#fff;
    --tick-label-color:#fff;
    --tick-label-shadow: 0 1px 1px black;
    --dial-background:rgb(22,22,22);
    --dial-gradient:none;
    --dial-shadow: 0 0 1em .25em rgba(122,122,122,.8), inset 0 0 2em #bbb;
    --dial-border-width: 1px;
    --dial-border-color:#111;
    --label-min-width:3em;
  }
  :host *{
    box-sizing: border-box;
    font-family: var(--font-fam);
    font-weight: 400;
  }
  :host .outer-gauge {
    background: transparent;
    border: none;
    box-shadow: none;
    display: inline-block;
    border-radius: 50%;
  }
  :host .outer-gauge.no-lighting  .gauge-wrap{
    background-image:none;
  }
  :host .outer-gauge .gauge-wrap {
    color:white;
    transform: scale(-1, 1);
    position: relative;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    padding: 10%;
    background-color: var(--outer-color);
    background-image: var(--outer-lighting-effect);
  }
  :host .hand {
    background: var(--hand-color);
    height: 65%;
    left: 47.5%;
    position: absolute;
    top: 5%;
    transform-origin: 50% 69%;
    width: 5%;
    z-index: 3;
    clip-path: polygon(50% 0, 100% 95%, 50% 100%, 0 95%, 50% 0);
    box-shadow: 2px 10px 2px #333;
  }
  :host .tick {
    width: 0px;
    height: 100%;
    font-weight: 100;
    top: 50%;
    left: 50%;
    position: absolute;
    z-index: 11;
  }
  :host .tick:before {
    line-height:.5;
    content: attr(v);
    position: absolute;
    height: 5%;
    bottom: 91%;
    text-align: center;
    width: 80px;
    margin-left: -40px;
    vertical-align: text-bottom;
    display: inline-block;
    text-shadow:var(--tick-label-shadow);
    color:var(--tick-label-color);
  }
  :host .tick.flip:before {
    transform: scale(1, -1);
  }
  :host .tick:after {
    content: '';
    position: absolute;
    background-color: var(--tick-color);
    width: 1px;
    height: 5%;
    bottom: 80%;
  }
  :host .tick.minor:after {
    width: .7px;
    height: 2.5%;
    bottom: 82.2%;
  }
  :host div.dial {
    position: relative;
    border-radius: 50%;
    height: 100%;
    width: 100%;
    border-style:solid;
    border-width:var(--dial-border-width);
    border-color:var(--dial-border-color);
    box-shadow: var(--dial-shadow);
    background-color: var(--dial-background);
  }
  :host .no-lighting div.dial{
    box-shadow: none;
  }
  :host div.dial .lbl {
    transform: scale(-1, 1);
    width: 100%;
    margin: 2px auto;
    position: absolute;
    bottom: -27%;
    padding: 10%;
    left:2.5px;
    text-align: center;
    white-space: nowrap;
    z-index: 3;
    color:var(--label-color);
  }
  :host div.dial .lbl.plain{
    bottom:0;
  }
  :host .lbl span {
    border-radius: 36%;
    padding: 2px 10px;
    min-width: var(--label-min-width);
    display: inline-block;
    background-color:var(--label-bg);
    text-shadow: 0 1px 1px #fff;
  }
  :host div.dial:before {
    content: '';
    background: #fff radial-gradient(ellipse at center, rgba(0, 0, 0, .7) 0%, rgba(0, 0, 0, 1) 18%, rgba(0, 0, 0, 0) 22%, rgba(0, 0, 0, 0.65) 100%);
    border-radius: 50%;
    border: solid 2px #fff;
    height: 8%;
    width: 8%;
    position: absolute;
    display: inline-block;
    top: 49%;
    left: 49%;
    margin:-4%;
    z-index: 4;
   }
  :host .color-band {
    position: absolute;
    border-radius: 50%;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 2;
    transform: scale(-1, 1);

  }
  :host .color-band:before {
    content: " ";
    position: absolute;
    top: 7%;
    left: 10%;
    height: 43%;
    width: 80%;
    border-radius: 50% 50% 50% 50%/75% 75% 25% 25%;
    box-shadow: inset 0 -.6em 1.35em rgba(255, 255, 255, .3),inset 0 -.1em .2em rgba(255, 255, 255, .3), inset 0 .5em 2.2em rgba(255, 255, 255, .5);
    background-color:rgba(255,255,255,.1);
    z-index: 11;
    opacity:.6;

  }
  :host .no-lighting .color-band:before{
    display: none;

  }
  :host .no-lighting .color-band:after{
    background-image: none;
    box-shadow: none;
  }
  :host .color-band:after {
    content: '';
    position: absolute;
    border-radius: 50%;
    height: 88%;
    width: 88%;
    top: 6%;
    left: 6%;
    background: var(--dial-background);
    background-image:var(--dial-gradient);
  }
`
