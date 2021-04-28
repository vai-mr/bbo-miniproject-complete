import React from 'react';
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { useHistory } from 'react-router';

function Subtotal() {
    const [{basket}] = useStateValue();

    const history = useHistory();

    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText = {(value) => (
                    <>
                        <p className="title">
                            Subtotal ({basket?.length} items):<br></br>
                            <strong>{value}</strong>
                        </p>
                        
                    </>
                )}
                decimalScale = {2}
                value = {getBasketTotal(basket)}
                displayType = {"text"}
                thousandSeparator = {true}
                prefix={"₹"}
            />
            {/* users who want to make payment online*/}
            <button onClick={ e => history.push('/payment')}>Proceed to Checkout</button>
            <br></br>
            {/*user who want to block the book and collect the books directly */}
            {/*<button onClick={ e => history.push('/receipt')}>Block the Books</button>*/}
        </div>
    )
}

export default Subtotal
