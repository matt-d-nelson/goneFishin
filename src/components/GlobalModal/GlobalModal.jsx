//---------------------imports---------------------//
import { Button, Dialog, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import Model from "../Model/Model";
import RegisterForm from "../RegisterForm/RegisterForm";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useEffect } from "react";

function GlobalModal() {
  //---------------------imported methods---------------------//
  const dispatch = useDispatch();
  const history = useHistory();

  //---------------------reducer state---------------------//
  const modalData = useSelector((store) => store.modalReducer);

  //---------------------event handlers---------------------//
  const handleClose = () => {
    dispatch({ type: "CLOSE_MODAL" });
    if (modalData.history != undefined) {
      history.push(modalData.history);
    }
  };
  // calls saga to delete a design from the design table
  const deleteDesign = (designID) => {
    dispatch({ type: "DELETE_DESIGN", payload: designID });
    handleClose();
  };
  // calls saga to delete a specific ordered item in cart table
  const deleteCartItem = (cartID) => {
    dispatch({ type: "DELETE_ORDER", payload: cartID });
    handleClose();
  };

  //---------------------JSX return---------------------//
  switch (modalData.type) {
    case "login":
      return (
        <Dialog open={modalData.open}>
          <LoginForm />
          <Button onClick={handleClose}>Close</Button>
        </Dialog>
      );
    case "success_nav":
      return (
        <Dialog
          open={modalData.open}
          PaperProps={{
            sx: {
              p: "8% 8%",
              alignItems: "center",
            },
          }}
        >
          <CheckCircleOutlineIcon sx={{ fontSize: 40 }} />
          <br />
          {modalData.success}
          <Button onClick={handleClose}>return</Button>
        </Dialog>
      );
    case "success":
      return (
        <Dialog
          open={modalData.open}
          PaperProps={{
            sx: {
              p: "8% 8%",
              alignItems: "center",
            },
          }}
        >
          <CheckCircleOutlineIcon sx={{ fontSize: 40 }} />
          <br />
          {modalData.success}
        </Dialog>
      );
    case "register":
      return (
        <Dialog open={modalData.open}>
          <RegisterForm />
          <Button onClick={handleClose}>Cancel</Button>
        </Dialog>
      );
    case "deleteDesign":
      return (
        <Dialog
          open={modalData.open}
          PaperProps={{
            sx: {
              p: "8% 8%",
              alignItems: "center",
            },
          }}
        >
          <p>{modalData.message}</p>
          <Button
            onClick={() => {
              deleteDesign(modalData.design_id);
            }}
          >
            Yes
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Dialog>
      );
    case "deleteCartItem":
      return (
        <Dialog
          open={modalData.open}
          PaperProps={{
            sx: {
              p: "8% 8%",
              alignItems: "center",
            },
          }}
        >
          <p>{modalData.message}</p>
          <Button
            onClick={() => {
              deleteCartItem(modalData.cart_id);
            }}
          >
            OK
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Dialog>
      );
    case "preview":
      return (
        <Dialog
          open={modalData.open}
          PaperProps={{
            sx: {
              p: "8% 8%",
              alignItems: "center",
            },
          }}
        >
          <Typography variant="h3">Preview</Typography>
          <Model
            texture={modalData.texture}
            reference={"refPreview"}
            model={"/model/lurePreview.glb"}
            interaction="auto"
          />
          <Button onClick={handleClose}>Return</Button>
        </Dialog>
      );
    case "loading":
      return (
        <Dialog
          open={modalData.open}
          PaperProps={{
            sx: {
              p: "8% 8%",
              alignItems: "center",
            },
          }}
        >
          <Typography variant="h3">Loading...</Typography>
        </Dialog>
      );
    default:
      return <></>;
  }
}

export default GlobalModal;
