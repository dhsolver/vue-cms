import Login from '../pages/login';
import Home from '../pages/Home';
import NotFound from '../pages/errors/404';
import Dashboard from '../pages/admin/dashboard';
import Clients from '../pages/admin/clients';
import Users from '../pages/admin/users';
import Tours from '../pages/admin/tours';

export default [
    { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },

    { path: '/admin/', name: 'admin.dashboard', component: Dashboard },
    { path: '/admin/clients', name: 'admin.clients', component: Clients },
    { path: '/admin/users', name: 'admin.users', component: Users },
    { path: '/admin/tours', name: 'admin.tours', component: Tours },

    // catch all 404
    { path: '*', component: NotFound }
]
