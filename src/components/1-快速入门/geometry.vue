<template></template>

<script setup>
import { onMounted } from 'vue';
import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

//材质对象Material
const material = new THREE.MeshPhongMaterial({
    color: 0x00ffff, //设置材质颜色
    // transparent: true,//开启透明
    // opacity: 0.6,//设置透明度
    side: THREE.DoubleSide,
    shininess: 20, //高光部分的亮度，默认30
    specular: 0x555555, //高光部分的颜色
});

// 圆
const geometry = new THREE.SphereGeometry(50);
const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
mesh.position.set(100, 50, 0);
scene.add(mesh); //网格模型添加到场景中

// 圆柱
const geometry2 = new THREE.CylinderGeometry(50, 50, 100);
const mesh2 = new THREE.Mesh(geometry2, material); //网格模型对象Mesh
mesh2.position.set(0, 50, 200);
scene.add(mesh2); //网格模型添加到场景中

// 长方体
const geometry3 = new THREE.BoxGeometry(100, 100, 100);
const mesh3 = new THREE.Mesh(geometry3, material); //网格模型对象Mesh
mesh3.position.set(0, 50, -100);
scene.add(mesh3); //网格模型添加到场景中

// 矩形平面
const geometry4 = new THREE.PlaneGeometry(100, 50);
const mesh4 = new THREE.Mesh(geometry4, material); //网格模型对象Mesh
mesh4.position.set(-200, 0, -50);
scene.add(mesh4); //网格模型添加到场景中

// 圆形平面
const geometry5 = new THREE.CircleGeometry(50);
const mesh5 = new THREE.Mesh(geometry5, material); //网格模型对象Mesh
mesh5.position.set(-200, 0, 50);
scene.add(mesh5); //网格模型添加到场景中

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

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', function () {
    renderer.render(scene, camera); //执行渲染操作
}); //监听鼠标、键盘事件

//创建stats对象
const stats = new Stats();

// 渲染函数
function render() {
    stats.update();
    renderer.render(scene, camera);
    mesh.rotateZ(0.01);
    requestAnimationFrame(render);
}

// onresize 事件会在窗口被调整大小时发生
window.onresize = function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    // camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
};

// 实例挂载到页面
onMounted(() => {
    // 全屏渲染
    document.body.appendChild(renderer.domElement);
    document.body.appendChild(stats.domElement);
    render();
});
</script>

<style lang="scss" scoped></style>
