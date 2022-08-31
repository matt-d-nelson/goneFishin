import { useState } from 'react';
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

function BuyPrinterBtn( props ){
    //---------------------imported methods---------------------//
    const dispatch = useDispatch();

    //---------------------reducer state---------------------//
    const user = useSelector((store) => store.user);
    const cart = useSelector((store) => store.cart);

    //---------------------event handlers---------------------//

    // add a new printer to cart
    const addPrinter = () =>{
        console.log('in addPrinter');
        dispatch({
            type: "ADD_PRINTER_TO_CART",
            payload: {
                message: 'Lure printer added to cart'
            }
        });
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