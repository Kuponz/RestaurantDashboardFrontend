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
import moment from 'moment';
import PrintIcon from '@mui/icons-material/Print';
import BasicModal from 'common/modalGenerator/Modal';
import ApplyDiscount from './ApplyDiscount';


const EmptyBill = ({order, userDetails}) => {
    const router = useRouter();
    const [showPrint, setShowPrint] = useState(false);
    const [applyDiscount, setApplyDiscount] = useState({
        open:false,
        discount:""
    })
    let componentRef = useRef(null);
    const handlePrintPart2 = useReactToPrint({
        content: () => componentRef.current,
      });
    const handlePrint = async () => {
        // const data = await render(
        //     <Printer type="epson">
        //         <BillPrint componentRef={componentRef} order={order?.details} setShowPrint={setShowPrint} reference={false}/>
        //     </Printer>
        // );
        setShowPrint(true);
        handlePrintPart2();
           
    }  
    const timeDiff= (createdAt, updatedAt)=>{
        var now = moment(new Date(updatedAt)); //todays date
        var end = moment(createdAt); // another date
        var duration = moment.duration(now.diff(end));
        console.log({
            now, end, duration
        })
        var days = moment.utc(duration.asMilliseconds()).format("HH:mm:ss");
        // console.log(moment(duration).hour(), moment(duration).minutes(), moment(duration).second())
        return days;
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
                <Button onClick={handlePrint} startIcon={<PrintIcon/>} variant={"contained"} sx={{}}>Bill</Button>
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
                <Stack sx={{
                    flexDirection:"row",
                    justifyContent:"space-between"
                }}>
                    <Typography sx={{px:1}}>Time(HH:MM:SS): </Typography>
                    <Typography>{String(timeDiff(order?.details?.createdAt, order?.details?.updatedAt))} </Typography>

                </Stack>
                <SumValue order={order} applyDiscount={applyDiscount} setApplyDiscount={setApplyDiscount} />
            </Stack>
            
        </Stack>
        <BasicModal title={"Apply Discount"} open={applyDiscount.open} setOpen={()=>{
            setApplyDiscount({...applyDiscount, open:false})
        }}>
            <ApplyDiscount userDetails={userDetails} applyDiscount={applyDiscount} setApplyDiscount={setApplyDiscount} order={order}/>
        </BasicModal>
        <div style={{
            display:"none",
        }}>
            <BillPrint  componentRef={componentRef} setShowPrint={setShowPrint} order={order.details} reference={true} />
            
        </div>
    </>
  )
}
export default EmptyBill