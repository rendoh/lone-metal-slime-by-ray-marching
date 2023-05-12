import * as THREE from 'three';

export class DirectionalLightingSample {
  public readonly mesh: THREE.Mesh;
  private material: THREE.ShaderMaterial;
  constructor() {
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
      },
    });
    this.mesh = new THREE.Mesh(geometry, this.material);
  }
  public dispose() {
    this.material.dispose();
  }
  public update() {
    this.material.uniforms.uTime.value += clock.delta;
  }
}
