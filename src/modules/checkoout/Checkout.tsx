import { Button, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import { flexBox, size } from 'theme/defaultFunction'
import CheckoutItem from './CheckoutItem'
import { Router, useRouter } from 'next/router'
import { CloseOutlined } from '@mui/icons-material'

const Checkout = ({setOpen = true}) => {
    const router = useRouter();
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
            {"    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam praesentium eos ab, et sit blanditiis quos quis quas consequuntur, at id eius dolor sunt, provident iure! Itaque sit eos unde tenetur sint quis repudiandae quas ullam deserunt, libero, accusantium cupiditate placeat vitae atque officiis ipsum maxime ipsam vero consectetur rerum eum dolores nobis. Saepe fugiat recusandae hic, vel, libero cum dolorum, totam quos corrupti eum culpa necessitatibus perferendis asperiores nobis doloribus delectus. Repellat, quis assumenda? Corporis, similique doloribus."
                .split(" ").map((elm, key)=>(<CheckoutItem key={key}/>))
            }
        <CheckoutItem/>
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