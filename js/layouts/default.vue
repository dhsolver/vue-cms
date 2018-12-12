<template>
    <main class="default-layout">
        <div class="root">
            <div class="fill">
                <slot />
            </div>
        </div>
    </main>
</template>

<script>
export default {
    name: 'MainLayout',

    components: {
    }
}
</script>

<style lang="scss">
.compass-bg {
    background-image: url('../../assets/images/compass.png');
}
.map-pin-bg {
    background-image: url('../../assets/images/map-marker-alt.png');
}
</style>