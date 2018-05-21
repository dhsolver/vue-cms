import Vue from 'vue';
import Child from './Child';
import Button from './Button';
import Spinner from './Spinner';
import InputHelp from './InputHelp';
import Message from './Message';
import BusyButton from './BusyButton';
import ConfirmModal from './ConfirmModal';
import TourBox from './TourBox';
import StopBox from './StopBox';
import ImageBox from './ImageBox';
import AudioPlayer from './AudioPlayer';
import YoutubeInput from './YoutubeInput';
import StopChoice from './StopChoice';

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
    StopBox,
    ImageBox,
    AudioPlayer,
    YoutubeInput,
    StopChoice,
].forEach(Component => {
    Vue.component(Component.name, Component)
})
