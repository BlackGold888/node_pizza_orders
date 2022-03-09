import React, {Component} from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

class Show extends Component {
    constructor(props) {
        super(props);
        this.state = {isOrder: false}
    }

    async componentDidMount() {
        const response = await fetch(`/product/show?id=${this.props.match.params.id}`);
        const data = await response.text();
        this.setState((state, props) => {
            return {
                item: JSON.parse(data)
            }
        });
    }

    renderTotalPrice(){
        let totalPrice = 0;
        this.state.item.ingredients.forEach(ingredient => {
            if (ingredient.isChecked) {
                totalPrice += parseFloat(ingredient.price);
            }
        });
        return totalPrice;
    }

    changeIngredientState(name) {
        const temp = this.state.item;
        temp.ingredients.forEach((ingredient) => {
            if (ingredient.name === name) {
                ingredient.isChecked = !ingredient.isChecked;
            }
        })

        this.setState((state, props) => ({
            item: temp
        }))
    }

    async makeOrder(e){
        let data = {
            ...this.state.item,
            totalPrice: this.renderTotalPrice()
        }
        const res = await fetch('/order/save', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        })
        if (res.status === 200) {
            toast.success('🦄 Order created', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
            this.setState((state, props) => ({
                isOrder: !state.isOrder
            }));
        }else{
            toast.error('🦄 Something went wrong', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
        }
    }

    render() {
        if (!this.state.item){
            return null;
        }else{
            return (
                <div>
                    <h1>{this.state.item.name}</h1>
                    {this.state.item.ingredients.map((ingredient, indeX) => (
                        <li key={indeX}>{ingredient.name}: {ingredient.price} <input type="checkbox" onClick={() => this.changeIngredientState(ingredient.name)} value="" /></li>
                    ))}
                    <p>Total Price: {(this.renderTotalPrice() + this.renderTotalPrice() / 2).toFixed(2)}</p>
                    {this.state.isOrder ? null :  <button className={'btn btn-success'} onClick={() => {this.makeOrder()}}>Order</button>}
                    <ToastContainer />
                </div>
            );
        }
    }
}

export default Show;