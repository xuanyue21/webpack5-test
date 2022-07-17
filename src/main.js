/*
 * @Author: 翟珂峰
 * @LastEditTime: 2022-07-17 14:04:32
 * @Description: 
 */
import {createApp} from 'vue';
import App from './App';
import router from './router';

createApp(App).use(router).mount(document.getElementById('app'));