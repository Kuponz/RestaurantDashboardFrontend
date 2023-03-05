import { Button, Stack, TextField } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { addDiscount } from 'store/api/axiosSetup'
import { useorderStore } from 'store/order/orderStore'

const ApplyDiscount = ({applyDiscount,setApplyDiscount, order, userDetails}) => {
    const setOrder= useorderStore(state=>state.setOrder);
    const {mutate, isLoading} = useMutation(addDiscount,{
        onSuccess:(data)=>{
            console.log({data:data?.data?.data?.order});
            setOrder(data?.data?.data?.order);
            setApplyDiscount({...applyDiscount, open:false, discount:""})
        }
    })
  return (
    <Stack sx={{gap:1}}>
        <TextField value={Number(applyDiscount.discount) || ""} onChange={(e)=>{
            let finTotal = order?.details?.orderAmount?.finalTotal ?? order?.details?.orderAmount?.total;
            if(e.target.value <= finTotal)
            {
                setApplyDiscount({...applyDiscount, discount:String(e.target.value)})
            }else{
                alert(`Apply Discount less than ₹${finTotal}`)
            }
        }} variant='filled' label={`Discount less than ₹${order?.details?.orderAmount?.finalTotal ?? order?.details?.orderAmount?.total}`} type='number'/>
        <Button variant={"contained"} disabled={isLoading} sx={{}} onClick={()=>{
            if(Number(applyDiscount.discount) <= 0){
                alert("Discount Not Added")
            }else{
                console.log(applyDiscount)
                mutate({
                    val:{
                        orderId:order?.details?._id,
                        discount:applyDiscount?.discount,
                    },
                    headerAuth:userDetails?.jwtToken

                })
            }
        }}>Add</Button>
    </Stack>
  )
}

export default ApplyDiscount