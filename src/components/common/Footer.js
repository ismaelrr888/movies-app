import { Box, Typography } from "@material-ui/core";
import React from "react";

export default function Footer() {
  return (
    <Box mt={5}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
}
