<template>
    <div class="text-center">
        <h3 class="mb-4">Page Not Found</h3>

        <div class="links">
            <router-link :to="{ name: 'home' }">
                Go Home
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotFound'
}
</script>
