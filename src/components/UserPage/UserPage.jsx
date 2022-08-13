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
} from "@mui/material";
// import {Button} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

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
    console.log("in addDesignToCart", designs[current].id);
    dispatch({type: "ADD_DESIGN_TO_CART", payload: designs[current].id})
  };

  const downloadDesign = () => {
    console.log("in download design");
  };

  const editDesign = () => {
    console.log("in editDesign");
  };

  const deleteDesign = () => {
    console.log("in deleteDesign", designs[current].id, 'userID', user.id);
    dispatch({type: "DELETE_DESIGN", payload: designs[current].id, id: designs[current].user_id})
    dispatch({ type: "FETCH_USER_DESIGNS" });
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
    height: "30vw",
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
                      <br />
                      <img src={design.image} alt="" />
                      <br /> Title: {design.title}
                      <p>id:{design.id}</p>
                      <p>svg colors: {design.svg_colors}</p>
                    </CardMedia>
                    <CardContent>Description: {design.description}</CardContent>
                    <div className="cardButtons">
                      <CardActions>
                        <ShoppingCartIcon size="small" onClick={addDesignToCart}>
                          Add To Cart
                        </ShoppingCartIcon>
                        <DownloadIcon size="small" onClick={downloadDesign}>
                          Download
                        </DownloadIcon>
                        <EditIcon size="small" onClick={editDesign}>
                          Edit
                        </EditIcon>
                        < DeleteIcon size="small" onClick={deleteDesign}>
                          Delete
                        </ DeleteIcon>
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
