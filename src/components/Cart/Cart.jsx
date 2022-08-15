import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { Typography, Grid, Card, Button } from "@mui/material";

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
    
    const submitOrder =()=>{
        dispatch({type: "ORDER_CART_ITEMS"});
    }

    return(
        <div>
            <Typography variant='h4' m={2}>{user.username}'s Cart</Typography>
            <Card>
                {/* map through cart items and display */}
                {cart.map(item => (
                    <Grid
                        container
                        key={item.id}
                        spacing={4}
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="top">
                            <Grid item xs={3}>
                                <img src={item.image} alt="lure image" />
                            </Grid>
                            <Grid item xs={5} m={2}>
                                <Typography variant='body1'>
                                    Title: {item.title} <br/>
                                    Description: {item.description} <br/>
                                    Qty: 1
                                </Typography>
                            </Grid>
                            <Grid item xs={2} m={2}>
                                <Button>Edit</Button>
                                <Button>Remove</Button>
                            </Grid>
                    </Grid>
                ))}
            </Card>
            <Grid container xs={12}
                justifyContent="center">
                <Grid item m={4}>       
                    <Button variant='contained' onClick={()=>{history.goBack()}}>Back</Button>
                    <Button variant='contained' onClick={submitOrder}>Submit Order</Button>
                </Grid> 
            </Grid>
        </div>
    );
}

export default Cart;