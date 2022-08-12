import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
//MUI style imports
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
import {Typography, Grid, Card, Button} from "@material-ui/core";

function Admin( props ){
    // hook to set fulfilled/unfulfilled orders view
    const [ fulfilled, setFulfilled ] = useState( false );
    //

    const history = useHistory();
    const dispatch = useDispatch();
    const orders = useSelector((store) => store.orders);

    useEffect(()=>{
        dispatch({type: 'FETCH_ORDERS'});
    }, []);
     
    return(
        <div>
            <h2>Admin</h2>
            <Button></Button>
            <Card>     
                {/* render either fulfilled or unfulfilled orders depending on hook state. Items will
                render only if fulfilled field from database matches hook */}
                {orders.map(order =>(
                    <div key={order.id}>
                        {fulfilled === order.fulfilled ?
                            <Grid container
                            key={order.id}
                            spacing={6}
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
                                        User Email: {order.email}
                                    </Typography>
                                </Grid>
                                    {/* if showing unfulfilled orders, render buttons */}
                                    {!fulfilled ? 
                                        <Grid item xs={3}>
                                        <Button>Cancel</Button>
                                        <br/>
                                        <Button>Fulfill</Button>
                                        </Grid>
                                        :
                                        <></>
                                    }                               
                            </Grid>
                        :
                            <></>
                        }
                    </div>
                ))}
            </Card>
        </div>
    );
}

export default Admin;