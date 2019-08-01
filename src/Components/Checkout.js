import React, { Component } from 'react';
import { setCartItems ,getCartItems, calculateTotalPrice } from '../storage/index';

class Checkout extends Component {
    
    state = {
        checkoutItems: JSON.parse(localStorage.getItem('cartItems')) || {},
        total: 0
    }

       async componentDidMount(){
        this.state.checkoutItems.map(item => {
            let quant = item.price*item.quantity;
            this.state.total = this.state.total + quant;
           })
           this.setState({ total: this.state.total.toFixed(2) });
       }
        

       totalPrice = (prices) => {

       }
    

  

    render() {
        const { checkoutItems, total } = this.state;
        return (
            <div className="card">
                <div className="checkout-body card-body">
                    <h5>Cart Summary: </h5>
                    {checkoutItems.map(item => (
                        <div key={item.id} style={{margin: '1em'}} className="card">
                            <div className="checkout-body card-body">
                                    <p className="card-text">
                                        {item.name}&nbsp; <i class="fas fa-times"></i>&nbsp; {item.quantity} 
                                        <span style={{float: 'right'}}>${calculateTotalPrice(item.quantity, item.price)}</span> 
                                        <a href="!#" style={{float: 'right', color: 'red', margin: '0 1em'}} onClick={() => this.removeCheckoutItem(item.id)} >X</a>
                                    </p>
                            </div>
                        </div>
                    ))}    
                </div>
                
                <Total totalPrice = {total} />
                
            </div>
            
         
        )
    }
}

function Total(props) {
    return (
        <div  style={{ marginLeft: '80vw' }}>
            <h4 style={{ paddingBottom: '1em' }}>Total = <span style={{ color: '#2980B9' }}>${props.totalPrice}</span> </h4>
        </div>
    )
}





export default Checkout;