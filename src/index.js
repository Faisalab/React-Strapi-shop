import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Navbar from './Components/Navbar';
import Products from './Components/Products';
import Checkout from './Components/Checkout';
import * as serviceWorker from './serviceWorker';


const Root = () => (
    <Router>
        <React.Fragment>
            <Navbar />
            <Switch>
                <Route component = {App} exact path="/" />
                <Route component = {Checkout} path="/checkout" />
                <Route component = {Products} exact path="/:brandId" />
                {/* <Route component = {Contact} path="/contact" /> */}
            </Switch>
        </React.Fragment>
    </Router>
)

ReactDOM.render(<Root />, document.getElementById('root'));


serviceWorker.unregister();
