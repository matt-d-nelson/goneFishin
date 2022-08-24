import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Typography, Grid, Button, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

function CartItem( {item} ){
    // hook to set selected quantity of item
    const [ qty, setQty ] = useState( item.qty );

    const dispatch = useDispatch();

    // on click, removes an item from cart
    const removeItem=(cartID)=>{
        dispatch({type: "DELETE_ORDER", payload: cartID});
    }

    // on change, update cart item qty in local state
    const handleChange = (event) =>{
        setQty(event.target.value);
    }

    // on click, update cart item quantity in cart item table in database
    const updateCartQty = () =>{
        dispatch({
            type: 'UPDATE_CART_QTY',
            payload: {
                id: item.id,
                qty: qty,
                message: 'Quantity updated'
            }
        });
    }
     
    return(
        <>
            <Grid item xs={3}>
                <img src={item.image} alt="lure image" />
            </Grid>
            <Grid item xs={5} m={2}>
                <Typography variant='body1' p={1}>
                    Title: {item.title} <br/>
                    Description: {item.description} 
                </Typography>
                <FormControl size='small'>
                    <InputLabel>Qty</InputLabel>
                    <Select
                        labelId='update-quantity-label'
                        id='update-qty'
                        value={qty}
                        label='Quantity'
                        onChange={handleChange}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                    </Select>
                </FormControl>
                <Button onClick={updateCartQty}>Update Qty</Button>
            </Grid>
            <Grid item xs={2} m={2}>
                <Button onClick={()=>{removeItem(item.id)}}>Remove</Button>
            </Grid>
        </>     
    );
}

export default CartItem;