import { Button, IconButton, Stack, Typography } from '@mui/material'
import React, { useRef } from 'react'
import SumValue from '../SumValue'
import Orders from './Orders'
import WestIcon from '@mui/icons-material/West';
import { useRouter } from 'next/router';
import  { useReactToPrint } from 'react-to-print';

const EmptyBill = ({order}) => {
    const router = useRouter();
    const printRef = useRef(null);
   const handlePrint = useReactToPrint({
        content: () => printRef.current,
    })
    
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
                <Orders ref={printRef} order={order?.details}/>
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
    </>
  )
}

export default EmptyBill