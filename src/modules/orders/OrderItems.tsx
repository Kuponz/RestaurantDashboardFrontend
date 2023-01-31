import { Stack, Typography } from "@mui/material";
import React from "react";
import { flexBox } from "theme/defaultFunction";

export const OrderItems = ({menuData, isDashboardViewer=false}) => {
  return (
    <Stack direction="row" p={isDashboardViewer?0:0.5} justifyContent={"space-between"}>
      <Stack sx={{
        width:"100%",
        flexDirection:"row"
        // border:"2px soid red"
      }}>
        <Stack sx={{ width: '60%'}}>
          <Typography sx={{ width: '100%', flexShrink: 0,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow:"ellipsis",
                }}>
              {menuData?.menuId?.itemName}
          </Typography>
          <Typography variant={"caption"} color={"primary.main"}>{menuData?.specialInstruction}</Typography>
        </Stack>
        <Stack direction={"row"} sx={{ width: '40%'}}>
          <Typography sx={{ color: 'text.secondary' }}> x &nbsp;{menuData.quantity}</Typography>
          <Typography sx={{ ml: "auto" }} color="primary.main">₹ {menuData?.cost}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
