import { Button, IconButton, Stack, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import SumValue from '../SumValue'
import Orders from './Orders'
import WestIcon from '@mui/icons-material/West';
import { useRouter } from 'next/router';
import  ReactToPrint, { useReactToPrint } from 'react-to-print';
import { Printer, Text, render } from 'react-thermal-printer';
import { BillPrint } from 'modules/BillPrint';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';


const EmptyBill = ({order}) => {
    const router = useRouter();
    const [showPrint, setShowPrint] = useState(false);
    let componentRef = useRef(null);
    const handlePrintPart2 = useReactToPrint({
        content: () => componentRef.current,
      });
    const handlePrint = async () => {
        const data = await render(
            <Printer type="epson">
                <BillPrint componentRef={componentRef} order={order?.details} setShowPrint={setShowPrint} reference={false}/>
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
            setShowPrint(true);
            handlePrintPart2();
        }        
           
    }  
    
  return (
    <>
        <Stack direction={"row"} sx={{
            width:"100%",
            justifyContent:"space-between",
            px:2
        }}>
            <Stack direction={"row"} gap={2} justifyContent={"center"} alignItems={"center"}>
                <IconButton onClick={()=>{
                    router.push("/restaurant/table")
                }}><WestIcon/></IconButton>
                <Typography variant="h3">Bill</Typography>
            </Stack>
            <Stack direction={"row"} gap={2} justifyContent={"center"} alignItems={"center"}>
                <Button onClick={handlePrint} variant={"outlined"}>Print Bill</Button>
                <Button variant={"outlined"}>Cancel</Button>
            </Stack>
        </Stack>
        <Stack sx={{
            flexDirection:{
                xs:"column",
                md:"row"
            },
            width:"100%",
            height:"100%",
            overflow:"hidden"
        }}>
            <Stack sx={{
                height:{
                    xs:"50%",
                    md:"100%"
                },
                width:"100%",
                flex:1,
                overflowY:"auto",
                p:{
                    xs:1,
                    md:2
                }
            }}>
                <Orders order={order?.details}/>
            </Stack>
            <Stack sx={{
                width:{
                    xs:"100%",
                    md:"45%"
                },
                height:{
                    xs:70,
                    md:"100%"
                },
                flex:1,
                overflow:"hidden",
                p:{
                    md:2,
                    lg:2
                }
            }}>
                <SumValue order={order} />
            </Stack>
            
        </Stack>
        <div style={{
            display:"none",
        }}>
            <BillPrint componentRef={componentRef} setShowPrint={setShowPrint} order={order.details} reference={true} />
        </div>
    </>
  )
}
export default EmptyBill