import { Stack, Typography } from "@mui/material";
import React from "react";
import { flexBox } from "theme/defaultFunction";

export const OrderItems = ({menuData}) => {
  return (
    <Stack direction="row" p={0.5} justifyContent={"space-between"}>
      <Stack direction="column">
        <Typography>{menuData?.menuId?.itemName}</Typography>
        <Typography variant={"caption"} color={"primary.main"}>{menuData?.specialInstruction}</Typography>
      </Stack>
      <Stack sx={{
        ...flexBox(),
      }}>
        <Typography sx={{ ml: "auto" }} color="primary.main">x{menuData?.quantity}</Typography>
      </Stack>
    </Stack>
  );
};
