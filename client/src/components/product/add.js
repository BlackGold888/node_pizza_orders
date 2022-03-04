import React, {Component} from 'react';

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredientCounter: 1
        }
    }
    addIngredient() {
        if (this.state.ingredientCounter < 10) {
            this.setState((state) => {
                return {ingredientCounter: state.ingredientCounter + 1}
            });
        }
    }

    renderIngredient(){
      return Array.from(Array(this.state.ingredientCounter).keys()).map((i) => <div key={i} className="input-group ingredient mb-5">
            <input type="text" className="form-control" name={'ingredientName[]'} placeholder="Ingredient"/>
            <input type="float" min={0} className="form-control" name={'ingredientPrice[]'} placeholder="Ingredient price"/>
            <button type="button" className="btn btn-default" onClick={() => this.addIngredient()}>
                <i className="glyphicon glyphicon-plus" />
            </button>
        </div>)
    }
    render() {
        return (
            <div className="row">
                <div className="col">
                    <form action="/product/save" method={'POST'}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" id="name" name={'name'}/>
                        </div>
                        {this.renderIngredient()}
                        <br/>
                        <button type="submit" className="btn btn-success">Add</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Add;