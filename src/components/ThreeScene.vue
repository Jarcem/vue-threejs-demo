<template>
    <div id="container"></div>
</template>

<script>
import thjs from "../common/TheejsAPI.js";
export default {
    mounted() {
        thjs.detection();
        thjs.init();
        thjs.animation();
    },
};
</script>

<style lang='scss'>
#container {
    width: 100%;
    height: 100%;
}
</style>