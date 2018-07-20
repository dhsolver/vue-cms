<template>
    <b-modal id="confirmDelete" :title="title" v-model="show">
        <slot></slot>
        <div slot="modal-footer">
            <b-btn variant="default" @click.prevent="onCancel()">{{ cancelButton }}</b-btn>
            <b-btn variant="success" @click.prevent="onNo()" v-if="noButton">{{ noButton }}</b-btn>
            <b-btn variant="danger" @click.prevent="onYes()">{{ yesButton }}</b-btn>
        </div>
    </b-modal>
</template>

<script>
export default {
    name: 'ConfirmModal',

    props: {
        cancelButton: {
            type: String,
            default: 'Cancel',
        },
        yesButton: {
            type: String,
            default: 'Yes',
        },
        noButton: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: 'Are you sure?',
        },
    },

    data: () => ({
        show: false,
        callback: null,
        cancelCallback: null,
        noCallback: null,
    }),

    methods: {
        confirm(callback, cancelCallback = null, noCallback = null) {
            this.show = true;
            this.callback = callback;
            this.cancelCallback = cancelCallback;
            this.noCallback = noCallback;
        },

        onNo() {
            this.show = false;
            if (this.noCallback) {
                this.noCallback();
            }
        },

        onYes() {
            this.show = false;
            if (this.callback) {
                this.callback();
            }
        },

        onCancel() {
            this.show = false;
            if (this.cancelCallback) {
                this.cancelCallback();
            }
        }
    }
}
</script>
