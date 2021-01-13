<template>
    <div class="home">
        <threeScene />
    </div>
</template>

<script>
// @ is an alias to /src
import threeScene from "@/components/ThreeScene.vue";

export default {
    name: "Home",
    components: {
        threeScene,
    },
};
</script>

<style lang="scss">
.home {
    width: 100vw;
    height: 100vh;
}
</style>
