import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar() {
    return (
        <div className="nav">

            <div className="nav-item"><NavLink to="/">Home</NavLink></div>
            <div className="nav-item"><NavLink to="/"><i class="fas fa-utensils"></i>&nbsp; The Three Courses</NavLink></div>
            <div className="nav-item"><NavLink to="/checkout">Checkout</NavLink></div>   
            {/* <div className="nav-item"><NavLink to="/checkout">Checkout</NavLink></div>    */}


           
        </div>
    )
}

export default withRouter(Navbar);