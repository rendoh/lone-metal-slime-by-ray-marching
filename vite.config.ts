import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  base: '/lone-metal-slime-by-ray-marching/',
  plugins: [glsl()],
});
