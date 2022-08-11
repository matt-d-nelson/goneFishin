import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

function Admin( props ){
    // template hook
    const [ hook, setHook ] = useState( null );

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type: 'FETCH_UNFULFILLED'});
    }, []);
     
    return(
        <div>
            <h2>Admin</h2>
            <p>Props: { JSON.stringify( props ) }</p>
        </div>
    );
}

export default Admin;