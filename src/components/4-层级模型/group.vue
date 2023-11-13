<template></template>

<script setup>
import { onMounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

// 创建平面
var planeGeometry = new THREE.PlaneGeometry(1000, 1000);
var planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2; // 将平面旋转至水平方向
plane.receiveShadow = true; // 接收阴影
scene.add(plane);

const pointLight = new THREE.PointLight(0xffffff, 10);
pointLight.position.set(100, 120, 200);
pointLight.decay = 0.2;
pointLight.castShadow = true;
scene.add(pointLight);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 2);
scene.add(pointLightHelper);

const axesHelper = new THREE.AxesHelper(100); // AxesHelper：辅助观察的坐标系
scene.add(axesHelper);

// 批量创建多个长方体表示高层楼
const group1 = new THREE.Group(); //所有高层楼的父对象
group1.name = '高层';
for (let i = 0; i < 5; i++) {
    const geometry = new THREE.BoxGeometry(20, 60, 10);
    const material = new THREE.MeshLambertMaterial({
        color: 0x00ffff,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = i * 30; // 网格模型mesh沿着x轴方向阵列
    // 设置产生投影的网格模型
    mesh.castShadow = true;
    group1.add(mesh); //添加到组对象group1
    mesh.name = i + 1 + '号楼';
    // console.log('mesh.name',mesh.name);
}
group1.position.y = 30;

const group2 = new THREE.Group();
group2.name = '洋房';
// 批量创建多个长方体表示洋房
for (let i = 0; i < 5; i++) {
    const geometry = new THREE.BoxGeometry(20, 30, 10);
    const material = new THREE.MeshLambertMaterial({
        color: 0x00ffff,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = i * 30;
    // 设置产生投影的网格模型
    mesh.castShadow = true;
    group2.add(mesh); //添加到组对象group2
    mesh.name = i + 6 + '号楼';
}
group2.position.z = 50;
group2.position.y = 15;

const model = new THREE.Group();
model.name = '小区房子';
model.add(group1, group2);
model.position.set(-50, 0, -25);

scene.add(model);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(30, width / height, 1, 30000);
camera.position.set(100, 150, 350);
camera.lookAt(model.position);

// 可视化平行光阴影对应的正投影相机对象
const cameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);
scene.add(cameraHelper);

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x444444, 1); //设置背景颜色
renderer.shadowMap.enabled = true; //开启阴影
renderer.setSize(width, height);

const controls = new OrbitControls(camera, renderer.domElement);

// 渲染函数
function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

window.onresize = function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
};

onMounted(() => {
    document.body.appendChild(renderer.domElement);
    render();
    // 递归遍历model包含所有的模型节点
    model.traverse(function (obj) {
        console.log('所有模型节点的名称', obj.name);
        // obj.isMesh：if判断模型对象obj是不是网格模型'Mesh'
    });
    // 返回名.name为"4号楼"对应的对象
    const nameNode = scene.getObjectByName('4号楼');
    nameNode.material.color.set(0xff0000);
});
</script>

<style lang="scss" scoped></style>
