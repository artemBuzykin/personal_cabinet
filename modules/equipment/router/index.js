const page = path => () => import( /* webpackChunkName: "equipment-[request]" */ `../pages/${path}.vue`).then(m => m.default || m)
export default [{
        path: '/equipments/',
        name: 'equipments.index',
        component: page('index')
    },
]