import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./UserPage.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";

function UserPage() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const designs = useSelector((store) => store.home);
  const [current, setCurrent] = useState(0);

  const length = designs.length;

  useEffect(() => {
    dispatch({ type: "FETCH_USER_DESIGNS" });
    console.log(length);
    // dispatch({ type: "SEND_ID", payload:user.id});
  }, []);

  const addDesignToCart = () => {
    console.log("in addDesignToCart");
  };

  const downloadDesign = () => {
    console.log("in download design");
  };

  const editDesign = () => {
    console.log("in editDesign");
  };

  const deleteDesign = () => {
    console.log("in deleteDesign");
  };

  const nextSlide = () => {
    console.log("in nextSlide");
    setCurrent(current === length - 1 ? 0 : current + 1);
    console.log(current);
  };

  const prevSlide = () => {
    console.log("in prevSlide");
    setCurrent(current === 0 ? length - 1 : current - 1);
    console.log(current);
  };

  const cardStyle = {
    display: "grid",
    width: "26vw",
    transitionDuration: "0.3s",
    height: "26vw",
    background: "#637a6b",
    color: "white",
  };
  return (
    <div className="homePage">
      <div className="companyTitle">
        RED WING LURE
        <br />
        COMPANY
        <div className="imageSlider">
          <p>{user.username}'s Designs</p>
          <Button className="left-button" onClick={prevSlide}>
                  Previous
                </Button>
                <Button className="right-button" onClick={nextSlide}>
                  Next
                </Button>
          <div className="slider">

          {designs.map((design, index) => {
            return (
              <div key={index}>
                
                {index === current && ( 
                <div className="container">
                
                  <Card variant="outlined" style={cardStyle}>
                    <CardMedia>
                      {" "}
                      <br />
                      <img src={design.image} alt="" />
                      <br /> Title: {design.title}{" "}
                    </CardMedia>
                    <CardContent>Description: {design.description}</CardContent>
                    <div className="cardButtons">
                      <CardActions>
                        <Button size="small" onClick={addDesignToCart}>
                          Add To Cart
                        </Button>
                        <Button size="small" onClick={downloadDesign}>
                          Download
                        </Button>
                        <Button size="small" onClick={editDesign}>
                          Edit
                        </Button>
                        <Button size="small" onClick={deleteDesign}>
                          Delete
                        </Button>
                      </CardActions>
                    </div>
                  </Card>
                  
                </div>
                )}
                
              </div>
            );
          })}
        </div>
        </div>
        <div className="buttonPlacement">
          <Button>FEED</Button>
          <Button>NEW</Button>
        </div>
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
