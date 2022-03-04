import './App.css';
import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Add from "./components/product/add";
import Products from "./components/Products";
import Show from "./components/product/show";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };
    }

    render() {
        return (
            <Router>
                <Switch>
                    <React.Fragment>

                        <nav className="navbar navbar-default">
                            <div className="container-fluid">
                                <div className="navbar-header">
                                    <Link className="navbar-brand" to="/">Products catalog</Link>
                                </div>
                                <ul className="nav navbar-nav">
                                    <li className="active">
                                        <Link to="/add">Add</Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        <div className={'container'}>
                            <Route path="/" exact>
                                <Products/>
                            </Route>
                            <Route path="/add" exact>
                                <Add/>
                            </Route>
                            <Route path="/product/show/:id" exact render={(props) => <Show {...props} />}/>
                        </div>
                    </React.Fragment>
                </Switch>
            </Router>
        );
    }
}

export default App;

