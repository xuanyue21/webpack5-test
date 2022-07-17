/*
 * @Author: 翟珂峰
 * @LastEditTime: 2022-07-17 13:53:01
 * @Description: 
 */

import {createRouter, createWebHistory} from 'vue-router';
const Home = ()=> import(/*webpackChunkName: 'Home'*/'../views/Home');
const About = ()=> import(/*webpackChunkName: 'About'*/'../views/About');

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home,
        },
        {
            path: '/home',
            component: Home,
        },
        {
            path: '/about',
            component: About,
        }
    ]
})