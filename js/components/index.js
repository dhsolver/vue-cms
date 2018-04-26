import Vue from 'vue';
import Child from './Child';
import Button from './Button';
import Spinner from './Spinner';
import InputHelp from './InputHelp';
import Message from './Message';
import BusyButton from './BusyButton';
import ConfirmModal from './ConfirmModal';
import TourBox from './TourBox';

// Components that are registered globaly.
[
    Child,
    Button,
    Spinner,
    InputHelp,
    Message,
    BusyButton,
    ConfirmModal,
    TourBox,
].forEach(Component => {
    Vue.component(Component.name, Component)
})
