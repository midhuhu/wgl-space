<template></template>

<script setup>
import { onMounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

//材质对象Material
const material = new THREE.MeshPhongMaterial({
    color: 0x00ffff,
});
material.transparent = true; //开启透明
material.opacity = 0.5; //设置透明度
material.side = THREE.DoubleSide;

// 长方体
const geometry = new THREE.BoxGeometry(100, 100, 100);
const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
mesh.position.set(-50, 50, -50);
scene.add(mesh); //网格模型添加到场景中

const mesh2 = mesh.clone();
mesh2.position.set(50, 50, 50);
scene.add(mesh2);

// rotation
const Euler = new THREE.Euler(Math.PI / 4, 0, Math.PI / 2);
// vector
const axis = new THREE.Vector3(1, 1, 0);
// color
const color = new THREE.Color(); //默认是纯白色0xffffff。
color.r = 2.0;
color.setRGB(255, 0, 0);
color.setStyle('#00ff00');
console.log('color', color);

// 光源
const pointLight = new THREE.PointLight(0xffffff, 10);
pointLight.position.set(300, 300, 300);
pointLight.decay = 0.2;
scene.add(pointLight);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(30, width / height, 1, 10000);
camera.position.set(800, 800, 800);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
    antialias: true, // 锯齿模糊
});
renderer.setClearColor(0x666666, 1); //设置背景颜色
renderer.setSize(width, height);

const axesHelper = new THREE.AxesHelper(100); // AxesHelper：辅助观察的坐标系
scene.add(axesHelper);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 5);
scene.add(pointLightHelper);

const controls = new OrbitControls(camera, renderer.domElement);

// 渲染函数
function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
    // mesh.rotation.y += Math.PI/300;
    // mesh.rotateY(Math.PI/300);
    mesh.rotateY(0.01); // mesh旋转动画
    // 同步mesh2和mesh的姿态角度一样，不管mesh姿态角度怎么变化，mesh2始终保持同步
    mesh2.rotation.copy(mesh.rotation);
}

// onresize 事件会在窗口被调整大小时发生
window.onresize = function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
};

// 实例挂载到页面
onMounted(() => {
    // 全屏渲染
    document.body.appendChild(renderer.domElement);
    render();
    // mesh.rotateOnAxis(axis,Math.PI/30);
});
</script>

<style lang="scss" scoped></style>
