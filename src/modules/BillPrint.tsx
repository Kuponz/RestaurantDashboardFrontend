import { Stack, Typography } from '@mui/material'
import React from 'react'
import { SeperateOrder } from './orders/orders/SeperateOrder'

const BillPrint = ({ref, order, restaurant}) => {
  return (
    <Stack ref={ref} sx={{
        height:"100vh",
        width:"100vw",
      }}>
        <Typography>{restaurant?.restaurantInfo?.restaurantName}</Typography>
        <Stack direction={"row"} sx={{
          width:"100%",
          justifyContent:"space-between",
          px:{
            xs:1,
            md:2
          },
        }}>
          <Stack sx={{
                width:"50%"
            }}>
              <Typography variant='body2'>Item Name</Typography>
          </Stack>
          <Stack direction={"row"} sx={{
            width:"50%",
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
        <Stack sx={{
          overflowY:"auto",
          pb:20,
          px:{
            xs:1,
            md:2
          },
        }}>
          {order?.order?.map((orderVal, orderINdex)=>(
            <>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
              <SeperateOrder orderVal={orderVal} key={orderINdex}/>
            </>
          ))}
        </Stack>
        
      </Stack>
  )
}

export default BillPrint