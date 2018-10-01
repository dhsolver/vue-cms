<template>
    <div class="d-flex">
        <div class="mx-auto p-5 mt-5 shadow-lg bg-white rounded" style="min-width: 60%">
            <div class="text-center mb-5">
                <img src="images/junket-logo.png" alt="Junket" class="w-100">
            </div>

            <div class="text-center">
                <h3 class="mb-4">Oops An Error Has Occurred!</h3>
                <h4 class="mb-5">404 Not Found</h4>

                <div class="links">
                    <router-link :to="{ name: 'home' }">
                        <fa :icon="['fas', 'arrow-left']"></fa>
                        Go Home
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotFound',

    metaInfo () {
        return { title: "Login" }
    },

}
</script>
