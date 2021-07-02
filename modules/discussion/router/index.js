const page = (path) => () =>
    import(/* webpackChunkName: "discussion-[request]" */ `../pages/${path}.vue`).then(
        (m) => m.default || m
    );
export default [
    {
        path: '/discussions/',
        name: 'discussions.index',
        component: page('index'),
    },
];
