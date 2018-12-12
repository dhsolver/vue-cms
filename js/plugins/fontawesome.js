import Vue from 'vue'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

import {
    faUser, faLock, faSignOutAlt, faCog, faArrowLeft, faSignInAlt, faExchangeAlt, faUserEdit
} from '@fortawesome/fontawesome-free-solid/shakable.es'

import {
    faCalendarAlt
} from '@fortawesome/fontawesome-free-regular/shakable.es'

import {
    faGithub, faInstagram, faFacebookF, faTwitter, faYoutube, faFacebook,
    faAndroid, faApple,
} from '@fortawesome/fontawesome-free-brands/shakable.es'

fontawesome.library.add(
    faUser, faLock, faSignOutAlt, faCog, faGithub, faInstagram, faFacebookF,faFacebook, faTwitter, faYoutube, faArrowLeft, faCalendarAlt, faAndroid, faApple, faSignInAlt, faExchangeAlt, faUserEdit
)

Vue.component('fa', FontAwesomeIcon)
