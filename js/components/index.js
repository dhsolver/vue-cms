import Vue from 'vue';
import Child from './Child';
import Button from './Button';
import Spinner from './Spinner';
import InputHelp from './InputHelp';
import Alert from './Alert';
import BusyButton from './BusyButton';
import ConfirmModal from './ConfirmModal';
import TourCard from './TourCard';
import StopCard from './StopCard';
import ImageBox from './ImageBox';
import AudioPlayer from './AudioPlayer';
import YoutubeInput from './YoutubeInput';
import StopChoice from './StopChoice';
import AddressForm from './AddressForm';
import GoogleAddressSearch from './GoogleAddressSearch';
import NextStopDropdown from './NextStopDropdown';
import FacebookLogin from './FacebookLogin';
import DatePicker from './DatePicker';
import LineChart from './LineChart';

// Components that are registered globaly.
[
    Child,
    Button,
    Spinner,
    InputHelp,
    Alert,
    BusyButton,
    ConfirmModal,
    TourCard,
    StopCard,
    ImageBox,
    AudioPlayer,
    YoutubeInput,
    StopChoice,
    AddressForm,
    GoogleAddressSearch,
    NextStopDropdown,
    FacebookLogin,
    DatePicker,
    LineChart,
].forEach(Component => {
    Vue.component(Component.name, Component)
})
