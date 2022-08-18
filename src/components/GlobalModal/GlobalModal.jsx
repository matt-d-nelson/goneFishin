import { Button, Dialog } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";

function GlobalModal() {
  const modalData = useSelector((store) => store.modalReducer);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };
  // calls saga to delete a design from the design table
  const deleteDesign = (designID)=>{
    dispatch({ type: "DELETE_DESIGN", payload: designID});
    handleClose();
  };
  // calls saga to delete a specific ordered item in cart table
  const deleteCartItem = (cartID)=>{
    dispatch({ type: "DELETE_ORDER", payload: cartID });
    handleClose();
  }

  switch (modalData.type) {
    case "login":
      return (
        <Dialog open={modalData.open}>
          <LoginForm />
          <Button onClick={handleClose}>Close</Button>
        </Dialog>
      );
      case "success":
        return (
          <Dialog open={modalData.open}>
            {modalData.success}
            <Button onClick={handleClose}>Close</Button>
          </Dialog>
        );
    case "register":
      return (
        <Dialog open={modalData.open}>
          <RegisterForm />
          <Button onClick={handleClose}>Close</Button>
        </Dialog>
      );
    case "deleteDesign":
      return (
        <Dialog open={modalData.open}>
          <p>{modalData.message}</p>
          <Button onClick={()=>{deleteDesign(modalData.design_id)}}>OK</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Dialog>
      );
    case "deleteCartItem":
      return (
        <Dialog open={modalData.open}>
          <p>{modalData.message}</p>
          <Button onClick={()=>{deleteCartItem(modalData.cart_id)}}>OK</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Dialog>
      );
    default:
      return <></>;
  }
}

export default GlobalModal;
