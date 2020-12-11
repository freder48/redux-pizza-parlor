//imports //imports JUST the component from react not ALL of react 
import React, { Component } from 'react';
import './CustomerForm.css';
import { connect } from 'react-redux'; 


//class
class CustomerForm extends Component{ 

    state = { 
        newOrder: { 
            customer_name: '',
            street_address: '', 
            city: '', 
            zip: '', 
            type: '',
            total: '23', 
        }
    }

   
    checkout = () => { 
        this.total(); 
        console.log('checking out', this.state.newOrder); 
        this.props.dispatch( { type: 'ADD_ORDER', payload: this.state.newOrder} ); 
        this.props.history.push('/checkout');
    }
     handleChange = (event, inputType) => { 
        console.log(inputType, '=', event.target.value)
        this.setState({     
            newOrder: { 
                ...this.state.newOrder,
                [inputType]: event.target.value,
            }  
        }) 
    }


    total = () => { 
        let total = 0; 
        for (const pizza of this.props.reduxState.checkoutReducer) { 
            total += pizza.price/1; 
            console.log('pizza.price is', pizza.price); 
            console.log('total is', total); 
        } 
        this.setState({     
            newOrder: { 
                ...this.state.newOrder,
                total: total
            }  
        }) 
    }
    // CHECKOUT_PIZZA

    render(){ 

        return(
            <div>
                <input placeholder="customer_name" onChange={(event) => this.handleChange(event, 'customer_name')}/> 
                <br/>
                <br/>
                <input placeholder="street_address" onChange={(event) => this.handleChange(event, 'street_address')}/> 
                <br/>
                <br/>
                <input placeholder="city" onChange={(event) => this.handleChange(event, 'city')}/> 
                <br/>
                <br/>
                <input placeholder="zip" onChange={(event) => this.handleChange(event, 'zip')}/> 
                <br/>
                <br/> 
                <form>
                    <div>
                        <input type="radio" name="contact" value="pickup" onChange={(event) => this.handleChange(event, 'type')}/>
                        <label >Pickup</label>
                        <input type="radio" name="contact" value="delivery" onChange={(event) => this.handleChange(event, 'type')}/>
                        <label >Delivery</label>
                    </div>
                </form>
                <p className="total-p">total: </p> 
                <button className="checkout-btn" value="checkout" onClick={this.checkout}>Checkout</button>          
                {JSON.stringify(this.props.reduxState.checkoutReducer)}
            </div>
        ) 
    } 
} 

//export
const putReduxStateOnProps = ( reduxState) => ({ 
    reduxState
  })
  
  export default connect(putReduxStateOnProps)(CustomerForm) 
