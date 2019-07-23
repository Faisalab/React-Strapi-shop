import React, { Component } from 'react';
import { setCartItems ,getCartItems, calculateTotalPrice } from '../storage/index';

class Checkout extends Component {
    
    state = {
        checkoutItems: JSON.parse(localStorage.getItem('cartItems')) || {}
    }

       
        
    

  

    render() {
        const { checkoutItems } = this.state;
        return (
            <div className="card">
                <div className="card-body">
                    <h5>Cart Summary: </h5>
                    {checkoutItems.map(item => (
                        <div key={item.id} style={{margin: '1em'}} className="card">
                            <div className="card-body">
                                    <p className="card-text">
                                        {item.name} x {item.quantity} 
                                        <span style={{float: 'right'}}>${calculateTotalPrice(item.quantity, item.price)}</span> 
                                        <a href="!#" style={{float: 'right', color: 'red', margin: '0 1em'}} onClick={() => this.removeCheckoutItem(item.id)} >X</a>
                                    </p>
                            </div>
                        </div>
                    ))}    
                </div>
            </div>
         
        )
    }
}

export default Checkout;