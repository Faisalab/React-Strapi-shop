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
            <div key={brand.id} className="main-brands card" >
               <img src={`${apiURL}${brand.images.url}`} class="card-img-top" alt="..."/>
              <div class="card-body">
                <h5 class="card-title">{brand.name}</h5>
                <p class="card-text">{brand.description}</p>
                
              </div>
              <Link to={`/${brand.id}`} className="btn btn-primary" >View Entrees</Link>
            </div>
            


          ))}
        </div>
        
      </div>
    );
  }

  
}

export default App;
