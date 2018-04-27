<template>
    <div>
        <div v-if="url" class="image-box bg-fit" :style="{ background: bgImage }">
            <div class="delete" @click.stop="$emit('delete')">
                <fa :icon="['fas', 'times']" />
            </div>
        </div>
        <div v-else class="image-box">
            <div class="label">
                <div><fa size="lg" :icon="['fas', 'plus']"/></div>
                <div>Add Image</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['url'],

        name: 'ImageBox',

        computed: {
            bgImage() {
                return `url('${this.url}')`;
            }
        },

        data: () => ({
        }),

        methods: {
        }
    }
</script>
