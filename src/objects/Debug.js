import { Object3D, BoxBufferGeometry, CylinderBufferGeometry, MeshStandardMaterial, Mesh } from 'three';

export default class Debug extends Object3D {
  constructor(detail, cfg) {
    super();

    const baseGeo = new CylinderBufferGeometry(0.2, 0.2, 4, 10);
    const baseMat = new MeshStandardMaterial(cfg.BASE.MATERIAL);
    const base = new Mesh(baseGeo, baseMat);

    const tipGeo = new CylinderBufferGeometry(0, 0.2, 0.6, 10, 10);
    const tipMat = new MeshStandardMaterial(cfg.TIP.MATERIAL);
    const tip = new Mesh(tipGeo, tipMat);

    const clickerGeo = new CylinderBufferGeometry(0.25, 0.25, 0.2, 10);
    const clickerMat = new MeshStandardMaterial(cfg.CLICKER.MATERIAL);
    const clicker = new Mesh(clickerGeo, clickerMat);

    const clickerTwoGeo = new CylinderBufferGeometry(0.21, 0.21, 0.2, 10);
    const clickerTwoMat = new MeshStandardMaterial(cfg.CLICKERTWO.MATERIAL);
    const clickerTwo = new Mesh(clickerTwoGeo, clickerTwoMat);

    base.position.x = cfg.BASE.POSITION.x;
    base.position.y = cfg.BASE.POSITION.y;
    base.position.z = cfg.BASE.POSITION.z;

    tip.position.x = cfg.TIP.POSITION.x;
    tip.position.y = cfg.TIP.POSITION.y;
    tip.position.z = cfg.TIP.POSITION.z;

    clicker.position.x = cfg.CLICKER.POSITION.x;
    clicker.position.y = cfg.CLICKER.POSITION.y;
    clicker.position.z = cfg.CLICKER.POSITION.z;

    clickerTwo.position.x = cfg.CLICKERTWO.POSITION.x;
    clickerTwo.position.y = cfg.CLICKERTWO.POSITION.y;
    clickerTwo.position.z = cfg.CLICKERTWO.POSITION.z;

    this.add(base);
    this.add(tip);
    this.add(clicker);
    this.add(clickerTwo);
  }
}
