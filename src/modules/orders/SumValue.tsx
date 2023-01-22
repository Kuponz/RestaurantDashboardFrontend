import { Button, Stack, Typography } from '@mui/material'
import React from 'react'

const SumValue = ({order}) => {
  return (
      <Stack p={2} height={"90%"}>
        {Object?.keys(order?.details?.orderAmount || {})?.map((data, index)=>{
            return (
                <Stack direction={"row"} key={index} justifyContent={"space-between"} alignItems={"center"} py={1}>
                    {console.log({call:callfortitle(data), data})}
                    <Typography variant='h5'>{callfortitle(data)}</Typography>
                    <Stack direction={"row"}>
                        {(data == "total" || data == "orderGst") && <span>₹</span>}
                        <Typography variant='h5'>{order?.details?.orderAmount[data]}</Typography>
                    </Stack>
                </Stack>
            )
        })}
        <Button variant='outlined'>Collect Payment</Button>
    </Stack>

  )
}
const callfortitle = (val:String)=>{
    let title="";
    switch (val) {
        case "totalItem":
            title="Total Items"
            break;
        case "orderGst":
            title="GST"
            break;
        case "orderBeforeAddingGSTValue":
            title = "Order Total"
            break;
        case "orderExcludeGSTValue":
            title = "Order value with diffrent/No GST"
            break;
        case "total":
            title="Total"
            break;
        default:
            break;
    }
    return title;
}

export default SumValue