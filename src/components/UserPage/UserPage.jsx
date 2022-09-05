//---------------------imports---------------------//
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./UserPage.css";
import { Button, Typography } from "@mui/material";
import Designs from "../Designs/Designs";
import BuyPrinterBtn from "../BuyPrinterBtn/BuyPrinterBtn";

function UserPage() {
  //---------------------reducer state---------------------//
  const user = useSelector((store) => store.user);
  const designs = useSelector((store) => store.home);
  const allPublic = useSelector((store) => store.allPublic);

  //---------------------local state---------------------//
  const [showFeed, setShowFeed] = useState(true);

  //---------------------imported methods---------------------//
  const history = useHistory();
  const dispatch = useDispatch();

  // on page load, get all items this user has added to cart (where ordered=false)
  useEffect(() => {
    dispatch({ type: "FETCH_CART_ITEMS" });
    dispatch({ type: "FETCH_ALL_PUBLIC_DESIGNS" });
    dispatch({ type: "FETCH_USER_DESIGNS" });
  }, []);

  const toggleFeed = () => {
    console.log("toggle feed");
    setShowFeed(!showFeed);
  }; // end toggleShow

  const newDesign = () => {
    console.log("in newDesign");
    history.push("/design");
  };

  //---------------------JSX return---------------------//
  return (
    <div className="homePage">
      <div className="companyTitle">
        {/* RED WING LURE
        
        <br />
        COMPANY */}
        {showFeed ? <p>{user.username}'s Designs</p> : <p>All Designs</p>}
        {showFeed ? (
          <Designs designs={designs} showFeed={showFeed} />
        ) : (
          <Designs designs={allPublic} showFeed={showFeed} />
        )}
      </div>
      <div className="buttonPlacement">
        <Button
          className="feedButton"
          variant="contained"
          sx={{ mr: 4 }}
          color="primary"
          onClick={toggleFeed}
        >
          <Typography variant="h4">
            {!showFeed ? "My Designs" : "Feed"}
          </Typography>
        </Button>
        <BuyPrinterBtn />
        <Button
          variant="contained"
          // sx={{ fontSize: "25px"}}
          color="primary"
          sx={{ ml: 4 }}
          onClick={newDesign}
        >
          <Typography variant="h4">New</Typography>
        </Button>
      </div>
    </div>
  );
}

export default UserPage;
