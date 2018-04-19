import Vue from 'vue';
import Child from './Child';
import Button from './Button';
import Spinner from './Spinner';
import { HasError, AlertError, AlertSuccess } from 'vform';
import InputHelp from './InputHelp';
import Message from './Message';
import BusyButton from './BusyButton';
import ConfirmModal from './ConfirmModal';

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
    ConfirmModal,
].forEach(Component => {
    Vue.component(Component.name, Component)
})
