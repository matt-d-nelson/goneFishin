import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./UserPage.css";
import { Button } from "@mui/material";

import UsersDesigns from "../UsersDesigns/UsersDesigns";
import AllDesigns from "../AllDesigns/AllDesigns";

function UserPage() {
  const user = useSelector((store) => store.user);
  const [showFeed, setShowFeed] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();

  // on page load, get all items this user has added to cart (where ordered=false)
  useEffect(()=>{
    dispatch({type: "FETCH_CART_ITEMS"});
  }, []);

  const toggleFeed = () => {
    console.log("toggle feed");
    setShowFeed(!showFeed);
  }; // end toggleShow


  const newDesign = () => {
    console.log("in newDesign");
    history.push("/design");
  };


  return (
    <div className="homePage">
      <div className="companyTitle">
        RED WING LURE
        <br />
        COMPANY
        {showFeed ? <p>{user.username}'s Designs</p> : <p>All Designs</p>}
        {showFeed ? <UsersDesigns /> : <AllDesigns />}
      </div>
      <div className="buttonPlacement">
        <Button
          className="feedButton"
          variant="contained"
          sx={{ fontSize: "25px", background: "#EDD892" }}
          onClick={toggleFeed}
        >
          {!showFeed ? "My Designs" : "Feed"}
        </Button>
        <Button
          variant="contained"
          sx={{ fontSize: "25px", background: "#EDD892" }}
          onClick={newDesign}
        >
          NEW
        </Button>
      </div>
    </div>
  );
}


export default UserPage;
