import { useState } from 'react';

function Admin( props ){
    // template hook
    const [ hook, setHook ] = useState( null );
     
    return(
        <div>
            <h2>Admin</h2>
            <p>Props: { JSON.stringify( props ) }</p>
        </div>
    );
}

export default Admin;