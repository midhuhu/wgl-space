<template>
    <!-- <div>
        <div id="webgl"></div>
    </div> -->
</template>

<script setup>
import { onMounted } from 'vue';
import * as THREE from 'three';
// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//引入性能监视器stats.js
import Stats from 'three/addons/libs/stats.module.js';


// 创建3D场景对象Scene
const scene = new THREE.Scene();   
//创建一个长方体几何对象Geometry                        
const geometry = new THREE.BoxGeometry(100, 60, 40);      

//创建一个材质对象Material
// const material = new THREE.MeshBasicMaterial({              
//     color: 0xff0000,
//     transparent:true,//开启透明
//     opacity:0.5,//设置透明度
// });  
const material = new THREE.MeshLambertMaterial(); 

// 点光源  参数：光源颜色和光照强度
const pointLight = new THREE.PointLight(0xffffff, 10); 
scene.add(pointLight);
// 单独设置光照强度
// pointLight.intensity = 1.0;     

// 光源辅助观察
const pointLightHelper = new THREE.PointLightHelper(pointLight, 2);
scene.add(pointLightHelper);


// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
ambientLight.position.set(-100, 50, 50);
// scene.add(ambientLight);

// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// 目标照射坐标
directionalLight.target.position.set(-50, 10, 0);
// 光源位置
directionalLight.position.set(-100, 50, -100);
scene.add(directionalLight);

// DirectionalLightHelper：可视化平行光
const dirLightHelper = new THREE.DirectionalLightHelper(directionalLight, 2,0xff0000);
scene.add(dirLightHelper);


// 设置光源随距离衰减                    
pointLight.decay = 0.3;                                 
//点光源位置
pointLight.position.set(100, 100, 80);//点光源放在x轴上

const axesHelper = new THREE.AxesHelper(100);   // AxesHelper：辅助观察的坐标系
scene.add(axesHelper);

//网格模型对象Mesh
const mesh = new THREE.Mesh(geometry, material);    
//设置网格模型在三维空间中的位置坐标，默认是坐标原点
mesh.position.set(0,0,0);                          
scene.add(mesh); 


const width = window.innerWidth;      //宽度 相机输出画布的尺寸
const height = window.innerHeight;     //高度

// 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 3000：远裁截面
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(100, 150, 350);     // 相机在Three.js三维坐标系中的位置
camera.lookAt(mesh.position);           //指向mesh对应的位置

const renderer = new THREE.WebGLRenderer();     // 创建渲染器对象
renderer.setSize(width, height);                //设置three.js渲染区域的尺寸(像素px)
// renderer.render(scene, camera);                 //执行渲染操作

// 设置相机控件轨道控制器OrbitControls（本质上就是改变相机的参数）
const controls = new OrbitControls(camera, renderer.domElement);

// 设置了渲染循环,相机控件OrbitControls就不用再通过事件change执行

// 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
// controls.addEventListener('change', function () {
//     renderer.render(scene, camera); //执行渲染操作
// });//监听鼠标、键盘事件

const clock = new THREE.Clock();

//创建stats对象
const stats = new Stats();


// 渲染函数
function render() {

    stats.update();
    
    // const spt = clock.getDelta()*1000;//毫秒
    // console.log('两帧渲染时间间隔(毫秒)',spt);
    // console.log('帧率FPS',1000/spt);
    renderer.render(scene, camera); //执行渲染操作
    mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
    // mesh.rotateZ(0.01);
    // mesh.rotateX(0.01);
    requestAnimationFrame(render);//请求再次执行渲染函数render，渲染下一帧
}

// onresize 事件会在窗口被调整大小时发生
window.onresize = function () {
    // 重置渲染器输出画布canvas尺寸
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
    // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
    // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
    camera.updateProjectionMatrix();
};


// 实例挂载到页面
onMounted(() => {
    // 元素渲染
    // let webgl = document.getElementById('webgl');
    // webgl.appendChild(renderer.domElement);

    // 全屏渲染
    document.body.appendChild(renderer.domElement);
    //stats.domElement:web页面上输出计算结果,一个div元素，
    document.body.appendChild(stats.domElement);
    render();
})
</script>

<style lang="scss" scoped>

</style>
