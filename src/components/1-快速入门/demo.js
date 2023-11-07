import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

//材质对象Material
const material = new THREE.MeshPhongMaterial({
    color: 0x00ffff, //设置材质颜色
    side: THREE.DoubleSide,
    shininess: 20, //高光部分的亮度，默认30
    specular: 0x555555, //高光部分的颜色
});

// 圆柱
const geometry = new THREE.CylinderGeometry(50, 50, 100);
const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
mesh.position.set(0, 0, 0);
scene.add(mesh); //网格模型添加到场景中

// 光源
const pointLight = new THREE.PointLight(0xffffff, 10);
pointLight.position.set(300, 300, 300);
pointLight.decay = 0.2;
scene.add(pointLight);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(800, 800, 800);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
    antialias: true, // 锯齿模糊
});
renderer.setClearColor(0x444444, 1); //设置背景颜色
renderer.setSize(width, height);

const axesHelper = new THREE.AxesHelper(100); // AxesHelper：辅助观察的坐标系
scene.add(axesHelper);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 5);
scene.add(pointLightHelper);

new OrbitControls(camera, renderer.domElement);

export { scene, mesh, camera, renderer };
