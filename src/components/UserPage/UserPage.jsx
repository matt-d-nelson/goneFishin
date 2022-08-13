import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import "./UserPage.css";
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  IconButton,
  CardContent,
  CardMedia,
} from "@mui/material";
// import {Button} from '@mui/material'
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function UserPage() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const designs = useSelector((store) => store.home);
  const [current, setCurrent] = useState(0);
  const [showFeed, setShowFeed] = useState(true)
  const history = useHistory();

  const length = designs.length;

  useEffect(() => {
    dispatch({ type: "FETCH_USER_DESIGNS" });
    console.log(length);
    // dispatch({ type: "SEND_ID", payload:user.id});
  }, []);

  const toggleFeed = () => {
    console.log('toggle feed');
    setShowFeed(!showFeed);
}; // end toggleShow

  const addDesignToCart = () => {
    console.log("in addDesignToCart", designs[current].id);
    // const today = new Date().toLocaleDateString();
    // console.log(today);
    dispatch({ type: "ADD_DESIGN_TO_CART", payload: designs[current].id });
   
  };

  const newDesign = () => {
    console.log('in newDesign');
    history.push('/design')
  }

  const downloadDesign = () => {
    console.log("in download design");
    alert('Download Successful')
  };

  const editDesign = () => {
    console.log("in editDesign");
    history.push('/edit/:id')
  };

  const deleteDesign = () => {
    console.log("in deleteDesign", designs[current].id, "userID", user.id);
    dispatch({
      type: "DELETE_DESIGN",
      payload: designs[current].id,
      id: designs[current].user_id,
    });
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
        <p>{user.username}'s Designs</p>

        
        {designs.map((design, index) => {
          return (
            <div className="designs" key={index}>
              {index === current && (
                <div className="container">
                  <IconButton>
                    <ChevronLeftIcon
                      sx={{ fontSize: "80px" }}
                      className="left-button"
                      onClick={prevSlide}
                    >
                      Previous
                    </ChevronLeftIcon>
                  </IconButton>
                  <IconButton>
                    <ChevronRightIcon
                      sx={{ fontSize: "80px" }}
                      className="right-button"
                      onClick={nextSlide}
                    >
                      Next
                    </ChevronRightIcon>
                  </IconButton>
                  <Card elevation={4} style={cardStyle}>
                    <CardHeader
                      title={design.title}
                      subheader={design.description}
                    />

                    <CardMedia
                      component="img"
                      height="300"
                      image={design.image}
                    />

                    {/* <CardMedia>
                      <br />
                      <img src={design.image} alt="" />
                      <br /> Title: {design.title}
                      <p>id:{design.id}</p>
                      <p>svg colors: {design.svg_colors}</p>
                    </CardMedia>
                    <CardContent>Description: {design.description}</CardContent> */}

                    <div className="cardButtons">
                      <div className="centerButton">
                        <CardActions>
                          <IconButton>
                            <ShoppingCartIcon
                              size="small"
                              onClick={addDesignToCart}
                            >
                              Add To Cart
                            </ShoppingCartIcon>
                          </IconButton>
                          <IconButton>
                            <DownloadIcon size="small" onClick={downloadDesign}>
                              Download
                            </DownloadIcon>
                          </IconButton>
                          <IconButton>
                            <EditIcon size="small" onClick={editDesign}>
                              Edit
                            </EditIcon>
                          </IconButton>
                          <IconButton>
                            <DeleteIcon size="small" onClick={deleteDesign}>
                              Delete
                            </DeleteIcon>
                          </IconButton>
                        </CardActions>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          );
        })}

      </div> 
      <div className="buttonPlacement">
        <Button
          className="feedButton"
          variant="contained"
          sx={{ fontSize: "25px", background: "#EDD892" }}
          onClick={toggleFeed}
        >
          FEED
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

// this allows us to use <App /> in index.js
export default UserPage;
