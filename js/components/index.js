import Vue from 'vue'
import Child from './Child'
import Button from './Button'
import Spinner from './Spinner'
import { HasError, AlertError, AlertSuccess } from 'vform'

// Components that are registered globaly.
[
    Child,
    Button,
    Spinner,
    HasError,
    AlertError,
    AlertSuccess
].forEach(Component => {
    Vue.component(Component.name, Component)
})
