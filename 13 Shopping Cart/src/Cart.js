import React from "react";

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
            
            <h1 className="cart_title">Shopping Cart</h1>

            <div>{cartQty === 0 ? 'No item in cart' : ''}</div>

            <h3>{props.cart.length}</h3>

            {props.cart.map(item => {
                return(
                <div key={item.id}>

                    <div>
                    <img src={item.images.smallIcon} alt={item.id}></img>
                    </div>

                    <div>
                        <h3>{item.name}</h3>
                        <p>{item.rarity.value}</p>
                        <div>
                            <button onClick={() => subQty(item)}>-</button>
                            <span>{item.qty}</span>
                            <button onClick={() => addQty(item)}>+</button>
                        </div>
                    </div>
                </div>
                )
            })}

        </div>
    )



}

export default Cart;