import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
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
                <Route component = {Products} path="/:brandId" />
                <Route component = {Checkout} exact path="/checkout" />
                {/* <Route component = {Contact} path="/contact" /> */}
            </Switch>
        </React.Fragment>
    </Router>
)

ReactDOM.render(<Root />, document.getElementById('root'));


serviceWorker.unregister();
