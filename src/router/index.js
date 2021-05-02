import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardLayout from "@/Layouts/DashboardLayout";
import Home from "@/views/DashBoard";
import Login from "@/views/LoginView";
import AccountsLayout from "@/Layouts/AccountsLayout";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: DashboardLayout,
        children: [
            {
                path: '/',
                alias: '',
                component: Home,
                name: 'Dashboard',
                meta: {description: 'Overview of environment'}
            }, {
                path: 'users',
                name: 'users',
                props: {FormName: "users"},
                component: () => import(/* webpackChunkName: "about" */ '../views/CrudView')
            },
            {
                path: 'resources',
                name: 'resources',
                props: {FormName: "resources"},
                component: () => import(/* webpackChunkName: "about" */ '../views/CrudView')
            },
            {
                path: 'city',
                name: 'city',
                props: {FormName: "city"},
                component: () => import(/* webpackChunkName: "about" */ '../views/CrudView')
            },
            {
                path: 'posts',
                name: 'posts',
                props: {FormName: "posts"},
                component: () => import(/* webpackChunkName: "about" */ '../views/CrudView')
            }
        ]
    },
    {
        path: '/accounts',
        component: AccountsLayout,
        children: [
            {
                path: 'login',
                component: Login,
                name: 'Login',
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
