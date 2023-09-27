import 'the-new-css-reset';
import './style.css';
import './bgm';

import { clock } from './core/clock';
import { renderer } from './core/renderer';
import { sizes } from './core/sizes';
import { loneMetalSlime } from './lone-metal-slime/LoneMetalSlime';

sizes.addEventListener('resize', resize);
clock.addEventListener('tick', update);

renderer.scene.add(loneMetalSlime.mesh);

function resize() {
  renderer.resize();
}

function update() {
  loneMetalSlime.update();
  renderer.update();
}
