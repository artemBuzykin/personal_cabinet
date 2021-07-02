const page = (path) => () =>
    import(/* webpackChunkName: "tracking-[request]" */ `../pages/${path}.vue`).then(
        (m) => m.default || m
    );
export default [
    {
        path: '/tracking/',
        name: 'tracking.index',
        component: page('index'),
    },
];
