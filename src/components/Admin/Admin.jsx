import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
//MUI style imports
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
import {Typography, Box, Grid, Card} from "@material-ui/core";

function Admin( props ){
    // hook to toggle fulfilled/unfulfilled orders view
    const [ fulfilled, setFulfilled ] = useState( false );

    const history = useHistory();
    const dispatch = useDispatch();
    const unfulfilled = useSelector((store) => store.unfulfilled);

    useEffect(()=>{
        dispatch({type: 'FETCH_UNFULFILLED'});
    }, []);
     
    return(
        <div>
            <h2>Admin</h2>
            <Card>
                {/* render either fulfilled or unfulfilled orders depending on hook state */}
                {
                    !fulfilled ?
                    unfulfilled.map(item =>{
                        return (
                            <Grid container
                                key={item.id}
                                container-spacing={2}
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center">
                                    <Grid item xs={2}>
                                        <img src={item.image} alt="lure image" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant='body1'>
                                            Title: {item.title} <br/> 
                                            Description: {item.description}
                                        </Typography>

                                    </Grid>
                                    <Grid>

                                    </Grid>
                            </Grid>
                        )
                    }
                    ) : (
                        
                            <p>to do: fulfilled items</p>
                        
                    )
                }

            </Card>
        </div>
    );
}

export default Admin;