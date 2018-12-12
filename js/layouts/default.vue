<template>
    <main>
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

<style lang="scss" src="../../sass/app.scss"></style>