<template>
    <div id="wgl"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import { scene, mesh, camera, renderer } from './demo.js'


// 渲染函数
function render() {
    renderer.render(scene, camera);
    mesh.rotateZ(0.01);
    requestAnimationFrame(render);
}

// onresize 事件会在窗口被调整大小时发生
window.onresize = function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
};


onMounted(() => {
    document.getElementById('wgl').appendChild(renderer.domElement);
    render()
})
</script>

<style lang="scss" scoped>

</style>
