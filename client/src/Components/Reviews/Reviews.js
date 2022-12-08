import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Comments = (props) => {
  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <Typography variant="body1" gutterBottom>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      <h5>below are the plants we have for sale</h5>
    </Box>
  );
};

export default Comments;
