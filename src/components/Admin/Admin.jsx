//---------------------imports---------------------//
// libraries
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Admin.css";
//MUI style imports
import { Typography, Grid, Card, Button } from "@mui/material";

function Admin() {
  //---------------------local state---------------------//
  // hook to set fulfilled/unfulfilled orders view
  const [fulfilled, setFulfilled] = useState(false);

  //---------------------imported methods---------------------//
  const history = useHistory();
  const dispatch = useDispatch();

  //---------------------reducer state---------------------//
  const orders = useSelector((store) => store.orders);

  //---------------------on mount---------------------//
  // on page load, get all orders
  useEffect(() => {
    dispatch({ type: "FETCH_ORDERS" });
  }, []);

  //---------------------event handlers---------------------//
  // handles button click to switch between fulfilled/unfulfilled views
  function toggleView() {
    setFulfilled(!fulfilled);
  }
  // on click, download the png of the ordered lure
  function downloadOrder(cartItem) {
    const link = document.createElement("a");
    link.href = cartItem.image;
    link.download = `${cartItem.title}_${cartItem.email}_${cartItem.order_date}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  // on click, mark item as fulfilled/unfulfilled in database, then get all orders
  function fulfillOrder(cartID) {
    let msg = "";
    // set message to send to saga (for the modal) depending on whether order is being fulfilled or unfulfilled
    // if state of 'fulfilled' is true, clicking item unfulfills it
    fulfilled
      ? (msg = "Order marked Unfulfilled")
      : (msg = "Order marked Fulfilled");
    dispatch({
      type: "FULFILL_ORDER",
      payload: {
        cart_id: cartID,
        message: msg,
      },
    });
  }
  // on click, confirm before deleting item from cart
  function deleteOrder(cartID) {
    // open modal to confirm delete from cart
    dispatch({
      type: "OPEN_MODAL",
      payload: {
        type: "deleteCartItem",
        open: true,
        message: "Are you sure you want to delete this order item?",
        cart_id: cartID,
      },
    });
  }
  // formats order date returned from reducer
  const formatDate = (date) => {
    return date.slice(0, 10);
  };

  //---------------------JSX return---------------------//
  return (
    <div>
    
      <Grid container direction="row" justifyContent="space-between" >
        <Grid item xs={2}></Grid>
        <Grid item xs={8} mb={1} >
          <Typography variant="h4" align="center" >
            {fulfilled ? "Fulfilled Orders" : "Unfulfilled Orders"}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained"  onClick={toggleView}>
          <Typography variant="h8">
          
            
            {fulfilled ? "Show Unfulfilled" : "Show Fulfilled"}
            </Typography>
          </Button>
        </Grid>
      </Grid>
      

      <Card elevation={4} >
        {/* render either fulfilled or unfulfilled orders depending on hook state. Items will
                render only if fulfilled field from database matches hook */}
        {orders.map((order) => (
          <div key={order.id}>
            {fulfilled === order.fulfilled && (
              
              <Grid
                container
                key={order.id}
                spacing={4}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                columnSpacing={2}
              >
                
                <Grid item xs={3}>
                
                  <img src={order.image} alt="lure image" />
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">
                    Title: {order.title} <br />
                    Description: {order.description} <br />
                    User Email: {order.email} <br />
                    Qty: {order.qty}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body1">
                    Order date: <br />
                    {formatDate(order.order_date)}
                  </Typography>
                </Grid>
                {/* render different buttons depending on selected view */}
                <Grid item xs={2}>
                  <Button
                  variant="contained"
                    onClick={() => {
                      downloadOrder(order);
                    }}
                  >
                    Download
                  </Button>
                  <br />
                  <Button
                  sx={{ mt: 1}}
                  variant="contained"
                    onClick={() => {
                      deleteOrder(order.id);
                    }}
                  >
                    {!fulfilled ? "Cancel" : "Delete"}
                  </Button>
                  <br />
                  <Button
                  variant="contained"
                  sx={{ mt: 1}}
                    onClick={() => {
                      fulfillOrder(order.id);
                    }}
                  >
                    {!fulfilled ? "Fulfill" : "Un-Fulfill"}
                  </Button>
                </Grid>
              </Grid>
            )}
          </div>
        ))}
      </Card>
      <div className="backButtonAdmin">
      <Button variant="contained"
        onClick={() => {
          history.goBack();
        }}
      >
        <Typography variant="h4">
          Back
          </Typography>
      </Button>
      </div>
    </div>
  );
}

export default Admin;
