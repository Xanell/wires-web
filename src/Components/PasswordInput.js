import React, { forwardRef } from "react";
import TextField from "@mui/material/TextField";

export const PasswordInput = forwardRef((props, ref) => {
    return (
      <TextField variant="outlined" inputRef={ref} {...props}/>
    );
  });
  