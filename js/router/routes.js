import Login from '../pages/login';
import Register from '../pages/register'
import Home from '../pages/home';
import EditTour from '../pages/tour';
import Profile from '../pages/profile';

import NotFound from '../pages/errors/404';

import Dashboard from '../pages/admin/dashboard';
import Clients from '../pages/admin/clients/list';
import ClientEdit from '../pages/admin/clients/edit';
import Users from '../pages/admin/users/list';
import UserEdit from '../pages/admin/users/edit';
import Admins from '../pages/admin/admins/list';
import AdminEdit from '../pages/admin/admins/edit';
import AdminTours from '../pages/admin/tours/list';
import AdminTourEdit from '../pages/admin/tours/edit';

import ResetPassword from '../pages/support/reset-password';
import ForgotPassword from '../pages/support/forgot-password';
import ConfirmEmail from '../pages/support/confirm-email';

import store from '../store'
let routes = [];

if (window.location.href.indexOf(store.state.config.urls.support) === 0) {
    routes = [
        { path: '/forgot-password', name: 'forgot-password', component: ForgotPassword },
        { path: '/reset-password', name: 'reset-password', component: ResetPassword },
        { path: '/confirm-email', name: 'confirm-email', component: ConfirmEmail },
    
        // catch all 404
        { path: '*', name: '404', component: NotFound }
    ]
}
else {
    routes = [

        { path: '/', name: 'home', component: Home },
        { path: '/login', name: 'login', component: Login },
        { path: '/register', name: 'register', component: Register },
        { path: '/tour/:id', name: 'tour', component: EditTour },
        { path: '/profile', name: 'profile', component: Profile },

        { path: '/admin/', name: 'admin.dashboard', component: Dashboard },
        { path: '/admin/clients', name: 'admin.clients', component: Clients },
        { path: '/admin/client/:id', name: 'admin.client.show', component: ClientEdit },
        { path: '/admin/users', name: 'admin.users', component: Users },
        { path: '/admin/user/:id', name: 'admin.user.show', component: UserEdit },
        { path: '/admin/admins', name: 'admin.admins', component: Admins },
        { path: '/admin/admin/:id', name: 'admin.admin.show', component: AdminEdit },
        { path: '/admin/tours', name: 'admin.tours', component: AdminTours },
        { path: '/admin/tour/:id', name: 'admin.tour.edit', component: AdminTourEdit },

        // catch all 404
        { path: '*', name: '404', component: NotFound }
    ]
}

export default routes;