<template></template>

<script setup>
import { onMounted } from 'vue';
import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const scene = new THREE.Scene();   

const geometry = new THREE.SphereGeometry(100, 100, 100);
//材质对象Material
const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff, //设置材质颜色
    transparent: true,//开启透明
    opacity: 0.5,//设置透明度
});
const meshList = []
// for (let i = 0; i < 9; i++) {
//     const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
//     // 沿着x轴分布
//     mesh.position.set(i * 200, 0, 0);
//     meshList.push(mesh)
//     scene.add(mesh); //网格模型添加到场景中
// }
// for (let i = 0; i < 9; i++) {
//     const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
//     // 沿着x轴分布
//     mesh.position.set(800, i * 200 - 800, 0);
//     meshList.push(mesh)
//     scene.add(mesh); //网格模型添加到场景中
// }
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        // 在XOZ平面上分布
        mesh.position.set(i * 200, 0, j * 200);
        meshList.push(mesh)
        scene.add(mesh); //网格模型添加到场景中  
    }
}

const ambientLight = new THREE.AmbientLight(0xffffff, 5);
ambientLight.position.set(100, 50, 50);
scene.add(ambientLight);

const width = window.innerWidth;
const height = window.innerHeight; 

const camera = new THREE.PerspectiveCamera(30, width / height, 10, 3000);
camera.position.set(6000, 500, 2000);
camera.lookAt(2500, 0, 0);  

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);  

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', function () {
    renderer.render(scene, camera); //执行渲染操作
});//监听鼠标、键盘事件

//创建stats对象
const stats = new Stats();

// 渲染函数
function render() {
    stats.update();
    renderer.render(scene, camera);
    for (const key in meshList) {
        meshList[key].rotateZ(0.01);
    }
    requestAnimationFrame(render);
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
    document.body.appendChild(stats.domElement);
    render();
})

</script>

<style lang="scss" scoped>
</style>
