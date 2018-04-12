import Login from '../pages/login';
import Home from '../pages/Home';
import NotFound from '../pages/errors/404';

export default [
    { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },

    // catch all 404
    { path: '*', component: NotFound }
]
