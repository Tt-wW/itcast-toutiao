export default [{
        path: '/',
        redirect: '/layout'
    },
    {
        path: '/login',
        component: () => import("@/views/Login"),
        name: 'login'
    },
    {
        path: '/layout',
        component: () => import("@/views/Layout"),
        redirect: '/layout/home',
        name: 'layout',
        children: [{
                // 细节，子路由不要加/
                path: 'home',
                component: () => import("@/views/Layout/home")
            },
            {
                path: 'user',
                component: () => import('@/views/User')
            }
        ]
    },
    {
        path: '/search',
        component: () => import("@/views/Search"),
        name: 'search'
    },
    {
        path: '/search/:keywords',
        component: () => import("@/views/Search/SearchResult"),
    },
    {
        path: '/article_detail',
        component: () => import('@/views/ArticleDetail')
    },
    {
        path: '/user_editor',
        component: () =>import('@/views/User/EditUser')
    },
    {
        path:'/chat',
        component: () =>import('@/views/Chat')
    }
]