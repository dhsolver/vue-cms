import Vue from 'vue'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

import {
    faUser, faLock, faSignOutAlt, faCog, faArrowLeft
} from '@fortawesome/fontawesome-free-solid/shakable.es'

import {
    faGithub, faInstagram, faFacebookF, faTwitter, faYoutube, faFacebook
} from '@fortawesome/fontawesome-free-brands/shakable.es'

fontawesome.library.add(
    faUser, faLock, faSignOutAlt, faCog, faGithub, faInstagram, faFacebookF,faFacebook, faTwitter, faYoutube, faArrowLeft
)

Vue.component('fa', FontAwesomeIcon)
