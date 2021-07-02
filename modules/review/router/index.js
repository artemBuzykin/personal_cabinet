const page = (path) => () =>
    import(/* webpackChunkName: "review-[request]" */ `../pages/${path}.vue`).then(
        (m) => m.default || m
    );
export default [
    {
        path: '/reviews/',
        name: 'reviews.index',
        component: page('index'),
    },
];
