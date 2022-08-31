//---------------------imports---------------------//
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Typography, Grid, Card, Button } from "@mui/material";
import CartItem from "../CartItem/CartItem";
import BuyPrinterBtn from "../BuyPrinterBtn/BuyPrinterBtn";

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
      <Grid container 
        direction="row"
        justifyContent="space-between"
        alignItems="center">
          <Grid item>
            <Typography variant="h4" m={2}>
              {user.username}'s cart
            </Typography>
          </Grid>
            <Grid item>
              <BuyPrinterBtn/>
            </Grid>
      </Grid>
      <Card>
        {/* map through cart and create an item component for each */}
        {cart.map((item, i) => (
          <Grid
            container
            key={item.id}
            spacing={4}
            direction="row"
            justifyContent="flex-start"
            alignItems="top"
          >
            <CartItem item={item} index={i} />
          </Grid>
        ))}
      </Card>
      <Grid container justifyContent="center">
        <Grid item m={2}>
          <Button
            variant="contained"
            onClick={() => {
              history.goBack();
            }}
          >
            <Typography variant="h4">
              Back
            </Typography>
          </Button>
        </Grid>
        <Grid item m={2}>
          <Button variant="contained" onClick={submitOrder}>
            <Typography variant="h4">
            Submit Order
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Cart;
