import { Button, IconButton, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { flexBox, size } from 'theme/defaultFunction'
import CheckoutItem from './CheckoutItem'
import { Router, useRouter } from 'next/router'
import { CloseOutlined } from '@mui/icons-material'
import BasicModal from 'common/modalGenerator/Modal'
import CheckoutModal from './CheckoutModal'
import { userestaurantStore } from 'store/restaurant/restaurantStore'
import { ORDERTYPE } from 'store/constants/ordertype'
import { useMutation } from '@tanstack/react-query'
import { createOrder } from 'store/api/axiosSetup'
import { useUserStore } from 'store/user/userzustandstore'
import { useorderStore } from 'store/order/orderStore'

const Checkout = ({setOpen = true, val, setValue, variableip, tableId}) => {
    const router = useRouter();
    const [instrData, setInstrData] = useState({
        name:"",
        mobileNumber:"",
        specialInstruction:"",
        orderType:ORDERTYPE.DINEIN,
    })
    const restaurant  = userestaurantStore(state=>state.restaurant);
    const user  = useUserStore(state=>state.user);
    const {order, setOrder}  = useorderStore(state=>state);
    const [openAD, setOpenAD] = useState(false);
    const {mutate, isLoading} = useMutation(createOrder, {
        onSuccess:(data, variables, context)=> {

            console.log({
                data:data.data.data,
                variables,
                context,
            })
            setOrder(data?.data?.data?.orderStatus)
            if(data?.data?.data?.orderStatus  && data?.data?.data?.orderStatus?._id){
                router.push(`/restaurant/table/order?orderId=${data?.data?.data?.orderStatus?._id}`)
            }
        },
        onError: (error, variables, context) =>{
            console.log({error})
        },
    })
    const onClickKOT =(e)=>{
        e.preventDefault();
        val.map(orderVal=>{
            orderVal.menuId = orderVal.item._id;
            return orderVal;
        })
        let orderDetail={
            customer:instrData,
            order:val,
            orderType:instrData.orderType,
            specialInstruction:instrData.specialInstruction,
            restaurantId:restaurant?.restaurantInfo?._id,
            tableId:tableId,
        }
        console.log({orderDetail})
        mutate({
            token:user?.jwtToken, 
            orderDetail 
        })
    }
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
                {
                    val?.map((orderValue, key)=>(<CheckoutItem key={key} val={val} index={key} setValue={setValue} orderValue={orderValue} variableip={variableip}/>))
                }
            </Stack>
            <Stack>
                <Stack direction={"row"} sx={{

                }}>
                    
                    <Button onClick={()=>{
                        setOpen(false)
                    }}>Cancel</Button>
                    <Button onClick={()=>{
                        setOpenAD(true);
                        // router.push("/restaurant/table/order")
                    }}>KOT</Button>
                    <Button>Generate Bill</Button>
                    <Button>Print Bill</Button>
                </Stack>
                <Stack>
                    <Button>Collect Payment</Button>
                </Stack>
            </Stack>
            <BasicModal open={openAD}  setOpen={setOpenAD} title={"Add Details"}>
                <CheckoutModal instrData={instrData} onClickKOT={onClickKOT} setInstrData={setInstrData}/>
            </BasicModal>
        </Stack>
    )
}

export default Checkout