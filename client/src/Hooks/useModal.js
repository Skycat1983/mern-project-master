import * as React from "react";
import { useState, useEffect } from "react";
// import Paper from "@mui/material/Paper";

// import "../views/views.css";

export default function useModal(text) {
  console.log("in modal", test);
  const [modalText, setModalText] = useState(text);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const toggle = () => {
    handleOpen();
  };
  return {
    modalText,
    handleOpen,
    handleClose,
    setOpen,
  };
}

// export function styleModal(props) {
//   return (
//     <form
//       style={{
//         variant: "standard",
//         id: "standard-basic",
//         marginTop: "40px",
//         marginLeft: "60px",
//         alignItems: "center",
//         borderRadius: "12px",
//         marginBottom: "10px",
//         width: "190px",
//         input: { color: "red" },
//         backgroundColor: "white",
//         opacity: "80%",
//         color: "green", //! only applies to basic/premium options
//         padding: "30px",
//       }}
//     >
//       {props.children}
//     </form>
//   );
// }
