import { useState } from 'react';
import { Button, Typography } from "@mui/material";

function BuyPrinterBtn( props ){
    // template hook
    const [ hook, setHook ] = useState( null );

    // handle click for adding printer to cart
    const addPrinter = () =>{
        console.log('in addPrinter');
    }
     
    return(
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={addPrinter}>
                    <Typography variant="h4">
                        Buy Printer
                    </Typography>
            </Button>
        </div>
    );
}

export default BuyPrinterBtn;