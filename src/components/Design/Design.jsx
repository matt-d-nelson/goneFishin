import { useState } from 'react';

function Design( props ){
    // template hook
    const [ hook, setHook ] = useState( null );
     
    return(
        <div>
            <h2>Design</h2>
            <p>Props: { JSON.stringify( props ) }</p>
        </div>
    );
}

export default Design;