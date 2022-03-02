import React, {Component} from 'react';

class Products extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log(this.props);
    }

    renderProducts () {
        if (this.props.items) {
            return this.props.items.map(item => <li key={item._id}>{item.name}</li>);
        }
    }
    render() {
        return (
            <div>
                { this.renderProducts() }
            </div>
        );
    }
}

export default Products;