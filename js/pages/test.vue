<template>
    <div class="pt-4 text-center" style="width: 500px; background-color: white">
        <b-btn variant="primary" @click="test">test</b-btn>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    
    data: () => ({
        form: new Form({
            other: [],
        }),
    }),

    methods: {
        test() {
            this.form.other.push('wtf');
            console.log('local value:');
            console.log(this.form.other);

            console.log('vuex value:');
            console.log(this.something.other)

            console.log('originl data value:');
            console.log(this.form.originalData.other);
        },
    },
    
    computed: {
        ...mapGetters({
            something: 'test/getSomething',
        }),
    },

    metaInfo () {
        return { title: "Test Page" }
    },

    mounted() {
        console.log('mount called');
        this.form = new Form(JSON.parse(JSON.stringify(this.something)));
    },
}
</script>
