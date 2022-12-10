import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { AuthContext } from "../../Contexts/AuthContext";
import { useContext, useEffect, useState } from "react";

import "./SummonModal.css";

const style = {
  // position: "absolute",
  // top: "50%",
  // left: "50%",
  // transform: "translate(-50%, -50%)",
  // width: 400,
  // bgcolor: "background.paper",
  // border: "2px solid #000",
  // boxShadow: 24,
  // p: 4,
};

export default function MyModal() {
  const { modalText, isModal, setIsModal } = useContext(AuthContext);
  const handleClose = () => {
    setIsModal(false);
  };

  // const [open, setOpen] = React.useState(true);
  // const { modalText, isModal, setIsModal } = useContext(AuthContext);
  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <div>
      {/* <Button onClick={handleOpen}>SUMMON MODAL</Button> */}
      <Modal
        open={isModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="my-modal" sx={style}>
          <Typography
            color="white"
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Text in a modal
          </Typography>
          <Typography color="white" id="modal-modal-description" sx={{ mt: 2 }}>
            {modalText}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
