import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
// import "./UserPage.css";
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

function AllDesigns() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [current, setCurrent] = useState(0);
  const history = useHistory();
  const allPublic = useSelector((store) => store.allPublic);
  const length = allPublic.length;


  useEffect(() => {
    dispatch({ type: "FETCH_ALL_PUBLIC_DESIGNS" });
    console.log("all public designs", allPublic);
  }, []);

  const cardStyle = {
    display: "grid",
    transitionDuration: "0.3s",
    background: "#B1BCA7",
    color: "white",
  };

  const addDesignToCart = () => {
    console.log("in addDesignToCart", designs[current].id);
    // const today = new Date().toLocaleDateString();
    // console.log(today);
    dispatch({ type: "ADD_DESIGN_TO_CART", payload: designs[current].id });
    dispatch({
      type: "OPEN_MODAL",
      payload: {type: "success", open: "true", success:'Design Added To Cart'}
    })
  
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
  return (
    // All Public Designs
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
              <Card elevation={4} style={cardStyle} className='card'>
                <CardHeader
                  title={design.title}
                  subheader={design.description}
                />

                <CardMedia
                  component="img"
                  height="600"
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
  );
}

export default AllDesigns;
