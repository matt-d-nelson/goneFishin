import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
//MUI style imports
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';

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
            <div>
                {/* // direction="column"
                // justifyContent="flex-start"
                // alignItems="stretch"
                // spacing={1}> */}
                {/* render either fulfilled or unfulfilled orders depending on hook state */}
                {/* {
                    fulfilled ?
                    unfulfilled.map(item =>{
                        return (
                            <Stack 
                                key={item.id}
                                direction="row"
                                justifyContent="space-between"
                                alignItems="stretch"
                                spacing={1}>


                            </Stack>
                        )
                    })
                } */}

            </div>
        </div>
    );
}

export default Admin;