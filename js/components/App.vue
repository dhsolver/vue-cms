<template>
    <div id="app">
        <loading ref="loading"/>

        <transition name="page" mode="out-in">
            <component v-if="layout" :is="layout"/>
        </transition>
    </div>
</template>

<script>
import Loading from './Loading'

// Load layout components dynamically.
const requireContext = require.context('../layouts', false, /.*\.vue$/)

const layouts = requireContext.keys()
    .map(file =>
        [file.replace(/(^.\/)|(\.vue$)/g, ''), requireContext(file)]
    )
    .reduce((components, [name, component]) => {
        components[name] = component.default || component
        return components
    }, {})

export default {
    el: '#app',

    components: {
        Loading
    },

    data: () => ({
        layout: null,
        defaultLayout: 'default'
    }),

    metaInfo () {
        return {
            title: "Junket CMS",
            titleTemplate: `%s · Junket CMS`
        }
    },

    mounted () {
        this.$loading = this.$refs.loading
    },

    methods: {
        setLayout (layout) {
            if (!layout || !layouts[layout]) {
                layout = this.defaultLayout
            }

            this.layout = layouts[layout]
        }
    }
}
</script>
