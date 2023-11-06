<template>
    <div id="wgl"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 场景
const scene = new THREE.Scene();

// 物体
const geometry = new THREE.BufferGeometry();

// 材质
const material = new THREE.PointsMaterial({
    color: 0x00ffff, //设置材质颜色
    side: THREE.DoubleSide,
    size: 10.0
});

// 点位
const vertices = new Float32Array([
    50,0,0,
    50,50,0,
    50,50,50,
    50,0,50,
    // 50,0,0,
    0,0,-50,
    -50,0,0,
    0,0,50,

    // 50,0,50,
    // 50,50,50,
    0,50,50,
    // 0,0,50,

    // 0,50,50,
    // -50,0,0,
    // 0,0,-50,
    // 50,50,0,

    // 0,50,50,
    // 0,0,50
]);

// 添加顶点可以去除重复的顶点数据
const indexes = new Uint16Array([
    0, 1, 2, 3, 0, 4, 5, 6, 3, 2, 7, 6, 7, 5, 4, 1, 7, 6
])

// const vertices = new Float32Array([
//     0, 0, 0, //顶点1坐标
//     80, 0, 0, //顶点2坐标
//     80, 80, 0, //顶点3坐标
//     // 0, 0, 0, //顶点4坐标   和顶点1位置相同
//     // 80, 80, 0, //顶点5坐标  和顶点3位置相同
//     0, 80, 0, //顶点6坐标
// ]);
// const indexes = new Uint16Array([
//     0, 1, 2, 0, 2, 3,
// ])

const attribute = new THREE.BufferAttribute(vertices, 3);
geometry.attributes.position = attribute;
// 删除重复点位后，指定顶点，实现同样的效果
geometry.index = new THREE.BufferAttribute(indexes, 1);

const points = new THREE.Points(geometry, material);

// 线材质
const materialLine = new THREE.LineBasicMaterial({
    color: 0xff0000 //线条颜色
}); 
// 创建线模型对象
const line = new THREE.LineLoop(geometry, materialLine);

scene.add(line)
// 光源
const pointLight = new THREE.PointLight(0xffffff, 5, 1000);
pointLight.decay = 0;
pointLight.position.set(500, 500, 500);            
scene.add(points);    

// 相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
camera.position.set(400, 400, 400);

// 渲染
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x888888, 1); //设置背景颜色
renderer.setSize(window.innerWidth, window.innerHeight);

// 辅助线
const axesHelper = new THREE.AxesHelper(100);   // AxesHelper：辅助观察的坐标系
scene.add(axesHelper);

// 控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', function () {
    renderer.render(scene, camera);
});


onMounted(() => {
    let webgl = document.getElementById('wgl');
    webgl.appendChild(renderer.domElement)
    renderer.render(scene, camera);
})
</script>

<style lang="scss" scoped>

</style>
