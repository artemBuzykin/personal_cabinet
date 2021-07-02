import Vue from 'vue';
import Router from 'vue-router';
import { scrollBehavior } from '~/utils';
import equipment_routes from './modules/equipment/router';
import achievement_routes from './modules/achievement/router';
// import order_routes from './modules/order/router';
import profile_routes from './modules/profile/router';
import review_routes from './modules/review/router';
import tracking_routes from './modules/tracking/router';
import discussion_routes from './modules/discussion/router';

Vue.use(Router);

const page = (path) => () =>
    import(/* webpackChunkName: "[request]" */ `~/pages/${path}.vue`).then((m) => m.default || m);

const routes = [
    {
        path: '/',
        name: 'index',
        component: page('index'),
    },

    {
        path: '/login',
        name: 'login',
        component: page('login'),
    },
    {
        path: '/login-as-test-client',
        name: 'login-as-test-client',
        component: page('login-as-test-client'),
    },
    {
        path: '/demo',
        name: 'demo',
        component: page('demo'),
    },
    ...equipment_routes,
    ...achievement_routes,
    // ...order_routes,
    ...profile_routes,
    ...review_routes,
    ...tracking_routes,
    ...discussion_routes,
];

export function createRouter() {
    return new Router({
        routes,
        scrollBehavior,
        mode: 'history',
    });
}
