/*
 * @Author: 翟珂峰
 * @LastEditTime: 2022-07-17 11:32:02
 * @Description: 
 */
import React from 'react';
import ReactDom from 'react-dom/client';
import { BrowserRouter} from 'react-router-dom';
import App from './App'
const reactRoot = ReactDom.createRoot(document.getElementById('root'));
reactRoot.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)