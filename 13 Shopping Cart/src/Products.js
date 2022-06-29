import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Products.css'


const Products = (props) => {

  const [inventory, setInventory] = useState([])
  

  useEffect(() => {

    getItems()

  }, [])


  async function getItems(){

    const response = await fetch('https://fortnite-api.com/v2/cosmetics/br/new')

    if(response.status !== 200){
      return 'Error occured while retrive items'
    }

    const responseJSON = await response.json()
    const itemsArr = responseJSON.data.items
    // console.log(items.data.items)
    setInventory([...itemsArr])

  }

  function addItemToCart(item){
    console.log(item)
    // console.log(props.setCart)
    const itemInCart = props.cart.filter(el => el.id === item.id)

    if(itemInCart.length === 0){
      item.qty = 1
      props.setCart([...props.cart, item])
      console.log(props.cart)
    }
    else{
      return
    }

    

  }

  function capitalize(word){
    return word[0].toUpperCase() + word.slice(1)
  }

  return (
    <div className="container">


      <h1>Hello from Products</h1>
      <Link to='/cart'>Cart</Link>


      <div className="items_container">
      {inventory.map((item) => {
        return <div key={item.id} className='item_box'>
                <h2>{item.name}</h2>
                <div className="item_description">{capitalize(item.description)}</div>

                {/* <h2 className="item_description">{capitalize(item.description)}</h2> */}


                <div>Type: {capitalize(item.type.value)}</div>
                <div>Rarity: {capitalize(item.rarity.value)}</div>
                <img src={item.images.icon} alt={item.name}></img>
                <button className="btn_addItem" onClick={() => addItemToCart(item)}>Add to Cart</button>
               </div>
      })}
      </div>


    </div>
  );
};
  
export default Products;