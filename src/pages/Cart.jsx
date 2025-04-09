import { useState, useEffect} from "react";
import Navbar from "../components/Navbar";
import {ii,items,buy, itemBox, changeAmount, itemName, itemInfo} from './Cart.module.css'

export default function Cart(){
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart'))|| [])
    return <>
    <Navbar tittle='Cart'/>
    <div className={items}>
    {cart.map(item=>{
        return <Item key={item.id} id={item.id} cart={cart} setCart={setCart} name={item.name} image={item.image} weight={item.weight} price={item.price} amount={item.amount}/>
    })}
    </div>
    <button className={buy}>{cart.length===0?'سبد خرید خالی است':'تسویه حساب'}</button>
    
    </>
}

function Item({id, cart, setCart, name, image, weight, price, amount}) {
    useEffect(function(){
        localStorage.setItem('cart', JSON.stringify(cart))
      },[cart])
    function handleAdd(){
        setCart(prevItems=>{
            return prevItems.map(prevItem=>prevItem.id===id?{...prevItem, amount: prevItem.amount+1}:prevItem)
        })
        
    }
    function handleMinus(){
        setCart(prevItems=>{
            return prevItems.map(prevItem=>prevItem.id===id?{...prevItem, amount: prevItem.amount-1}:prevItem)
        })
        setCart(items=>{
            const i = items.filter(item=>{
                return item.amount>0
            })
            localStorage.setItem('cart', JSON.stringify(i))
            return i
        })
    }
    return <div className={itemBox}>
        <img src={image} alt="" />
        <div className={itemName}>{name}</div>
        <div className={itemInfo}>
            <div className={ii}>
            <p>{weight}</p>
            <h3>{price*amount<1000? price*amount : price*amount/1000}{price*amount<1000? 'T': 'M'}</h3>
            </div>
            <div className={changeAmount}>
            <button onClick={handleAdd} style={{borderRadius: '0px 10px 10px 0px'}}>+</button>
            <p>{amount}</p>
            <button onClick={handleMinus}>-</button></div>
            </div>
    </div>
}