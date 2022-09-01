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

  //---------------------reducer state---------------------//
  const cart = useSelector((store) => store.cart);

  //---------------------local state---------------------//
  const [cards, setCards] = useState({
    left: 0,
    center: 1,
    right: 2,
  });

  //---------------------on mount---------------------//
  useEffect(() => {
    dispatch({ type: "FETCH_USER_DESIGNS" });
    dispatch({ type: "FETCH_ALL_PUBLIC_DESIGNS" });
    console.log(props.designs);
  }, []);

  // innitialize card index state when toggling between feed and my designs
  useEffect(() => {
    setCards({
      left: 0,
      center: 1,
      right: 2,
    });
  }, [props.showFeed]);

  const cardStyle = {
    // transitionDuration: "2.3s",
    // background: "#A9E4EF",
    // color: "black",
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
      type: "OPEN_MODAL",
      payload: {
        type: "deleteDesign",
        open: true,
        message: "Are you sure you want to delete this design?",
        design_id: designs[thisDesign].id,
      },
    });
  };

  const nextSlide = () => {
    console.log("in nextSlide");
    // declare helper object
    let newIndex = {
      left: 0,
      center: 1,
      right: 2,
    };
    // loop through each property in the cards object state
    for (const thisCard in cards) {
      // if adding 3 to this cards index will result in a number greater than the designs array length
      if (cards[thisCard] + 3 > designs.length - 1) {
        // set this cards index to the remainder to wrap it around
        newIndex[thisCard] = (cards[thisCard] + 3) % designs.length;
      } else {
        // else add 3, it's no prob
        newIndex[thisCard] = cards[thisCard] + 3;
      }
    }
    // set the state using the helper obj
    setCards(newIndex);
    console.log(newIndex);
  };

  const prevSlide = () => {
    // similar to nextSlide except...
    console.log("in prevSlide");
    let newIndex = {
      left: 0,
      center: 1,
      right: 2,
    };
    for (const thisCard in cards) {
      // check if subtracting 3 would result in an index that is less than 0
      if (cards[thisCard] - 3 < 0) {
        // if so, add that negative value to the length to set the new index
        newIndex[thisCard] = cards[thisCard] - 3 + designs.length;
      } else {
        newIndex[thisCard] = cards[thisCard] - 3;
      }
    }
    setCards(newIndex);
    console.log(newIndex);
  };

  //---------------------JSX return---------------------//
  return (
    // Users Designs
    <div className="designs_container">
      <IconButton onClick={prevSlide} className="icon-button">
        <ChevronLeftIcon sx={{ fontSize: "80px" }} className="arrow-button">
          Previous
        </ChevronLeftIcon>
      </IconButton>
      {designs.map((design, index) => {
        return (
          //INDEX BEFORE CURRENT
          <div className="designs" key={index}>
            {index === cards.left && (
              <div className="container">
                <Card elevation={4} style={cardStyle} className="card">
                  <CardHeader title={design.title}></CardHeader>
                  <Model
                    texture={design.image}
                    reference={"ref" + design.id}
                    model={"/model/lureDesignsL.glb"}
                    interaction="none"
                  />
                  <div className="cardButtons">
                    <div className="centerButton">
                      <CardActions>
                        <IconButton
                          onClick={() => {
                            updateCart(cards.left);
                          }}
                        >
                          <ShoppingCartIcon size="small">
                            Add To Cart
                          </ShoppingCartIcon>
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            downloadDesign(cards.left);
                          }}
                        >
                          <DownloadIcon size="small">Download</DownloadIcon>
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            editDesign(cards.left);
                          }}
                        >
                          <EditIcon size="small">Edit</EditIcon>
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            deleteDesign(cards.left);
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
            <div className={index === cards.center ? "slide active" : "slide"}>
              {index === cards.center && (
                <div className="container">
                  <Card
                    elevation={4}
                    // style={cardStyle}
                    className="card"
                  >
                    <CardHeader
                      title={design.title}
                      // subheader={index}
                    />
                    <Model
                      texture={design.image}
                      reference={"ref" + design.id}
                      model={"/model/lureDesignsC.glb"}
                      interaction="none"
                    />

                    <div className="cardButtons">
                      <div className="centerButton">
                        <CardActions>
                          <IconButton
                            onClick={() => {
                              updateCart(cards.center);
                            }}
                          >
                            <ShoppingCartIcon size="small">
                              Add To Cart
                            </ShoppingCartIcon>
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              downloadDesign(cards.center);
                            }}
                          >
                            <DownloadIcon size="small">Download</DownloadIcon>
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              editDesign(cards.center);
                            }}
                          >
                            <EditIcon size="small">Edit</EditIcon>
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              deleteDesign(cards.center);
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

            {index === cards.right && (
              <div className="container">
                <Card elevation={4} style={cardStyle} className="card">
                  <CardHeader title={design.title}></CardHeader>
                  <Model
                    texture={design.image}
                    reference={"ref" + design.id}
                    model={"/model/lureDesignsR.glb"}
                    interaction="none"
                  />
                  <div className="cardButtons">
                    <div className="centerButton">
                      <CardActions>
                        <IconButton
                          onClick={() => {
                            updateCart(cards.right);
                          }}
                        >
                          <ShoppingCartIcon size="small">
                            Add To Cart
                          </ShoppingCartIcon>
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            downloadDesign(cards.right);
                          }}
                        >
                          <DownloadIcon size="small">Download</DownloadIcon>
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            editDesign(cards.right);
                          }}
                        >
                          <EditIcon size="small">Edit</EditIcon>
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            deleteDesign(cards.right);
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
      <IconButton onClick={nextSlide} className="icon-button">
        <ChevronRightIcon sx={{ fontSize: "80px" }} className="arrow-button">
          Next
        </ChevronRightIcon>
      </IconButton>
    </div>
  );
}

export default Designs;
