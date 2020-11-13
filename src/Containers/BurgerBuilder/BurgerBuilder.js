import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary'
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'
import Modal from '../../Components/UI/Modal/Modal'
import axios from '../../axios-orders'
import Spinner from '../../Components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES ={
  salad:1.5,
  bacon:0.4,
  cheese:1.3,
  meat:0.7,
}

class BurgerBuilder extends Component {

  // constructor(props){
  //   super(props);
  // }
  state = {
    // ingredients:{
    //   salad:0,
    //   bacon:0,
    //   cheese:0,
    //   meat:0
    // },
    ingredients:null,
    totalPrice:4,
    purchasable:false,
    purchasing:false,
    loading:false,
    error:false,
  }

  componentDidMount (){
    axios.get('https://react-my-burger-e338b.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ingredients:response.data})
      })
      .catch(error => {
        this.setState({error:true})
      })
  }

updatePurchasable(ingredients){
  const sum = Object.keys(ingredients)
    .map((igKey) => {
      return ingredients[igKey];
    })
    .reduce((sum,el) =>{
      return sum + el;
    },0)
    this.setState({purchasable: sum > 0})
}

addIngredientHandler = (type) =>{
  const oldCount = this.state.ingredients[type];
  console.log(type);
  console.log(oldCount);
  const updatedCount = oldCount+1;
  const updatedIngredients = {
    ...this.state.ingredients
  }
  updatedIngredients[type] = updatedCount;
  const priceAddition = INGREDIENT_PRICES[type];
  const oldPrice = this.state.totalPrice;
  const newPrice = oldPrice + priceAddition;
  this.setState({totalPrice:newPrice,ingredients:updatedIngredients})
  this.updatePurchasable(updatedIngredients);
}

removeIngredientHandler = (type) =>{
  const oldCount = this.state.ingredients[type];
  if(oldCount <= 0){
    return;
  }
  const updatedCount = oldCount-1;
  const updatedIngredients = {
    ...this.state.ingredients
  }
  updatedIngredients[type] = updatedCount;
  const priceDeduction = INGREDIENT_PRICES[type];
  const oldPrice = this.state.totalPrice;
  const newPrice = oldPrice - priceDeduction;
  this.setState({totalPrice:newPrice,ingredients:updatedIngredients})
  this.updatePurchasable(updatedIngredients);
}

purchaseHandler = () => {
  this.setState({purchasing:true});
}

purchaseCancelHandler = () => {
  this.setState({purchasing:false});
}

purchaseContinueHandler = () => {
  // alert('You Continue');
  this.setState({loading:true})
  const order = {
    ingredients: this.state.ingredients,
    price: this.state.totalPrice,
    customer: {
      name:'Roshani',
      zipcode:'60500'
    }
  }

  axios.post('/orders.json',order)
  .then(response => 
    {this.setState({loading:false,purchasing:false})}
    )
  .catch(errors => 
    {this.setState({loading:false,purchasing:false})}
    )
}

    render(){
      const disabledInfo = {
        ...this.state.ingredients
      };

      for(let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0
      }

      let orderSummary = null;

      let burger = <Spinner/>

      if(this.state.ingredients){
        burger = (
          <Aux>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls 
              ingredientAdded = {this.addIngredientHandler}
              ingredientRemoved = {this.removeIngredientHandler}
              disabled = {disabledInfo}
              purchasable={this.state.purchasable}
              ordered={this.purchaseHandler}
              price={this.state.totalPrice}/>
            </Aux>
          );
          orderSummary = <OrderSummary 
          ingredients={this.state.ingredients} 
          price={this.state.totalPrice}
          purchaseCancelled={this.purchaseCancelHandler} 
          purchaseContinued={this.purchaseContinueHandler}/>
      }
      
      if(this.state.loading){
        orderSummary = this.state.error ? <p>Ingredients can't be loaded</p>:<Spinner/>
      }
      
      return (
        <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
              {orderSummary}
            </Modal> 
            {burger}           
        </Aux>
      );
    }
  }

  // export default BurgerBuilder;
  export default withErrorHandler(BurgerBuilder,axios);