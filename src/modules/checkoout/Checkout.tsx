import { Button, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import { flexBox, size } from 'theme/defaultFunction'
import CheckoutItem from './CheckoutItem'
import { Router, useRouter } from 'next/router'
import { CloseOutlined } from '@mui/icons-material'

const Checkout = ({setOpen = true, val, setValue, variableip}) => {
    const router = useRouter();
    console.log({
        val
    })
  return (
    <Stack sx={{
        p:{
            xs:0,
            md:2
        },
        ...size("100%", "100%"),
    }}>
        <Stack sx={{
            ...flexBox("row", "space-between"),
            py:1
        }}>
            <Typography variant="h3">Checkout Items</Typography>
            <IconButton sx={{
                display:{
                    xs:"inline-block",
                    md:"none"
                }
            }} onClick={()=>{setOpen(false)}}><CloseOutlined/></IconButton>
        </Stack>
        <Stack sx={{
            overflowY:"auto",
            py:2,
            overflowX:"hidden",
            gap:1,
            px:2
        }}>
            {
                val?.map((orderValue, key)=>(<CheckoutItem key={key} orderValue={orderValue} variableip={variableip}/>))
            }
        </Stack>
        <Stack>
            <Stack direction={"row"} sx={{

            }}>
                
                <Button onClick={()=>{
                    setOpen(false)
                }}>Cancel</Button>
                <Button onClick={()=>{
                    router.push("/restaurant/table/order")
                }}>KOT</Button>
                <Button>Generate Bill</Button>
                <Button>Print Bill</Button>
            </Stack>
            <Stack>
                <Button>Collect Payment</Button>
            </Stack>
        </Stack>
        
    </Stack>
  )
}

export default Checkout