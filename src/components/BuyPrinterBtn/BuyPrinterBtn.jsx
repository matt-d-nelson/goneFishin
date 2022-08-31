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
    const newPrinter = () =>{
        console.log('in newPrinter');
        dispatch({
            type: "ADD_PRINTER_TO_CART",
            payload: {
                message: 'Lure printer added to cart'
            }
        });
    }

    // handle click for adding printer to cart
    const addPrinter = () => {
        // check if user already has a printer in their cart 
        // design_id for the printer will always be -1. unlike lure design_id, it never changes
        const found = cart.find((item) => {
            if (item.design_id === -1) {
                return item;
            }
        });
        console.log("found:", found);
        // if a printer is found in the user's cart, increment quantity of printers in the cart/database
        // 'found' will be undefined if nothing was found
        found
            ? dispatch({
                type: "UPDATE_CART_QTY",
                payload: {
                    id: found.id,
                    qty: found.qty + 1,
                    message: "Another printer added to cart"
                }
            })
            : // if no printers are in the cart, add one to the cart
            newPrinter();
    };
     
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