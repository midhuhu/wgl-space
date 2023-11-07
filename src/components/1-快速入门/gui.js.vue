<template></template>

<script setup>
import { onMounted, computed } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const scene = new THREE.Scene();

//材质对象Material
const material = new THREE.MeshPhongMaterial({
    color: 0x00ffff, //设置材质颜色
    side: THREE.DoubleSide,
    shininess: 20, //高光部分的亮度，默认30
    specular: 0x555555, //高光部分的颜色
    wireframe: false, //线条模式渲染mesh对应的三角形数据
});

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

// 圆
const geometry = new THREE.SphereGeometry(50, 32, 16);
const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
mesh.position.set(100, 50, 0);
scene.add(mesh); //网格模型添加到场景中

// 圆柱
const geometry2 = new THREE.CylinderGeometry(50, 50, 100);
const mesh2 = new THREE.Mesh(geometry2, material); //网格模型对象Mesh
mesh2.position.set(0, 50, 200);
scene.add(mesh2); //网格模型添加到场景中

// console.log('几何体',geometry2);
// console.log('顶点位置数据',geometry2.attributes.position);
// console.log('顶点索引数据',geometry2.index);

// 长方体
const geometry3 = new THREE.BoxGeometry(100, 100, 100);
const mesh3 = new THREE.Mesh(geometry3, material); //网格模型对象Mesh
mesh3.position.set(0, 50, -100);
scene.add(mesh3); //网格模型添加到场景中

// 光源
const pointLight = new THREE.PointLight(0xffffff, 10);
pointLight.position.set(1000, 1000, 1000);
pointLight.decay = 0.2;
scene.add(pointLight);

const width = window.innerWidth;
const height = window.innerHeight;

// 相机
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 10000);
camera.position.set(800, 800, 800);
camera.lookAt(0, 0, 0);
// 辅助相机s
const camera1 = new THREE.PerspectiveCamera(30, width / height, 1000, 2000);
camera1.position.set(800, 800, 800);
camera1.lookAt(0, 0, 0);

const cameraControls = {
    helper: '辅相机',
    visual: '主相机',
};
// 相机辅助线
const cameraHelper = new THREE.CameraHelper(camera);
const cameraHelper1 = new THREE.CameraHelper(camera1);
scene.add(cameraHelper1);

// 视图
const renderer = new THREE.WebGLRenderer({
    antialias: true, // 锯齿模糊
});
renderer.setClearColor(0x444444, 1); //设置背景颜色
renderer.setSize(width, height);

const axesHelper = new THREE.AxesHelper(100); // AxesHelper：辅助观察的坐标系
scene.add(axesHelper);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
scene.add(pointLightHelper);

new OrbitControls(camera, renderer.domElement);

// 实例化一个gui对象
const gui = new GUI();
// gui.close()

gui.domElement.style.right = '0px';
gui.domElement.style.width = '300px';

const cameraFolder = gui.addFolder('相机');
cameraFolder
    .add(cameraControls, 'helper', ['主相机', '辅相机'])
    .name('辅助线')
    .onChange(function (value) {
        if (value === '主相机') {
            scene.add(cameraHelper);
            scene.remove(cameraHelper1);
        } else {
            scene.add(cameraHelper1);
            scene.remove(cameraHelper);
        }
    });
cameraFolder.add(cameraControls, 'visual', ['主相机', '辅相机']).name('视角');

/**
 * 分组1
 */
const posFolder = gui.addFolder('位置');
posFolder.close();
// 通过GUI改变mesh.position对象的xyz属性
posFolder.add(mesh.position, 'x', 0, 180).name('球形x').step(1);
posFolder.add(mesh.position, 'y', 0, 180).name('球形y').step(1);
posFolder.add(mesh.position, 'z', 0, 180).name('球形z').step(1);
posFolder.add(mesh2.position, 'x', 0, 180).name('圆柱x').step(1);
posFolder.add(mesh2.position, 'y', 0, 180).name('圆柱y').step(1);
posFolder.add(mesh2.position, 'z', 0, 180).name('圆柱z').step(1);
posFolder.add(mesh3.position, 'x', 0, 180).name('长方体x').step(1);
posFolder.add(mesh3.position, 'y', 0, 180).name('长方体y').step(1);
posFolder.add(mesh3.position, 'z', 0, 180).name('长方体z').step(1);

