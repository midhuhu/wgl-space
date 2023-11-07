<template></template>

<script setup>
import { onMounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

//材质对象Material
const material = new THREE.MeshPhongMaterial({
    color: 0x00ffff, //设置材质颜色
    shininess: 20, //高光部分的亮度，默认30
    specular: 0x555555, //高光部分的颜色
});

// 长方体
const geometry = new THREE.BoxGeometry(100, 100, 100);
const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
mesh.position.set(-50, 50, -50);
scene.add(mesh); //网格模型添加到场景中

const v3_1 = new THREE.Vector3(1, 0, 0);
const v3_2 = new THREE.Vector3(0, 0, 1);
const v3_3 = new THREE.Vector3(-1, 0, 0);
const v3_4 = new THREE.Vector3(0, 0, -1);

// v3.normalize();

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
    const { x, y, z } = mesh.position;
    if (x < 50 && y === 50 && z === -50) {
        mesh.translateOnAxis(v3_1, 1);
    } else if (z < 50 && x === 50 && y === 50) {
        mesh.translateOnAxis(v3_2, 1);
    } else if (x > -50 && y === 50 && z === 50) {
        mesh.translateOnAxis(v3_3, 1);
    } else if (z > -50 && x === -50 && y === 50) {
        mesh.translateOnAxis(v3_4, 1);
    }
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
});
</script>

<style lang="scss" scoped></style>
