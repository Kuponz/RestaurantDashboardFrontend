import { Stack, Typography } from '@mui/material'
import React from 'react'
import { SeperateOrder } from './SeperateOrder'
import { flexBox } from 'theme/defaultFunction'

const Orders = ({order}) => {
  return (
    <>
      <Stack direction={"row"} sx={{
        width:"100%",
        justifyContent:"space-between"
      }}>
        <Stack sx={{
              width:"30%"
          }}>
            <Typography variant='body2'>Item Name</Typography>
        </Stack>
        <Stack direction={"row"} gap={5} sx={{
          width:{
            md:"50%"
          },
          justifyContent:"space-between"
        }}>
          <Stack direction={"row"} gap={1}>
            <Typography variant='body2'>
              Price
            </Typography>
            <Typography variant='body2'> Quantity</Typography>
          </Stack>
            <Typography variant='body2'>Total</Typography>
        </Stack>
      </Stack>
      {order?.details?.order?.map((orderVal, orderINdex)=>(
        <SeperateOrder orderVal={orderVal} key={orderINdex}/>
      ))}
      
    </>
  )
}

export default Orders