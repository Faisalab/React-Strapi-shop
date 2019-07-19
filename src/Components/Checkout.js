import React, { Component } from 'react';
import { getCartItems } from '../storage/index';

class Checkout extends Component {
    
    state = {
        checkoutItems: []
    }

    getItems = () => {
        const items = getCartItems('cartItems');
        this.setState({ checkoutItems: items });
        console.log(this.state.checkoutItems); 
    }

    render() {
        return (
            <div>
                <h1>YOOOOO</h1>
                <button onClick={() => this.getItems} >hey</button>
            </div>
        )
    }
}

export default Checkout;