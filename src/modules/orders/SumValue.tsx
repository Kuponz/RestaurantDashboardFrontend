import { Button, Stack, Typography } from '@mui/material'
import React from 'react'

const SumValue = () => {
    const JSONData =[
        {
            title:"Food Value",
            price:"1000"
        },
        {
            title:"GST",
            price:"50"
        },
        {
            title: "TOTAL",
            price: "1050"
        },
        {
            title:"Total Items",
            price:"9"
        },
    ]
  return (
    <Stack  p={3} height={"100%"}>
        {JSONData.map((data, index)=>{
            return (
                <Stack direction={"row"} key={index} justifyContent={"space-between"} alignItems={"center"} py={1}>
                    <Typography variant='h5'>{data.title}</Typography>
                    <Typography variant='h5'>{data.price}</Typography>
                </Stack>
            )
        })}
        <Button variant='outlined'>Collect Payment</Button>
    </Stack>

  )
}

export default SumValue