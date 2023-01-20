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
            overflow:"hidden"
        }}>
            <Stack sx={{
                width:"100%"
            }}>
                <Typography textAlign={"center"} variant="h3">Order</Typography>
            </Stack>
            <Stack sx={{
                flexDirection:{
                    xs:"column",
                    md:"row-reverse"
                },
                width:"100%",
                height:"100%",
                overflow:"hidden"
            }}>
                <Stack sx={{
                    height:"75vh",
                    width:{
                        xs:"100%",
                        md:"60%"
                    },
                    overflow:"hidden",
                    p:{
                        md:2,
                        lg:2
                    }
                }}>
                   
                    <Stack direction={{
                        xs:"row",
                        md:"column"
                    }} gap={{
                        xs:1,
                    }}>
                        <Button variant={"text"}>Update Order</Button>
                        <Button variant={"text"}>Generate Bill</Button>
                        <Button variant={"text"}>Print Bill</Button>
                        <Button variant={"text"}>Cancel</Button>
                    </Stack>
                    <SumValue/>
                </Stack>
                <Stack sx={{
                    height:"100%",
                    width:"100%",
                    overflow:"hidden"
                }}>
                <Stack sx={{
                    height:50,
                    py:2,
                    gap:1,
                    px:2,
                    flex:1,
                    overflow:"hidden",
                }}>
                    <Orders/>
                </Stack>
                </Stack>
                
            </Stack>
        </Stack>
    </HomeStructure>
  )
}

export default order