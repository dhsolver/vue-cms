<template>
    <div @click="$emit('click')">
        <div v-if="url" class="image-box bg-fit" :style="{ background: bgImage }">
            <div class="delete" @click.stop="$emit('delete')">
                <fa :icon="['fas', 'times']" />
            </div>
        </div>
        <div v-else class="image-box">
            <div class="label">
                <div>
                    <fa v-if="busy" class="fa-spin" size="lg" :icon="['fas', 'spinner']" />
                    <fa v-else size="lg" :icon="['fas', 'plus']" />
                </div>
                <div>Add Image</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ImageBox',

    props: {
        url: {
            type: String,
            default: '',
        },
        busy: {
            type: Boolean,
            default: false,
        },
        id: {
            type: String,
            required: true,
        }
    },

    computed: {
        bgImage() {
            return `url('${this.url}')`;
        }
    },
}
</script>
