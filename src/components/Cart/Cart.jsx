import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { Typography, Grid, Card, Button } from "@mui/material";
import CartItem from '../CartItem/CartItem';

function Cart(){

    const history = useHistory();
    const dispatch = useDispatch();
    // user's unordered cart items from store
    const cart = useSelector((store)=> store.cart);
    // logged in user's info from store
    const user = useSelector((store)=>store.user);

    // on page load, get all items this user has added to cart (where ordered=false)
    useEffect(()=>{
        dispatch({type: "FETCH_CART_ITEMS"});
    }, []);

    // marks all items in cart as ordered and gives them an ordered date
    const submitOrder =()=>{
        dispatch({type: "ORDER_CART_ITEMS"});
    }

    // on click, removes an item from cart
    const removeItem=(cartID)=>{
        dispatch({type: "DELETE_ORDER", payload: cartID});
    }

    return(
        <div>
            <Typography variant='h4' m={2}>{user.username}'s cart</Typography>
            <Card>
                {/* map through cart and create an item component for each */}
                {cart.map(item => (
                    <Grid
                        container
                        key={item.id}
                        spacing={4}
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="top">
                            <CartItem item={item}/>
                    </Grid>
                ))}
            </Card>
            <Grid container
                justifyContent="center">
                <Grid item m={2}>       
                    <Button variant='contained' onClick={()=>{history.goBack()}}>Back</Button>
                </Grid>
                <Grid item m={2}> 
                    <Button variant='contained' onClick={submitOrder}>Submit Order</Button>
                </Grid> 
            </Grid>
        </div>
    );
}

export default Cart;