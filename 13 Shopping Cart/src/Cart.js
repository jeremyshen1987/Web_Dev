import React, {useState, useEffect} from "react";
import './Cart.css'

const Cart = (props) => {

    const cartQty = props.cart.length

    const [priceTotal, setPriceTotal] = useState(0)

    useEffect(() => {
    
        if(cartQty === 0){
            setPriceTotal(preVal => preVal = 0)
            return
        }

        const total = props.cart.reduce((total, nextVal) => {

            return total + nextVal.price * nextVal.qty
        }, 0)

        setPriceTotal(total)
  
    }, [props.cart])


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

            <div className="cart_header">
                <div></div>
                <div>Item details</div>
                <div>Unit Price</div>
                <div>&nbsp; &nbsp; &nbsp;Qty</div>
            </div>


            {props.cart.map(item => {
                return(
                <div className="single_item_container" key={item.id}>

                    <div>
                    <img className="item" src={item.images.smallIcon} alt={item.id}></img>
                    </div>

                    <div className="cart_item_details">
                        <h3>{item.name}</h3>
                        <div><span className={item.rarity.displayValue}>{item.rarity.displayValue}</span></div>
                        <div>{item.type.value}</div>
                    </div>

                    <div>
                        <div className="price">${item.price}</div>
                    </div>

                    <div>
                        <div className="qty_container">
                            <button onClick={() => subQty(item)}><img className="change_qty" src="./svg/minus.svg" alt="cart"></img></button>
                            <span>  {item.qty}  </span>
                            <button onClick={() => addQty(item)}><img className="change_qty" src="./svg/plus.svg" alt="cart"></img></button>
                        </div>
                    </div>
                </div>
                )
            })}

            <div className="empty_cart">{cartQty === 0 ? 'No item in cart' : ''}</div>

            <div className="checkout_total">
                {cartQty === 0 ? '' : `Total Price: ${priceTotal}`}
            </div>

            <div className="checkout">
                {cartQty === 0 ? '' : <button className="checkout_btn">PAY</button>} 
            </div>

        </div>
    )



}

export default Cart;