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
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import BasicModal from 'common/modalGenerator/Modal';
import ApplyDiscount from './ApplyDiscount';
import UserDetailsModal from './UserDetailsModal';
import { userestaurantStore } from "store/restaurant/restaurantStore";
import { uploadUserInfo } from "store/api/axiosSetup";
import { useMutation } from "@tanstack/react-query";
import { ToastContainer, toast } from 'react-toastify';

const EmptyBill = ({order, userDetails}) => {
    const router = useRouter();
    const [showPrint, setShowPrint] = useState(false);
    const [openAD, setOpenAD] = useState(false);
    const restaurant = userestaurantStore((state) => state.restaurant);
    const [applyDiscount, setApplyDiscount] = useState({
        open:false,
        discount:""
    })

    const [userInfo, setUserInfo] = useState({
        name: "",
        mobileNumber: "",
        isSameWhatsappNumber: false,
        balanceAmount: 0,
        dateOfBirth: "",
      });

    const { mutate, isLoading } = useMutation(uploadUserInfo, {
        onSuccess: (data, variables, context) => {
        // alert("User Info Added Successfully");
        toast.success("User Info Added Successfully");
        console.log("The data is :");
        console.log({
            data: data.data,
            variables,
        });
        setOpenAD(false);
        },
        onError: (error, variables, context) => {
        console.log({ error });
        toast.error("Error in Adding User Info");
        // alert("Error in Adding User Info");
        },
    });

      const onSubmitUserInfo = (e) => {
        e.preventDefault();
        console.log({userInfo,order,restaurant,userDetails});

        let userCompleteInfo = {
            ...userInfo,
            restaurantId: restaurant.restaurantInfo._id,
            orderId: order.details._id,
            token: userDetails.jwtToken,
        }
        console.log(userCompleteInfo);
        mutate(userCompleteInfo);
      };

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
        console.log("data is :");
        console.log(componentRef.current);
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
                <Button onClick={()=>{setOpenAD(true)}} startIcon={<PersonAddAltRoundedIcon/>} variant={"contained"} sx={{color: 'white',backgroundColor: '#F4CE14','&:hover': {backgroundColor: '#F99417',color: 'white !important'}}}>Add UserInfo</Button>
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

        <BasicModal open={openAD} setOpen={setOpenAD} title={"Add User Details"}>
        <UserDetailsModal
          userDetails={userInfo}
          setUserDetails={setUserInfo}
          onSubmitUserInfo={onSubmitUserInfo}
          isLoading={isLoading}
        />
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