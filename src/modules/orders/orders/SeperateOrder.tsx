import { Stack, Typography } from '@mui/material'
import React from 'react'

export const SeperateOrder = ({orderVal, isKot}) => {
  // console.log({orderVal})
  return (
    <Stack sx={{
      textDecoration : orderVal.quantity == 0 ? 'line-through' : 'none', 
      color: orderVal.quantity == 0 ? 'red' : 'black'
    }} direction={"row"} justifyContent={"space-between"}>
        <Stack sx={{
            width:"50%"
        }}>
            <Typography>{orderVal?.menuId?.itemName}</Typography>
            {orderVal.selected?.length > 0 && orderVal.selected.map(orderse=>(
                  orderse?.variations?.map(orderSel=>(
                    <Stack key={orderSel._id}>
                      <Typography variant='subtitle2' px={1}>
                        {orderSel.variationOptions.find(v=>v._id == orderSel.selected)?.optName}
                      </Typography>
                    </Stack>
                  ))
                ))}
        </Stack>
        <Stack direction={"row"} gap={5} sx={{
          width:"50%",
          justifyContent:isKot ?"flex-end":"space-between"
        }}>
          <Stack direction={"row"} gap={1}>
            {!isKot && (
              <Stack>
                <Typography>
                  {orderVal?.menuId?.price} 
                </Typography>
                {orderVal.selected?.length > 0 && orderVal.selected.map(orderse=>(
                  orderse?.variations?.map(orderSel=>(
                    <Stack direction={"row"} key={orderSel._id}>
                      <Typography variant='subtitle2'>
                        {orderSel.variationOptions.find(v=>v._id == orderSel.selected)?.price}
                      </Typography>
                    </Stack>
                  ))
                ))}
              </Stack>

            )}
            <Stack direction={"column"}>
              <Stack direction={"row"} gap={1}>
                <Typography>
                  x
                </Typography>
                <Typography> {orderVal.quantity}</Typography>
              </Stack>
              {orderVal.selected?.length > 0 && orderVal.selected.map(orderse=>(
                    orderse?.variations?.map(orderSel=>(
                      <Stack direction={"row"} key={orderSel._id} gap={1}> 
                        <Typography variant='subtitle2'>
                          x
                        </Typography>
                        <Typography variant='subtitle2'> 1</Typography>
                      </Stack>
                    ))
                  ))}
            </Stack>
            
          </Stack>
            <Stack direction={"column"}>
            {!isKot && <Typography>₹ {orderVal?.cost}</Typography>}
              {!isKot && orderVal.selected?.length > 0 && orderVal.selected.map(orderse=>(
                    orderse?.variations?.map(orderSel=>(
                      <Stack direction={"row"} key={orderSel._id}>
                        <Typography variant='subtitle2'>
                        ₹ {orderSel.variationOptions.find(v=>v._id == orderSel.selected)?.price}
                        </Typography>
                      </Stack>
                    ))
                  ))}
            </Stack>
        </Stack>
    </Stack>
  )
}
