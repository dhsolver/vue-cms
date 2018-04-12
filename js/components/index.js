import Vue from 'vue'
import Child from './Child'
import Button from './Button'
import { HasError, AlertError, AlertSuccess } from 'vform'

// Components that are registered globaly.
[
    Child,
    Button,
    HasError,
    AlertError,
    AlertSuccess
].forEach(Component => {
    Vue.component(Component.name, Component)
})
