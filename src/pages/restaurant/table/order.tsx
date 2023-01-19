import { Button, Stack, Toolbar, Typography } from '@mui/material'
import HomeStructure from 'modules/home/HomeStructure'
import Orders from 'modules/orders/Orders'
import SumValue from 'modules/orders/SumValue'
import React from 'react'
import { size } from 'theme/defaultFunction'

const order = () => {
  return (
    <HomeStructure>
        <Stack sx={{
            p:{
                md:2
            },
            ...size("100%", "100%"),
        }}>
            <Toolbar/>
            <Stack sx={{
                width:"100%"
            }}>
                <Typography textAlign={"center"} variant="h3">Order</Typography>
            </Stack>
            
            <Stack>
                <Stack direction={"row"}>
                    
                    <Button>Update Order</Button>
                    <Button>Generate Bill</Button>
                    <Button>Print Bill</Button>
                    <Button>Cancel</Button>
                </Stack>
                <Stack>
                    <Button>Collect Payment</Button>
                </Stack>
            </Stack>
            <Stack sx={{
                overflowY:"auto",
                py:2,
                overflowX:"hidden",
                gap:1,
                px:2,
                height:40,
                flex:1
            }}>
                <Orders/>
            </Stack>
            <Stack sx={{
                height:"40vh",
            }}>
                <SumValue/>
            </Stack>
        </Stack>
    </HomeStructure>
  )
}

export default order