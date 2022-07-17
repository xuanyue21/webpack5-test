/*
 * @Author: 翟珂峰
 * @LastEditTime: 2022-07-17 12:10:19
 * @Description: 
 */
import React,{Suspense,lazy} from 'react';
import {Routes,Route,Link} from 'react-router-dom';
const Home = lazy(()=> import(/*webpackChunkName: 'home'*/'./views/Home'));
const About = lazy(()=> import(/*webpackChunkName: 'about'*/'./views/About'));
// console.lor(233)
export default function App() {
    return (
        <div className="container">
            <h1>我是app标题</h1>
            <ul>
                <li>
                    <Link to='/home'>home</Link>
                </li>
                <li>
                    <Link to='/about'>about</Link>
                </li>
            </ul>
            <Suspense fallback={<div>loading</div>}>
                <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path='/home' element={<Home/>}></Route>
                    <Route path='/about' element={<About/>}></Route>
                </Routes>
            </Suspense> 
        </div>

       
    )
}