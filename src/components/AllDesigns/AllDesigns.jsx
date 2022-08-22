import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardActions,
  CardHeader,
  IconButton,
  CardMedia,
  Grid,
} from "@mui/material";
// import {Button} from '@mui/material'
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function AllDesigns() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const designs = useSelector((store) => store.home);
  const allPublic = useSelector((store) => store.allPublic);
  const [current, setCurrent] = useState(0);
  const history = useHistory();
  const length = designs.length;

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_PUBLIC_DESIGNS" });
  }, []);

  const cardStyle = {
    transitionDuration: "2.3s",
    background: "#B1BCA7",
    color: "white",
  };

  const addDesignToCart = (thisDesign) => {
    console.log("in addDesignToCart", allPublic[thisDesign].id);
    // const today = new Date().toLocaleDateString();
    // console.log(today);
    dispatch({ type: "ADD_DESIGN_TO_CART", payload: allPublic[thisDesign] });
    dispatch({
      type: "OPEN_MODAL",
      payload: {
        type: "success",
        open: true,
        success: "Design Added To Cart",
      },
    });
  };

  const downloadDesign = (thisDesign) => {
    console.log("in download design");
    const link = document.createElement("a");
    link.href = allPublic[thisDesign].image;
    link.download = allPublic[thisDesign].title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const editDesign = (thisDesign) => {
    console.log("in editDesign", thisDesign);
    history.push(`/edit/${allPublic[thisDesign].id}`);
  };

  const deleteDesign = (thisDesign) => {
    console.log("in deleteDesign", allPublic[thisDesign].id, "userID", user.id);
    dispatch({
      type: "DELETE_DESIGN",
      payload: allPublic[thisDesign].id,
      id: allPublic[thisDesign].user_id,
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
  return (
    // Users Designs
    <div>
      {allPublic.map((design, index) => {
        return (
          //INDEX BEFORE CURRENT
          <div className="designs" key={index}>
            {index === current - 1 && (
              <div className="container">
                <IconButton onClick={prevSlide}>
                  <ChevronLeftIcon
                    sx={{ fontSize: "80px" }}
                    className="left-button"
                  >
                    Previous
                  </ChevronLeftIcon>
                </IconButton>
                <Card elevation={4} style={cardStyle} className="card">
                  {/* <CardHeader title={design.title}></CardHeader> */}
                  <CardMedia
                    component="img"
                    height="600"
                    image={design.image}
                  />
                  <div className="cardButtons">
                    <div className="centerButton">
                      <CardActions>
                        <IconButton
                          onClick={() => {
                            addDesignToCart(current - 1);
                          }}
                        >
                          <ShoppingCartIcon size="small">
                            Add To Cart
                          </ShoppingCartIcon>
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            downloadDesign(current - 1);
                          }}
                        >
                          <DownloadIcon size="small">Download</DownloadIcon>
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            editDesign(current - 1);
                          }}
                        >
                          <EditIcon size="small">Edit</EditIcon>
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            deleteDesign(current - 1);
                          }}
                        >
                          <DeleteIcon size="small">Delete</DeleteIcon>
                        </IconButton>
                      </CardActions>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {index === current && (
              <div className="container">
                <Card elevation={4} style={cardStyle} className="card">
                  <CardHeader
                    title={design.title}
                    // subheader={index}
                  />

                  <CardMedia
                    component="img"
                    height="600"
                    image={design.image}
                  />

                  <div className="cardButtons">
                    <div className="centerButton">
                      <CardActions>
                        <IconButton
                          onClick={() => {
                            addDesignToCart(current);
                          }}
                        >
                          <ShoppingCartIcon size="small">
                            Add To Cart
                          </ShoppingCartIcon>
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            downloadDesign(current);
                          }}
                        >
                          <DownloadIcon size="small">Download</DownloadIcon>
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            editDesign(current);
                          }}
                        >
                          <EditIcon size="small">Edit</EditIcon>
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            deleteDesign(current);
                          }}
                        >
                          <DeleteIcon size="small">Delete</DeleteIcon>
                        </IconButton>
                      </CardActions>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {index === current + 1 && (
              <div className="container">
                <IconButton onClick={nextSlide}>
                  <ChevronRightIcon
                    sx={{ fontSize: "80px" }}
                    className="right-button"
                  >
                    Next
                  </ChevronRightIcon>
                </IconButton>
                <Card elevation={4} style={cardStyle} className="card">
                  {/* <CardHeader title={design.title}></CardHeader> */}
                  <CardMedia
                    component="img"
                    height="600"
                    image={design.image}
                  />
                  <div className="cardButtons">
                    <div className="centerButton">
                      <CardActions>
                        <IconButton
                          onClick={() => {
                            addDesignToCart(current + 1);
                          }}
                        >
                          <ShoppingCartIcon size="small">
                            Add To Cart
                          </ShoppingCartIcon>
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            downloadDesign(current + 1);
                          }}
                        >
                          <DownloadIcon size="small">Download</DownloadIcon>
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            editDesign(current + 1);
                          }}
                        >
                          <EditIcon size="small">Edit</EditIcon>
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            deleteDesign(current + 1);
                          }}
                        >
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
  );
}

export default AllDesigns;
