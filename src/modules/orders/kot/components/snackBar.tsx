import { Alert, Snackbar } from "@mui/material";
import React from "react";

interface snackBarProps {
  open: boolean;
  handleClose?: () => void;
  severity: "error" | "warning" | "success" | "info" | undefined;
  msg: string;
}

const LocalSnackBar = ({ open, handleClose, severity, msg }: snackBarProps) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {msg}
      </Alert>
    </Snackbar>
  );
};

export default LocalSnackBar;
