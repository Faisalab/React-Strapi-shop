import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { setCartItems, calculateTotalPrice } from '../storage/index';
import Strapi from 'strapi-sdk-javascript';

const apiURL = 'http://localhost:1337';
const strapi = new Strapi(apiURL);

class App extends Component {

  state = {
    products: [],
    cartItems: [],
    alreadyInCart: false,
  }


  async componentDidMount() {
      let restId = this.props.match.params.brandId;
    try {
      const response = await strapi.request('POST', '/graphql', {
          data:{
              query: `query{
                restaurant(id: "${restId}"){
                  products{
                    id
                    name
                    description
                    price
                    image{
                      url
                    }
                    restaurant{
                      id
                    }
                  }
                }
              }`
          }
      });
      this.setState({ products: response.data.restaurant.products });
    } catch (error) {
      console.log(error);
    }
  }

  addToCart = (product) => {
    // add quantity value to product object
    product.quantity = 1;
    // spread cart items with new updated item
    let cartItems = [...this.state.cartItems, product];
    // set localstorage items to be retrieved in checkout
    setCartItems(cartItems);
    // set state with new items containing quantity value
    this.setState({ cartItems });
  }

  updateQuantity = (index) => {
    let items = [...this.state.cartItems];
    // add 1 to item quantity
    items[index].quantity += 1;
    // set state with new items
    this.setState({ cartItems: items });
    // set local storage
    setCartItems(this.state.cartItems);

  }

  handleClick = (product) => {
    let sameItem = this.state.cartItems.findIndex(item => item.id === product.id);
    sameItem !== -1 ? this.updateQuantity(sameItem) : this.addToCart(product);
  }


  render() {
    const { products, cartItems } = this.state;

    return (
      <div className="App">
        <div className="cart-split">
          <h1 style={{margin: '1em 0 0 2em', color: 'white'}}>See what we have to offer...</h1>
          {/* User Cart */}
          <div className="cart card ml-auto" style={{ width: '18rem', height: '250px', margin: '1em'}}>
            <div className="card-body">
              {/* Cart display */}
              <h5 className="card-title">Your Cart:</h5>
                {cartItems.map(item => (
                  <div key={item.id}>
                    <p className="card-text">{item.name} x {item.quantity} <span style={{float: 'right'}}>${calculateTotalPrice(item.quantity, item.price)}</span> </p>
                  </div>
                ))}
            </div>
          <Link to='/checkout' >Checkout</Link>
          </div>
        </div>

        <div className="products">
          {products.map(product => (
            <div className="unsplit" key={product.id}>
              <img src={`${apiURL}${product.image.url}`} alt="product-images" />
              <h5>{product.description}</h5>

              <div className="split">
                <span>{product.name} </span>
                <span>${product.price}</span>
                <span>
                  <Button
                    text='add to cart'
                    clickHandler={() => this.handleClick(product)}
                  />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

function Button(props) {
    return(
        <button className="btn" onClick={props.clickHandler}   >
            {props.text}
        </button>
    )
}


export default App;