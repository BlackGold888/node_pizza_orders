import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {items: []}
    }

    async componentDidMount() {
        const response = await fetch('product/all');
        const data = await response.text();
        this.setState((state, props) => {
            return {
                items: JSON.parse(data)
            }
        });
    }

    renderProducts () {
        if (this.state.items) {
            return this.state.items.map(item => (<Link to={`/product/show/${item._id}`} key={item._id}><div className="col product jumbotron" >{item.name}</div></Link>));
        }
    }
    render() {
        return (
            <div className="row products_container">
                { this.renderProducts() }
            </div>
        );
    }
}

export default Products;