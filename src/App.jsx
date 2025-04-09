import Navbar from "./components/Navbar";
import './App.css'
import { use, useEffect, useRef, useState } from "react";
import ItemList from '../src/Config/items.json'
import Categories from '../src/Config/Categories.json'
import { Toaster, toast } from "react-hot-toast";

export default function App(){
  const [placed, setPlaced] = useState('p');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || [])
  useEffect(function(){
    localStorage.setItem('cart', JSON.stringify(cart))
  },[cart])
  function handleAddToCart(id){
    /*cart.current = JSON.parse(localStorage.getItem('cart')) || []
    
    item.current = ItemList.find(item=>{
      if(item.id===id){
        return item
      }
    })
    console.log(item.current)
    if(('amount' in item.current)){
      console.log(cart)
      cart.current = cart.current.filter(dItem=>{
        dItem.id!==item.id
      })
      item.current.amount+=1
      console.log('delete:', cart.current)
      
    }else{
      item.current.amount = 1
      console.log(item)
      cart.current.push(item.current)
    }
    console.log('cart value:', cart)
    localStorage.setItem('cart',JSON.stringify(cart));*/
    
    setCart(prevItems=>{
      
      const item = ItemList.find(ti=>ti.id===id?ti:false)
      const existingItem = prevItems.find(pi=>pi.id===item.id)
    if(existingItem){
      return prevItems.map(prevItem=>prevItem.id===id?{...prevItem, amount: prevItem.amount+1}:prevItem)
      
    }else{
      return [...prevItems, {...item, amount: 1}]
    }
    })
    toast.success('به سبد خرید اضافه شد',{
      style:{
        direction: 'rtl',
        border: '1px solid yellow'
      }
    });
  }
  
  return <>
  <Navbar tittle='PixelPizza'/>
  <div><Toaster/></div>
  <div className='Categories'>
  <Search search={search} setSearch={setSearch}/>
  {Categories.map(category=>{
    return <Category key={category.id} id={category.id} placed={placed} setPlaced={setPlaced} icon={category.icon}><p>{category.name}</p></Category>
  })}
  </div>
  <div className="Items">
  {ItemList.map((item)=>{
    if(search){
      if(item.name.includes(search)){
        return <Item key={item.id} id={item.id} Name={item.name} Image={item.image} Price={item.price} Weight={item.weight} handleAddToCart={handleAddToCart}/>
      }
    }else{
      if(item.id.includes(placed)){
        return <Item key={item.id} id={item.id} Name={item.name} Image={item.image} Price={item.price} Weight={item.weight} handleAddToCart={handleAddToCart}/>}
  }})}
  </div>
  
  </>
}
function Category({children, icon, placed, setPlaced, id}){
  
  return  <div onClick={()=>{setPlaced(id); }} className={`${'CategoryBox'} ${placed===id&& 'placed'}`}>
    <img src={icon} alt="" />
    {children}
  </div> 

}
function Search({search, setSearch}){
  return<div className='SearchBox'>
    <input value={search} onChange={(e)=>setSearch(e.target.value)} dir="rtl" placeholder="جستجو..." type="search"/>
    <img src="src\assets\icons\search.png" alt="" />
  </div>
}
function Item({id, Name, Price, Weight, Image, handleAddToCart}){
  return<div onClick={()=>handleAddToCart(id)} className="ItemBox">
    <img className="ItemImage" src={Image} alt="" />
    <h1 className="ItemName">{Name}</h1>
    <p className="ItemPrice">{Price<=1000? Price : Price/1000}{Price>=1000?'M':'T'}</p>
    <p className="ItemWeight">{Weight}</p>
  </div>
}