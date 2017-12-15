import { Object3D, PlaneBufferGeometry, MeshLambertMaterial, Mesh, DoubleSide, MultiplyBlending } from 'three'
import { WORLD_CONFIG } from '../constants';

export default class Smoke extends Object3D {
  constructor(texture) {
    super()

    const geometry = new PlaneBufferGeometry(2, 2);
    const material = new MeshLambertMaterial({  map: texture, transparent: true });
    const mesh = new Mesh(geometry, material)

    for (let index = 0; index < 100; index++) {
      const mesh = new Mesh(geometry, material);
      mesh.rotation.z = Math.random() * 360;
      mesh.position.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 10 - 10);
      this.add(mesh);
    }
  }
}
