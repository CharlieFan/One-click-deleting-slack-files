import Home from '../components/Home.vue'

const User = (resolve) => {
    require.ensure(['../components/UserView.vue'], () => {
        resolve(require('../components/UserView.vue'))
    })
}

export const routes = [
    {
        path: '/home',
        component: Home
    },
    {
        path: '/user/:id', component: User
    },
    {
        path: '/redirct-me',
        redirect: '/user'
    },
    {
        // Catch non-exist route and redirct to root
        path: '*',
        redirect: '/home'
    }
]
