import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
//MUI style imports
import {Typography, Grid, Card, Button, Box} from "@material-ui/core";

function Admin( props ){
    // hook to set fulfilled/unfulfilled orders view
    const [ fulfilled, setFulfilled ] = useState( false );

    const history = useHistory();
    const dispatch = useDispatch();
    const orders = useSelector((store) => store.orders);

    // on page load, get all orders
    useEffect(()=>{
        dispatch({type: 'FETCH_ORDERS'});
    }, []);

    // handles buton click to switch between fulfilled/unfulfilled views
    function toggleView(){
        setFulfilled(!fulfilled);
    }
    // on click, mark item as fulfilled/unfulfilled in database, then get all orders
    function fulfillOrder(cartID){
        dispatch({type: 'FULFILL_ORDER', payload: cartID});
    }
    // on click, delete item from cart, then get all orders
    function deleteOrder(cartID){
        dispatch({type: 'DELETE_ORDER', payload: cartID});
    }
    // formats order date returned from reducer
    const formatDate=(date)=>{
       return date.slice(0,10);
    }
     
    return(
        <div>
            <Grid 
                container
                direction='row'
                justifyContent='space-between'>
                    <Typography variant='h4'>{fulfilled ? "Fulfilled Orders" : "Unfulfilled Orders"}</Typography>
                    <Button onClick={toggleView}>{fulfilled ? "Show Unfulfilled" : "Show Fulfilled"}</Button>
            </Grid>
            
            <Card>     
                {/* render either fulfilled or unfulfilled orders depending on hook state. Items will
                render only if fulfilled field from database matches hook */}
                {orders.map(order =>(
                    <div key={order.id}>
                        {fulfilled === order.fulfilled &&
                            <Grid container
                            key={order.id}
                            spacing={4}
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center">
                                <Grid item xs={3}>
                                    <img src={order.image} alt="lure image" />
                                </Grid>
                                <Grid item xs={5}>
                                    <Typography variant='body1'>
                                        Title: {order.title} <br/> 
                                        Description: {order.description} <br/>
                                        User Email: {order.email} <br/>
                                        Qty: 1
                                        
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant='body1'>
                                        Order date: <br/>
                                        {formatDate(order.order_date)}
                                    </Typography>
                                </Grid>
                                {/* render different buttons depending on selected view */}                               
                                <Grid item xs={2}>
                                    <Button onClick={()=>{deleteOrder(order.id)}}>{!fulfilled ? "Cancel" : "Delete"}</Button>
                                    <br/>
                                    <Button onClick={()=>{fulfillOrder(order.id)}}>{!fulfilled ? "Fulfill" : "Un-Fulfill"}</Button>
                                </Grid>                                                     
                            </Grid>
                        }
                    </div>
                ))}
            </Card>
                <Button onClick={()=>{history.goBack()}}>Back</Button>
        </div>
    );
}

export default Admin;