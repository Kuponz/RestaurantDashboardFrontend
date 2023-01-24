import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import Orders from '../orders/Orders'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreateIcon from '@mui/icons-material/Create';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ClearIcon from '@mui/icons-material/Clear';
import { flexBox } from 'theme/defaultFunction';
import { useRouter } from 'next/router';
const KotCheckout = ({order}) => {
    const router = useRouter();
  return (
    <Stack sx={{
        height:"100%",
        width:"100%",
        overflow:"hidden"
    }}>
        <Stack>
            <Typography variant='h3' textAlign={"center"} py={1}>My orders</Typography>
            <Stack direction={"row"} flexWrap={"wrap"} justifyContent={"space-between"} gap={1}>
                <Button variant='text' onClick={()=>router.push("/restaurant/table")} sx={{...flexBox()}}><ArrowBackIcon/>Table Booking</Button>
                <Button variant='text' sx={{...flexBox()}}><ClearIcon/> Cancel</Button>
                <Button variant='text' onClick={()=>{
                    router.push(`/restaurant/table/menu?edit=${true}&table=${order?.details?.table}`)
                }} sx={{...flexBox()}}><CreateIcon/> Update Order</Button>
                <Button variant='text' sx={{...flexBox()}}><ReceiptIcon/>Generate Bill </Button>
            </Stack>
        </Stack>

        <Orders order={order}/>
    </Stack>
  )
}

export default KotCheckout