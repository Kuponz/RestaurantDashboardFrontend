import { Stack, Typography } from '@mui/material'
import React from 'react'

export const SeperateOrder = ({orderVal}) => {
  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack sx={{
            width:"50%"
        }}>
            <Typography>{orderVal?.menuId?.itemName}</Typography>
        </Stack>
        <Stack direction={"row"} gap={5} sx={{
          width:"50%",
          justifyContent:"space-between"
        }}>
          <Stack direction={"row"} gap={1}>
            <Typography>
              {orderVal?.menuId?.price} 
            </Typography>
            <Typography>
              x
            </Typography>
            <Typography> {orderVal.quantity}</Typography>
          </Stack>
            <Typography>₹ {orderVal?.cost}</Typography>
        </Stack>
    </Stack>
  )
}
