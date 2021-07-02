const page = (path) => () =>
    import(/* webpackChunkName: "profile-[request]" */ `../pages/${path}.vue`).then(
        (m) => m.default || m
    );
export default [
    {
        path: '/profile/',
        name: 'profile.index',
        component: page('index'),
    },
];
