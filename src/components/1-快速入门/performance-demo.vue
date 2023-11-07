<template></template>

<script setup>
import { onMounted } from 'vue';
import * as THREE from 'three';
//引入性能监视器stats.js
import Stats from 'three/addons/libs/stats.module.js';

const scene = new THREE.Scene();
const meshList = [];
// 随机创建大量的模型,测试渲染性能
const num = 1000;
for (let i = 0; i < num; i++) {
    const geometry = new THREE.BoxGeometry(5, 5, 5);
    const material = new THREE.MeshLambertMaterial({
        color: 0x00ffff,
    });
    const mesh = new THREE.Mesh(geometry, material);
    // 随机生成长方体xyz坐标
    const x = (Math.random() - 0.5) * 200;
    const y = (Math.random() - 0.5) * 200;
    const z = (Math.random() - 0.5) * 200;
    mesh.position.set(x, y, z);
    meshList.push(mesh);
    scene.add(mesh); // 模型对象插入场景中
}

const pointLight = new THREE.PointLight(0xffffff, 10);
pointLight.decay = 0.3;
pointLight.position.set(100, 100, 80); //点光源放在x轴上
scene.add(pointLight);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 2);
scene.add(pointLightHelper);

const axesHelper = new THREE.AxesHelper(100); // AxesHelper：辅助观察的坐标系
scene.add(axesHelper);

const width = window.innerWidth; //宽度 相机输出画布的尺寸
const height = window.innerHeight; //高度

const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(100, 150, 350); // 相机在Three.js三维坐标系中的位置
camera.lookAt(0, 0, 0); //指向mesh对应的位置

const renderer = new THREE.WebGLRenderer(); // 创建渲染器对象
renderer.setSize(width, height); //设置three.js渲染区域的尺寸(像素px)

//创建stats对象：刷新率
const stats = new Stats();

// 渲染函数
function render() {
    stats.update();
    renderer.render(scene, camera); //执行渲染操作
    for (const key in meshList) {
        if (key > 0 && key < 300) {
            meshList[key].rotateX(0.1); //每次绕x轴旋转0.01弧度
        } else if (300 < key && key < 600) {
            meshList[key].rotateY(0.1); //每次绕y轴旋转0.01弧度
        } else {
            meshList[key].rotateZ(0.1); //每次绕y轴旋转0.01弧度
        }
    }
    requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
}

window.onresize = function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
};

onMounted(() => {
    document.body.appendChild(renderer.domElement);
    document.body.appendChild(stats.domElement);
    render();
});
</script>

<style lang="scss" scoped></style>
