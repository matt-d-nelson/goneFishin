import { useState } from 'react';

function Edit( props ){
    // template hook
    const [ hook, setHook ] = useState( null );
     
    return(
        <div>
            <h2>Edit</h2>
            <p>Props: { JSON.stringify( props ) }</p>
        </div>
    );
}

export default Edit;