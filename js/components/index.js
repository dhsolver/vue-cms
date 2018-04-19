import Vue from 'vue';
import Child from './Child';
import Button from './Button';
import Spinner from './Spinner';
import { HasError, AlertError, AlertSuccess } from 'vform';
import InputHelp from './InputHelp';
import Message from './Message';
import BusyButton from './BusyButton';

// Components that are registered globaly.
[
    Child,
    Button,
    Spinner,
    HasError,
    AlertError,
    AlertSuccess,
    InputHelp,
    Message,
    BusyButton,
].forEach(Component => {
    Vue.component(Component.name, Component)
})
