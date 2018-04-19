import Login from '../pages/login';
import Home from '../pages/Home';
import NotFound from '../pages/errors/404';
import Dashboard from '../pages/admin/dashboard';
import Clients from '../pages/admin/clients/list';
import ClientEdit from '../pages/admin/clients/edit';
import Users from '../pages/admin/users/list';
import UserEdit from '../pages/admin/users/edit';
import Tours from '../pages/admin/tours';

export default [
    { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },

    { path: '/admin/', name: 'admin.dashboard', component: Dashboard },
    { path: '/admin/clients', name: 'admin.clients', component: Clients },
    { path: '/admin/client/:id', name: 'admin.client.show', component: ClientEdit },
    { path: '/admin/users', name: 'admin.users', component: Users },
    { path: '/admin/user/:id', name: 'admin.user.show', component: UserEdit },
    { path: '/admin/tours', name: 'admin.tours', component: Tours },

    // catch all 404
    { path: '*', component: NotFound }
]
