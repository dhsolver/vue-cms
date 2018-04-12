import Login from '../pages/login';
import Example from '../components/ExampleComponent';
import NotFound from '../pages/errors/404';

export default [
    { path: '/', name: 'home', component: Example },
    { path: '#/login', name: 'login', component: Login },

    { path: '*', component: NotFound }
]
