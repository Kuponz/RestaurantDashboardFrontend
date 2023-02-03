import { Button, Stack, Typography } from '@mui/material'
import React, { useRef } from 'react'
import Orders from '../orders/Orders'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreateIcon from '@mui/icons-material/Create';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ClearIcon from '@mui/icons-material/Clear';
import { flexBox } from 'theme/defaultFunction';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { updateOrderStatus } from 'store/api/axiosSetup';
import { useUserStore } from 'store/user/userzustandstore';
import { Printer, render } from 'react-thermal-printer';
import { useReactToPrint } from 'react-to-print';
import TablePrint from './TablePrint';
const KotCheckout = ({order}) => {
    const router = useRouter();
    const user = useUserStore(state=>state.user);
    const {mutate} = useMutation(updateOrderStatus, {
        onSuccess:(data, variables, context)=> {

            console.log({
                data:data.data.data,
                variables,
                context,
            })
            router.push(`/restaurant/table/bill?tableId=${data?.data?.data?.table._id}&orderId=${data?.data?.data?.orderStatus?._id}`)
        },
        onError: (error, variables, context) =>{
            console.log({error})
        },
    })
    let componentRef = useRef(null);
    const handlePrintPart2 = useReactToPrint({
        content: () => componentRef.current,
      });
    const handlePrint = async () => {
        const data = await render(
            <Printer type="epson">
                <TablePrint componentRef={componentRef} order={order?.details}/>
            </Printer>
        );
        try {
            const port = await window.navigator.serial.requestPort();
            console.log(`Serial port opened: ${port.path}`);
            console.log(await window.navigator.serial.onconnect)
            console.log(await window.navigator.serial.ondisconnect)
            console.log({port});
            const writer = port.writable?.getWriter();
            if (writer != null) {
                await writer.write(data);
                writer.releaseLock();
            }
            // Perform additional actions with the port
        } 
        catch (error) {
            console.error(`Error opening serial port: ${error}`);
            handlePrintPart2();
        }        
           
    }  
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
                    router.push(`/restaurant/table/menu?edit=${true}&table=${order?.details?.table._id}`)
                }} sx={{...flexBox()}}><CreateIcon/> Update Order</Button>
                <Button variant='text' onClick={()=>{
                    let onjForOrder = {
                        orderDetail:{
                            orderId:order?.details?._id,
                        tableId:order?.details?.table?._id,
                        status:"BILLING"
                        },
                        token:user?.jwtToken,
                    }
                    console.log(onjForOrder)
                    mutate(onjForOrder)
                }} sx={{...flexBox()}}><ReceiptIcon/>Generate Bill </Button>
            </Stack>
        </Stack>
        <Stack justifyContent={"center"} alignItems={"center"}>
            <Button variant='outlined' sx={{
                m:1
            }}
            onClick={handlePrint}
            >Print KOT</Button>
        </Stack>
        <Orders order={order?.details}/>
        <div style={{display:"none"}}>
            <TablePrint componentRef={componentRef} order={order?.details}/>
        </div>
    </Stack>
  )
}

export default KotCheckout