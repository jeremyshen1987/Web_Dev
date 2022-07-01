import React from "react";
import './Cart.css'

const Cart = (props) => {

    const cartQty = props.cart.length

    function addQty(item){

        props.setCart( preArr => {

            const newArr = preArr.map(obj => {
                if(obj.id === item.id){
                    return {...obj, qty : obj.qty + 1}
                }
                return obj
            })

        return newArr
        })

    }

    function subQty(item){

        if(item.qty === 1){

            props.setCart( preArr => {
                const newArr = preArr.filter(obj => obj.id !== item.id)
                return newArr
            })

            return
        }

        props.setCart( preArr => {

            const newArr = preArr.map(obj => {
                if(obj.id === item.id){
                    return {...obj, qty : obj.qty - 1}
                }
                return obj
            })

        return newArr
        })
    }


    return(

        <div>
            
            <div className="cart_title">Shopping Cart</div>

            <div>{cartQty === 0 ? 'No item in cart' : ''}</div>


            {props.cart.map(item => {
                return(
                <div className="single_item_container" key={item.id}>

                    <div>
                    <img className="item" src={item.images.smallIcon} alt={item.id}></img>
                    </div>

                    <div className="cart_item_details">
                        <h3>{item.name}</h3>
                        <div className={item.rarity.value}>{item.rarity.value}</div>
                        <div>{item.type.value}</div>
                        <div className="qty_container">Qty: &nbsp;
                            <button onClick={() => subQty(item)}>-</button>
                            <span>  {item.qty}  </span>
                            <button onClick={() => addQty(item)}>+</button>
                        </div>
                    </div>
                </div>
                )
            })}

            <div>
                {cartQty === 0 ? '' : `Number of Items: ${cartQty}`}
            </div>

        </div>
    )



}

export default Cart;