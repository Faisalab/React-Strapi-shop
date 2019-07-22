import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// import './App.css';
import { setCartItems, getCartItems, calculateTotalPrice } from '../storage/index';
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
      console.log(restId);
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
    //   console.log(response.data.restaurant);
      this.setState({ products: response.data.restaurant.products });
      // console.log(this.state.brands);
    } catch (error) {
      console.log(error);
    }
  }

  addToCart = (product) => {
    product.quantity = 1;
    let cartItems = [...this.state.cartItems, product];
    setCartItems(cartItems);
    this.setState({ cartItems });
    console.log(localStorage);
  }
  
  updateQuantity = (index) => { 
    let items = [...this.state.cartItems];
    items[index].quantity += 1;
    this.setState({ cartItems: items });
    setCartItems(this.state.cartItems);
    
    // console.log(this.state.cartItems);
    // console.log(localStorage);
    
  }

  handleClick = (product) => {
    let sameItem = this.state.cartItems.findIndex(item => item.id === product.id);
    // console.log(sameItem);
    sameItem !== -1 ? this.updateQuantity(sameItem) : this.addToCart(product);
    // if(sameItem !== -1){
    //     this.updateQuantity(sameItem); 
    // } else {
    //   this.addToCart(product)
    // }  
  }


  render() {
    const { products, cartItems } = this.state;

    return (
      <div className="App">
        {/* User Cart */}
        <div className="card ml-auto" style={{ width: '18rem', height: '200px', margin: '1em'}}>
          <div className="card-body">
            <h5 className="card-title">Your Cart:</h5>
              {cartItems.map(item => (
                <div key={item.id}>
                  <p className="card-text">{item.name} x {item.quantity} <span style={{float: 'right'}}>${calculateTotalPrice(item.quantity, item.price)}</span> </p>
                  {/* <p></p> */}
                </div>
              ))}    
          </div>
        <Link to='/checkout' >Checkout</Link>
        </div>
        
        <div className="brands">
          {products.map(product => (
            <div key={product.id}>
              <img src={`${apiURL}${product.image.url}`} alt="product-images" />
              <hgroup>
                <h4>{product.name}</h4>
                <h5>{product.description}</h5>
                <h5>{product.price}</h5> 
              </hgroup>
              <Button 
                text='add to cart'
                clickHandler={() => this.handleClick(product)}
              />
            </div>
          ))}
        </div>
        
        
      </div>
    );
  } 
}

function Button(props) {
    return(
        <button className="btn btn-success" onClick={props.clickHandler}   >
            {props.text}
        </button>
    )
}


export default App;