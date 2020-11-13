import React, { Component } from 'react'
import Auxiliary from '../../../hoc/Auxiliary'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component{

    componentWillUpdate(){
        console.log('[OrderSummary] WillUpdate')
    }

    render(){

        const ingredientSummary = Object.keys(this.props.ingredients)
        .map((igkey) => {
            return(
                <li>
                    <span style={{textTransform:'capitalize'}}>
                        {igkey}
                    </span>
                    : {this.props.ingredients[igkey]}
                </li>
            );
        })

        return(
            <Auxiliary>
            <h3>Your Order</h3>
            <p>Delicious Burger with the Following Ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price: {this.props.price.toFixed(2)}</p>
            <p>Continue to Checkout?</p>
            <Button btnType='Danger' clicked={this.props.purchaseCancelled}>CANCEL</Button>
            <Button btnType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
        </Auxiliary>
        )
    }
}

export default OrderSummary;