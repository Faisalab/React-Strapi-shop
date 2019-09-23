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
      // Make request to back end to recieve restaurant
      let response = await fetch(`${apiURL}/Restaurants`);
      let data = await response.json()
      // set brands to restaurant info recieved
      this.setState({ brands: data });
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
            <div key={brand.id} className="main-brands card" >
               <div style={{textAlign: 'center'}}>
                  <img src={`${apiURL}${brand.images.url}`} class="card-img-top" alt={`Click me for ${brand.name}`}/>
                </div>
              <div class="card-body">
                <h5 class="card-title">{brand.name}</h5>
                <p class="card-text">{brand.description}</p>
              </div>
              <Link to={`/${brand.id}`} className="btn btn-primary" style={{color: 'rgba(0,0,0,0.75)'}} >View Entrees</Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
