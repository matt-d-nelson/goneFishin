//---------------------imports---------------------//
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
  Modal,
} from "@mui/material";
// import {Button} from '@mui/material'
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Model from "../Model/Model";

function Designs(props) {
  //---------------------imported methods---------------------//
  const dispatch = useDispatch();
  const history = useHistory();

  //---------------------props---------------------//
  const designs = props.designs;
  const length = designs.length;

  //---------------------reducer state---------------------//
  const user = useSelector((store) => store.user);
  const cart = useSelector((store) => store.cart);

  //---------------------local state---------------------//
  const [current, setCurrent] = useState(0);

  //---------------------on mount---------------------//
  useEffect(() => {
    dispatch({ type: "FETCH_USER_DESIGNS" });
    dispatch({ type: "FETCH_ALL_PUBLIC_DESIGNS" });
    console.log(props.designs);
  }, []);

  const cardStyle = {
    transitionDuration: "2.3s",
    background: "#B1BCA7",
    color: "white",
  };

  //---------------------event handlers---------------------//
  const addDesignToCart = (thisDesign) => {
    console.log("in addDesignToCart", designs[thisDesign].id);
    // const today = new Date().toLocaleDateString();
    // console.log(today);
    dispatch({ type: "ADD_DESIGN_TO_CART", payload: designs[thisDesign] });
  };

  // handle click for adding to cart
  const updateCart = (thisDesign) => {
    // check if design with matching svg colors and title is already in user's cart
    const matchingItem = cart.find((item) => {
      if (
        item.svg_colors === designs[thisDesign].svg_colors &&
        item.description === designs[thisDesign].description
      ) {
        return item;
      }
    });
    console.log("matchingItem:", matchingItem);
    //if selected design matches a cart item, update quantity of item in database
    // matchingItem will be undefined if no match was found
    matchingItem
      ? dispatch({
          type: "UPDATE_CART_QTY",
          payload: {
            id: matchingItem.id,
            qty: matchingItem.qty + 1,
            message: "Design added to cart",
          },
        })
      : // if no matches in user's cart, add design to cart
        addDesignToCart(thisDesign);
  };

  const downloadDesign = (thisDesign) => {
    console.log("in download design");
    const link = document.createElement("a");
    link.href = designs[thisDesign].image;
    link.download = designs[thisDesign].title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const editDesign = (thisDesign) => {
    console.log("in editDesign", thisDesign);
    history.push(`/edit/${designs[thisDesign].id}`);
  };

  // opens modal to confrim delete design action
  const deleteDesign = (thisDesign) => {
    console.log("in deleteDesign", designs[thisDesign].id);
    dispatch({
      type: 'OPEN_MODAL',
      payload: {
        type: 'deleteDesign',
        open: true,
        message:'Are you sure you want to delete this design?',
        design_id: designs[thisDesign].id,
      }
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

  //---------------------JSX return---------------------//
  return (
    // Users Designs
    <div>
      {designs.map((design, index) => {
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
                  <CardHeader title={design.title}></CardHeader>
                  <Model
                    texture={design.image}
                    reference={"ref" + design.id}
                    model={"/model/lureDesignsL.glb"}
                  />
                  <div className="cardButtons">
                    <div className="centerButton">
                      <CardActions>
                        <IconButton
                          onClick={() => {
                            updateCart(current - 1);
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
            <div className={index === current ? "slide active" : "slide"}>
              {index === current && (
                <div className="container">
                  <Card elevation={4} style={cardStyle} className="card">
                    <CardHeader
                      title={design.title}
                      // subheader={index}
                    />
                    <Model
                      texture={design.image}
                      reference={"ref" + design.id}
                      model={"/model/lureDesignsC.glb"}
                    />

                    <div className="cardButtons">
                      <div className="centerButton">
                        <CardActions>
                          <IconButton
                            onClick={() => {
                              updateCart(current);
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
            </div>

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
                  <CardHeader title={design.title}></CardHeader>
                  <Model
                    texture={design.image}
                    reference={"ref" + design.id}
                    model={"/model/lureDesignsR.glb"}
                  />
                  <div className="cardButtons">
                    <div className="centerButton">
                      <CardActions>
                        <IconButton
                          onClick={() => {
                            updateCart(current + 1);
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

export default Designs;
