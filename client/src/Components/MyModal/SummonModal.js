import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { AuthContext } from "../../Contexts/AuthContext";
import { useContext, useEffect, useState } from "react";

import "./SummonModal.css";

const style = {};

export default function MyModal() {
  const { modalText, isModal, setIsModal } = useContext(AuthContext);
  const handleClose = () => {
    setIsModal(false);
  };

  return (
    <div>
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
            Notification:
          </Typography>
          <Typography color="white" id="modal-modal-description" sx={{ mt: 2 }}>
            {modalText}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
