import * as THREE from 'three';

import { clock } from '../core/clock';
import { sizes } from '../core/sizes';
import fragmentShader from './fragment.glsl';
import vertexShader from './vertex.glsl';

const geometry = new THREE.PlaneGeometry(2, 2, 1, 1);

const resolution = new THREE.Vector2(
  sizes.width * sizes.pixelRatio,
  sizes.height * sizes.pixelRatio,
);
const mouse = new THREE.Vector2();
window.addEventListener('mousemove', ({ clientX, clientY }) => {
  mouse.x = (clientX / sizes.width) * 2 - 1;
  mouse.y = -(clientY / sizes.height) * 2 + 1;
});
window.addEventListener(
  'touchmove',
  (e) => {
    e.preventDefault();
    mouse.x = (e.touches[0].clientX / sizes.width) * 2 - 1;
    mouse.y = -(e.touches[0].clientY / sizes.height) * 2 + 1;
  },
  {
    passive: false,
  },
);

function lerp(x: number, y: number, p: number) {
  return x + (y - x) * p;
}

function beta(p: number, delta: number) {
  return 1 - Math.pow(1 - p, 60 * (delta / 1000));
}

class LoneMetalSlime {
  public readonly mesh: THREE.Mesh;
  private material: THREE.ShaderMaterial;
  private abortController = new AbortController();
  private bounceStrength = 0;
  private mouthClosedness = 0;
  constructor() {
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: clock.elapsed },
        uMouse: { value: mouse },
        uResolution: { value: resolution },
        uBounce: { value: 0 },
        uMouthClosedness: { value: 0 },
      },
    });
    this.mesh = new THREE.Mesh(geometry, this.material);
    sizes.addEventListener(
      'resize',
      () => {
        resolution.x = sizes.width * sizes.pixelRatio;
        resolution.y = sizes.height * sizes.pixelRatio;
      },
      {
        signal: this.abortController.signal,
      },
    );
  }

  public update() {
    this.material.uniforms.uTime.value = clock.elapsed;

    this.bounceStrength = lerp(this.bounceStrength, 0, beta(0.2, clock.delta));
    this.material.uniforms.uBounce.value = lerp(
      this.material.uniforms.uBounce.value,
      this.bounceStrength,
      beta(0.3, clock.delta),
    );

    this.mouthClosedness = lerp(
      this.mouthClosedness,
      0,
      beta(0.3, clock.delta),
    );
    this.material.uniforms.uMouthClosedness.value = lerp(
      this.material.uniforms.uMouthClosedness.value,
      this.mouthClosedness,
      beta(0.8, clock.delta),
    );
  }

  public bounce() {
    this.bounceStrength = 0.225;
  }

  public openMouth() {
    this.mouthClosedness = 0.4;
  }

  public dispose() {
    this.material.dispose();
    this.abortController.abort();
  }
}

export const loneMetalSlime = new LoneMetalSlime();
