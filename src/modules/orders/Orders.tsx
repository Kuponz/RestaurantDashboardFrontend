import { Stack } from '@mui/material'
import React from 'react'
import { SeperateOrder } from './SeperateOrder'

const Orders = () => {
  return (
    <Stack sx={{
      height:"100%",
      pb:10,
      overflowY:"auto",
      p:2,
      pt:0
    }}>
        {"Lorem ipsum dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor dolor sit amet consectetur adipisicing  Unde.".split(" ").map(()=>{
            return (
                <SeperateOrder/>
            )
        })}
    </Stack>
  )
}

export default Orders