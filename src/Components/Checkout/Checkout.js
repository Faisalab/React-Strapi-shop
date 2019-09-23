import React, { Component } from 'react';
import { Elements, StripeProvider, CardElement, injectStripe } from 'react-stripe-elements';
import { withRouter } from 'react-router-dom'
import { calculateTotalAmount, setCartItems } from '../../storage/index';

import Strapi from 'strapi-sdk-javascript/build/main';

const apiUrl = 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

class _CheckoutForm extends Component {
    state = {
        checkOutItems: JSON.parse(localStorage.getItem('cartItems')) || {},
        name: '',
        email: '',
        address: '',
        city: '',
    }

    handleOrder = async (e) => {
        e.preventDefault();
        const { checkOutItems, city, address } = this.state;
        // create amount value to send to backend to create charge
        const amount = calculateTotalAmount(checkOutItems);
        let token;
        try {
            // assign stripe token value once created using stripe method
            const response = await this.props.stripe.createToken();
            token = response.token.id;
            // create entry for strapi orders content type to update
            await strapi.createEntry('orders', {
                address,
                city,
                products: checkOutItems,
                amount,
                token
            });
            // clear cart and storage once the purchase is completed
            localStorage.clear();
            // grab root url from props recieved from withRouter
            this.props.history.push('/');
            console.log('processed');
        } catch (error) {
            console.log(error);
        }
        
    }

    removeItem =(e,removalId) => {
        e.preventDefault();
        // create new instance of localStorage
        let items = JSON.parse(localStorage.getItem('cartItems'));
        // filter out clicked item
        let newItems = items.filter(obj => obj.id !== removalId);
        //set localStorage with new array without removed item
        setCartItems(newItems);
        //setState so change is rendered in browser
        this.setState({ checkOutItems: JSON.parse(localStorage.getItem('cartItems')) })
    }

    render() {
        const { checkOutItems } = this.state;
        return (
            <div>
                {checkOutItems.length > 0 ? <React.Fragment>
                    {/* CART Summary */}
                    <div className="container checkout-container">
                        <div className='cart-summary'>
                        {checkOutItems.map(item => (
                            <p key={item.id} >{item.name} x {item.price*item.quantity} <span className="remover"><a href="!#" onClick={(e)=> this.removeItem(e,item.id)}>&#10008;</a></span></p>
                        ))}
                        <h3>Total: ${calculateTotalAmount(checkOutItems)}</h3>
                    </div>
                        <div className="checkout-form" >
                        {/* FORM */}
                        <form onSubmit={(e) => this.handleOrder(e)}>
                            <div><input placeholder="Name" type="text" name="name" onChange={(e) => this.setState({name: e.target.value})} /></div>
                            <div><input placeholder="Address" type="text" name="address" onChange={(e) => this.setState({address: e.target.value})} /></div>
                            <div><input placeholder="City" type="text" name="city" onChange={(e) => this.setState({city: e.target.value})} /></div>
                            <div><input placeholder="Email" type="text" name="email" onChange={(e) => this.setState({email: e.target.value})} /></div>
                            
                            <CardElement onReady={input => input.focus()} />
                            <button className="check-btn" type="submit">Confirm Order</button>
                        </form>
                    </div>
                    </div>
                </React.Fragment> : <div className="add-items-text"><h3>Whew. Empty in here, no? Add some items!</h3> </div> }
            </div>
        )
    }
}

const CheckoutForm = injectStripe(withRouter(_CheckoutForm));

const Checkout = () => (
    <StripeProvider apiKey='MY_PUBLISHABLE_KEY'>
        <Elements>
            <CheckoutForm />
        </Elements>
    </StripeProvider>
)

export default Checkout;
