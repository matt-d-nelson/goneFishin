import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
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
  const [showFeed, setShowFeed] = useState(true);
  const history = useHistory();
  const allPublic = useSelector((store) => store.allPublic);

  const length = designs.length;

  useEffect(() => {
    dispatch({ type: "FETCH_USER_DESIGNS" });
  }, []);

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_PUBLIC_DESIGNS" });
    console.log("all public designs", allPublic);
  }, []);

  // const allDesignsDispatch = () => {
  //   console.log("in allDesignsDispatch");
  //   dispatch({ type: "FETCH_ALL_PUBLIC_DESIGNS" });

  // };

  // const userDesignsDispatch = () => {
  //   console.log('fetch all user designs');
  //   dispatch({ type: "FETCH_USER_DESIGNS" });
  // }

  const toggleFeed = () => {
    console.log("toggle feed");
    setShowFeed(!showFeed);
  }; // end toggleShow

  const addDesignToCart = () => {
    console.log("in addDesignToCart", designs[current].id);
    // const today = new Date().toLocaleDateString();
    // console.log(today);
    dispatch({ type: "ADD_DESIGN_TO_CART", payload: designs[current].id });
  };

  const newDesign = () => {
    console.log("in newDesign");
    history.push("/design");
  };

  const downloadDesign = () => {
    console.log("in download design");
    const link = document.createElement("a");
    link.href = designs[current].image;
    link.download = designs[current].title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const editDesign = () => {
    console.log("in editDesign");
    history.push(`/edit/${designs[current].id}`);
  };

  const deleteDesign = () => {
    console.log("in deleteDesign", designs[current].id, "userID", user.id);
    dispatch({
      type: "DELETE_DESIGN",
      payload: designs[current].id,
      id: designs[current].user_id,
    });
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
    background: "#B1BCA7",
    color: "white",
  };
  return (
    <div className="homePage">
      <div className="companyTitle">
        RED WING LURE
        <br />
        COMPANY
        {showFeed ? <p>{user.username}'s Designs</p> : <p>All Designs</p>}
        {showFeed ? (
          <div>
            {designs.map((design, index) => {
              return (
                <div className="designs" key={index}>
                  {index === current && (
                    <div className="container">
                      <IconButton onClick={prevSlide}>
                        <ChevronLeftIcon
                          sx={{ fontSize: "80px" }}
                          className="left-button"
                        >
                          Previous
                        </ChevronLeftIcon>
                      </IconButton>
                      <IconButton onClick={nextSlide}>
                        <ChevronRightIcon
                          sx={{ fontSize: "80px" }}
                          className="right-button"
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

                        <div className="cardButtons">
                          <div className="centerButton">
                            <CardActions>
                              <IconButton onClick={addDesignToCart}>
                                <ShoppingCartIcon size="small">
                                  Add To Cart
                                </ShoppingCartIcon>
                              </IconButton>
                              <IconButton onClick={downloadDesign}>
                                <DownloadIcon size="small">
                                  Download
                                </DownloadIcon>
                              </IconButton>
                              <IconButton onClick={editDesign}>
                                <EditIcon size="small">Edit</EditIcon>
                              </IconButton>
                              <IconButton onClick={deleteDesign}>
                                <DeleteIcon size="small">Delete</DeleteIcon>
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
        ) : (
          <div>
            {allPublic.map((design, index) => {
              return (
                <div className="designs" key={index}>
                  {index === current && (
                    <div className="container">
                      <IconButton onClick={prevSlide}>
                        <ChevronLeftIcon
                          sx={{ fontSize: "80px" }}
                          className="left-button"
                        >
                          Previous
                        </ChevronLeftIcon>
                      </IconButton>
                      <IconButton onClick={nextSlide}>
                        <ChevronRightIcon
                          sx={{ fontSize: "80px" }}
                          className="right-button"
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

                        <div className="cardButtons">
                          <div className="centerButton">
                            <CardActions>
                              <IconButton onClick={addDesignToCart}>
                                <ShoppingCartIcon size="small">
                                  Add To Cart
                                </ShoppingCartIcon>
                              </IconButton>
                              <IconButton onClick={downloadDesign}>
                                <DownloadIcon size="small">
                                  Download
                                </DownloadIcon>
                              </IconButton>
                              <IconButton onClick={editDesign}>
                                <EditIcon size="small">Edit</EditIcon>
                              </IconButton>
                              <IconButton onClick={deleteDesign}>
                                <DeleteIcon size="small">Delete</DeleteIcon>
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
        )}
      </div>
      <div className="buttonPlacement">
        <Button
          className="feedButton"
          variant="contained"
          sx={{ fontSize: "25px", background: "#EDD892" }}
          onClick={toggleFeed}
        >
          {!showFeed ? "My Designs" : "Feed"}
          {/* {showFeed ? allDesignsDispatch() : userDesignsDispatch()} */}
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
