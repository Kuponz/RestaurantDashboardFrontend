import { Stack, Typography } from "@mui/material";
import React from "react";
import { flexBox } from "theme/defaultFunction";

const UpdatedOrder = ({menuData, isDashboardViewer=false}) => {
  return (
    menuData.isEdited?
    <Stack sx={{
        textDecoration: menuData.quantity == 0 ?"line-through":"none",
    }} direction="row" p={isDashboardViewer?0:0.5} justifyContent={"space-between"}>
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
              color:menuData.quantity == 0 ?"red":'text.primary'
            }}>
              {menuData?.menuId?.itemName}
          </Typography>
          <Typography variant={"caption"} color={"primary.main"}>{menuData?.specialInstruction}</Typography>
        </Stack>
        <Stack direction={"row"} sx={{ width: '40%'}} justifyContent={isDashboardViewer?"space-between":"end"}>
          <Typography sx={{ color:menuData.quantity == 0 ?"red":'primary.main' }}>{menuData.quantity == 0 ?"Cancelled":String("x   " + menuData.quantity)}</Typography>
          {isDashboardViewer?
            <Typography sx={{ ml: "auto" }} color="primary.main">₹ {menuData?.cost}</Typography>
            :
            null
          }
        </Stack>
      </Stack>
    </Stack>
    :
    null
  )
}

export default UpdatedOrder