/**
 * 分组2
 */
const selFolder = gui.addFolder('选择');
selFolder.close();
// 下拉菜单
selFolder
    .add(mesh.position, 'y', [-25, 0, 50, 100])
    .name('球形y-下拉选择')
    .onChange(function (value) {
        mesh.position.y = value;
    });
selFolder
    .add(mesh.position, 'x', {
        left: -100,
        center: 0,
        right: 100,
    })
    .name('球形位置选择')
    .onChange(function (value) {
        mesh.position.x = value;
    });
// 复选框
const mesh2Style = {
    rotate: false,
};
selFolder.add(mesh2Style, 'rotate').name('圆柱是否旋转');

/**
 * 分组3
 */
const matFolder = gui.addFolder('材质');
matFolder.close();
const obj = {
    color: 0x00ffff, // 材质颜色
    specular: 0x555555,
};
// 材质颜色color
matFolder
    .addColor(obj, 'color')
    .name('物体颜色')
    .onChange(function (value) {
        material.color.set(value);
    });
// 材质高光颜色specular
matFolder
    .addColor(obj, 'specular')
    .name('物体高光颜色')
    .onChange(function (value) {
        material.specular.set(value);
    });

/**
 * 分组4
 */
const lightFolder = gui.addFolder('光线设置');
lightFolder.close();
// 分组嵌套
const pointLightFolder = lightFolder.addFolder('点光源');
pointLightFolder.close();
pointLightFolder.add(pointLight, 'intensity', 0, 20).name('点光源强度');
pointLightFolder
    .add(pointLight.position, 'x', -3000, 3000)
    .name('点光源x')
    .step(10);
pointLightFolder
    .add(pointLight.position, 'y', -3000, 3000)
    .name('点光源y')
    .step(10);
pointLightFolder
    .add(pointLight.position, 'z', -3000, 3000)
    .name('点光源z')
    .step(10);

const handleCenter = () => {
    // 位置重置、设值
    // translateX.reset();
    // translateY.reset();
    // translateZ.reset();
    translateX.setValue(0);
    translateY.setValue(0);
    translateZ.setValue(0);
    // geometry.center();
};
const handle = {
    scale: 1,
    translate: {
        x: 0,
        y: 0,
        z: 0,
    },
    center: handleCenter,
};
const handleBack = {
    scale: 1,
    translate: {
        x: 0,
        y: 0,
        z: 0,
    },
};
const handleFolder = gui.addFolder('操作');
handleFolder.close();
handleFolder
    .add(handle, 'scale', 0.1, 5)
    .name('球形缩放')
    .step(0.1)
    .onChange(async function (value) {
        // 每次缩放前，先恢复一开始的尺寸
        await geometry.scale(
            1 / handleBack.scale,
            1 / handleBack.scale,
            1 / handleBack.scale,
        );
        geometry.scale(value, value, value);
        handleBack.scale = value;
    });

const translateX = handleFolder
    .add(handle.translate, 'x', -100, 100)
    .name('球形平移x')
    .step(1)
    .onChange(function (value) {
        geometry.translate(value - handleBack.translate.x, 0, 0);
        handleBack.translate.x = value;
    });
const translateY = handleFolder
    .add(handle.translate, 'y', -100, 100)
    .name('球形平移y')
    .step(1)
    .onChange(function (value) {
        geometry.translate(0, value - handleBack.translate.y, 0);
        handleBack.translate.y = value;
    });
const translateZ = handleFolder
    .add(handle.translate, 'z', -100, 100)
    .name('球形平移z')
    .step(1)
    .onChange(function (value) {
        geometry.translate(0, 0, value - handleBack.translate.z);
        handleBack.translate.z = value;
    });

handleFolder.add(handle, 'center').name('初始化球形位置');

// 渲染函数
function render() {
    renderer.render(
        scene,
        cameraControls.visual === '主相机' ? camera : camera1,
    );
    mesh2Style.rotate && mesh2.rotateZ(0.01);
    requestAnimationFrame(render);
}

// onresize 事件会在窗口被调整大小时发生
window.onresize = function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    camera1.aspect = window.innerWidth / window.innerHeight;
    camera1.updateProjectionMatrix();
};

// 实例挂载到页面
onMounted(() => {
    // 全屏渲染
    document.body.appendChild(renderer.domElement);
    render();
});
</script>

<style lang="scss" scoped></style>
