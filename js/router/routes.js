import Login from '../pages/login';
import Register from '../pages/register'
import Home from '../pages/home';
import EditTour from '../pages/tour';
import ResetPassword from '../pages/reset-password';
import ForgotPassword from '../pages/forgot-password';

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

import Test from '../pages/test';

export default [
    { path: '/test', name: 'test', component: Test },

    { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/forgot-password', name: 'forgot-password', component: ForgotPassword },
    { path: '/reset-password', name: 'reset-password', component: ResetPassword },
    { path: '/register', name: 'register', component: Register },
    { path: '/tour/:id', name: 'tour', component: EditTour },

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
    { path: '*', component: NotFound }
]
