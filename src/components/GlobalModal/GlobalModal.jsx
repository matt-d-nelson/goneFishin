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
    case "confirm":
      return (
        <Dialog open={modalData.open}>
          <p>{modalData.message} id: {modalData.design_id}</p>
          <Button onClick={handleClose}>Close</Button>
        </Dialog>
      )
    default:
      return <></>;
  }
}

export default GlobalModal;
