import Login from '../pages/login';
import Home from '../pages/Home';
import NotFound from '../pages/errors/404';
import Dashboard from '../pages/admin/dashboard';
import Clients from '../pages/admin/clients/list';
import ClientEdit from '../pages/admin/clients/edit';
import Users from '../pages/admin/users/list';
import UserEdit from '../pages/admin/users/edit';
import Admins from '../pages/admin/admins/list';
import AdminEdit from '../pages/admin/admins/edit';
import Tours from '../pages/admin/tours/list';
import TourEdit from '../pages/admin/tours/edit';

export default [
    { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },

    { path: '/admin/', name: 'admin.dashboard', component: Dashboard },
    { path: '/admin/clients', name: 'admin.clients', component: Clients },
    { path: '/admin/client/:id', name: 'admin.client.show', component: ClientEdit },
    { path: '/admin/users', name: 'admin.users', component: Users },
    { path: '/admin/user/:id', name: 'admin.user.show', component: UserEdit },
    { path: '/admin/admins', name: 'admin.admins', component: Admins },
    { path: '/admin/admin/:id', name: 'admin.admin.show', component: AdminEdit },
    { path: '/admin/tours', name: 'admin.tours', component: Tours },
    { path: '/admin/tour/:id', name: 'admin.tour.edit', component: TourEdit },

    // catch all 404
    { path: '*', component: NotFound }
]
