import React from 'react';
import { useCart } from '../context/CartContext'; 

const Checkout = () => {
    const { cartItems } = useCart();

    return (
        <div>
            <h2>Checkout</h2>
            <ul>
                {cartItems.map(item => (
                    <li key={item.id}>{item.name} - ${item.price}</li>
                ))}
            </ul>
        </div>
    );
};

export default Checkout;
