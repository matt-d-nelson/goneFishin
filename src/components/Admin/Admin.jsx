import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
//MUI style imports
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
import {Typography, Grid, Card, Button} from "@material-ui/core";

function Admin( props ){
    // hook to toggle fulfilled/unfulfilled orders view
    const [ fulfilled, setFulfilled ] = useState( 'unfulfilled' );

    const history = useHistory();
    const dispatch = useDispatch();
    const unfulfilled = useSelector((store) => store.unfulfilled);

    useEffect(()=>{
        dispatch({type: 'FETCH_UNFULFILLED'});
    }, []);
     
    return(
        <div>
            <h2>Admin</h2>
            <Button>{fulfilled}</Button>
            <Card>     
                {/* render either fulfilled or unfulfilled orders depending on hook state */}
                {
                    fulfilled === 'unfulfilled' ?
                    
                    unfulfilled.map(item =>{
                        return (
                            <Grid container
                                key={item.id}
                                spacing={6}
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center">
                                    <Grid item xs={3}>
                                        <img src={item.image} alt="lure image" />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Typography variant='body1'>
                                            Title: {item.title} <br/> 
                                            Description: {item.description} <br/>
                                            User Email: {item.email}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Button>Cancel</Button>
                                        <br/>
                                        <Button>Fulfilled</Button>
                                    </Grid>
                            </Grid>
                            
                        )}
                    ) : (
                            <p>to do: fulfilled items</p>
                    )
                }

            </Card>
        </div>
    );
}

export default Admin;