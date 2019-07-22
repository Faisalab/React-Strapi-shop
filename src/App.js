import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const apiURL = 'http://localhost:1337';

class App extends Component {

  state = {
    brands: []
  }

  
  async componentDidMount() {
  console.log(this.props);  
    try {
      
      let response = await fetch("http://localhost:1337/Restaurants");
      let data = await response.json()
      console.log(data);
      this.setState({ brands: data });
      // console.log(this.state.brands);
    } catch (error) {
      console.log(error);
    }
  }


  render() {
    const { brands } = this.state;

    return (
      <div className="App">
       
        <div className="brands">
          {brands.map(brand => (
            <div key={brand.id}>
              <img src={`${apiURL}${brand.images.url}`} alt="restaurant-logo" />
              <hgroup>
                <h4>{brand.name}</h4>
                <h5>{brand.description}</h5>
              </hgroup>
              <Link to={`/${brand.id}`}>View Entrees</Link>
            </div>
          ))}
        </div>
        
      </div>
    );
  }

  
}

export default App;
