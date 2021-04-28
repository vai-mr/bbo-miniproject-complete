import React from 'react';
import "./Checkout.css";
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal';

function Checkout() {
    //read the user and basket details from firebase
    const [{basket, user}, dispatch] = useStateValue();

    return (
        <div className="checkout">
            <div className="checkout_left">
                <div>
                    <h3 className="checkout_title">Hello, {user?.email}</h3>
                    <h2 className="checkout_title">Your Shopping Basket</h2>

                    {basket.map(item => (
                        <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))}
                    
                </div>
            </div>

            <div className="checkout_right">
                <Subtotal />
            </div>

            
        </div>
    )
}

export default Checkout
