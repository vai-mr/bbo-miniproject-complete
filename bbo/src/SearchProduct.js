import React from 'react';
import './SearchProduct.css';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';

function SearchProduct({id, image, title, price, rating}) {

    const [{basket}, dispatch] = useStateValue();
    console.log("this is the basket >>> ", basket);
    const addToBasket = () => {
        //dispatch the item into data layer
        //dispatch allows u to shoot into the dl
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
                key:`${getBasketTotal(basket) +1}`
            },
        });
    }


    return (
        <div className='searchProduct'>
            <img className='searchProduct_image' src={image} alt="" />
            <div className="searchProduct_info">
                <p className='searchProduct_title'>{title}</p>
                <p className='searchProduct_price'>
                    <small>₹</small>
                    <strong>{price}</strong>
                </p>
                <div className="searchProduct_rating">
                    {Array(rating)
                    .fill()
                    .map((_,i) =>(
                        <p>⭐</p>
                    ))}
                </div>
                <button onClick={addToBasket}>Add to Basket</button>
            </div>
        </div>
    )
}

export default SearchProduct
