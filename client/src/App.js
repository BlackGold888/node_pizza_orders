import './App.css';
import React, {Component} from 'react';
import Product from "./components/Products";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };
    }
    async componentDidMount() {
        const response = await fetch('ingredient/all');
        const data = await response.text();
        this.setState((state, props) => {
            return {
                items: JSON.parse(data)
            }
        });
        console.log(this.state.items);
    }
    render() {
    return (
        <div className={'container'}>
            <Product items={this.state.items} />
        </div>
    );
  }
}

export default App;

