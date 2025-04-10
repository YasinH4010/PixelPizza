import { NavLink } from 'react-router'
import {Navbox} from './navbar.module.css'

export default function Navbar({tittle}){
    function handleBack(){
        
    }
    function handleLogin(){

    }
    return<div className={Navbox}>
    {tittle==='PixelPizza'? <NavLink to='/login' key={Math.random()}><img src='/icons/login.png'/></NavLink>:<NavLink to='/' key={Math.random()}><img src='/icons/back.png'/></NavLink>}
    <p>{tittle}</p>
    {tittle==='PixelPizza'?<NavLink to='/cart' key={Math.random()}><img src="/icons/cart.png" alt=""/></NavLink>:<div></div>}
    </div>
}