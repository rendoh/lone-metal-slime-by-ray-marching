import 'the-new-css-reset';

import { clock } from './core/clock';
import { renderer } from './core/renderer';
import { sizes } from './core/sizes';
import { LoneMetalSlime } from './lone-metal-slime/LoneMetalSlime';

sizes.addEventListener('resize', resize);
clock.addEventListener('tick', update);

const loneMetalSlime = new LoneMetalSlime();
renderer.scene.add(loneMetalSlime.mesh);

function resize() {
  renderer.resize();
}

function update() {
  loneMetalSlime.update();
  renderer.update();
}
