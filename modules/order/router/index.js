const page = path => () => import( /* webpackChunkName: "equipment-[request]" */ `../pages/${path}.vue`).then(m => m.default || m)
export default [
    {
        path: '/order/:id',
        // name: 'order.index',
        component: page('index'),
        // redirect: { name: 'orderChat' },
        children: [
            {
                path: '/',
                name: 'order.chat',
                component: page('chat')
            }, 
            {
                path: 'documents',
                name: 'order.documents',
                component: page('documents')
            }, 
            {
                path: 'delivery',
                name: 'order.delivery',
                component: page('delivery')
            }, 
            {
                path: 'review',
                name: 'order.review',
                component: page('review')
            },
        ]
    } 
]