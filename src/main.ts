import 'the-new-css-reset';

import { clock } from './core/clock';
import { renderer } from './core/renderer';
import { sizes } from './core/sizes';
import { Example } from './example';

sizes.addEventListener('resize', resize);
clock.addEventListener('tick', update);

const example = new Example();
renderer.scene.add(example.mesh);

function resize() {
  renderer.resize();
}

function update() {
  example.update();
  renderer.update();
}
