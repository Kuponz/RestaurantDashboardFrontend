import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import SumValue from '../SumValue'
import Orders from './Orders'

const EmptyBill = ({order}) => {
  return (
    <>
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
                width:{
                    xs:"100%",
                    md:"45%"
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
                <SumValue order={order} />
            </Stack>
            <Stack sx={{
                height:{
                    xs:"30vh",
                    md:"100%"
                },
                width:"100%",
                flex:1,
                overflowY:"auto",
                p:2
            }}>
                <Orders order={order?.details}/>
            </Stack>
            
        </Stack>
    </>
  )
}

export default EmptyBill