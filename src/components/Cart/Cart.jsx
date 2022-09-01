//---------------------imports---------------------//
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Typography, Grid, Card, Button } from "@mui/material";
import CartItem from "../CartItem/CartItem";

function Cart() {
  //---------------------imported methods---------------------//
  const history = useHistory();
  const dispatch = useDispatch();

  //---------------------reducer state---------------------//
  // user's unordered cart items from store
  const cart = useSelector((store) => store.cart);
  // logged in user's info from store
  const user = useSelector((store) => store.user);

  //---------------------on mount---------------------//
  // on page load, get all items this user has added to cart (where ordered=false)
  useEffect(() => {
    dispatch({ type: "FETCH_CART_ITEMS" });
  }, []);

  // marks all items in cart as ordered and gives them an ordered date
  const submitOrder = () => {
    dispatch({ type: "ORDER_CART_ITEMS" });
  };

  //---------------------JSX return---------------------//
  return (
    <div>
      <Typography variant="h4" m={2} sx={{ml:94, mb:5}}>
        {user.username}'s cart
      </Typography>
      
        {/* map through cart and create an item component for each */}
        {cart.map((item, i) => (
        <Card  elevation={4} sx={{  mb:2, ml:20, mr:20}}>
            <CartItem item={item} index={i} />
          </Card>
        ))}
      
      <Grid container justifyContent="center">
        <Grid item m={2}>
          <Button
            variant="contained"
            onClick={() => {
              history.goBack();
            }}
          >
            Back
          </Button>
        </Grid>
        <Grid item m={2}>
          <Button variant="contained" onClick={submitOrder}>
            Submit Order
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Cart;
