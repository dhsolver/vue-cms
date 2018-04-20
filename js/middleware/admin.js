import store from '../store';

export default (to, from, next) => {
    let user = store.getters['auth/user'];
    if (user.role !== 'admin' && user.role !== 'superadmin') {
        next({ name: 'home' });
    } else {
        next();
    }
}
