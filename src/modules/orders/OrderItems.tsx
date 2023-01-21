import { Stack, Typography } from "@mui/material";
import React from "react";

export const OrderItems = () => {
  return (
    <Stack direction="row" p={0.5}>
      <Typography>Item</Typography>
      <Typography sx={{ ml: "auto" }}>x{3}</Typography>
    </Stack>
  );
};
