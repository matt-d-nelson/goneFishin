import { useState } from 'react';

function Cart( props ){
    // template hook
    const [ hook, setHook ] = useState( null );
     
    return(
        <div>
            <h2>Cart</h2>
            <p>Props: { JSON.stringify( props ) }</p>
        </div>
    );
}

export default Cart;