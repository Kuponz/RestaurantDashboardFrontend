import { CancelOutlined } from "@mui/icons-material";
import { Alert, Button, Stack, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { cancelOrderStatus } from "store/api/axiosSetup";

const CancelModal = ({user, openCancel, setOpenCancel}) => {
    const router = useRouter();
    const [error, setError] = useState({open: false, message:""});
    const cancelMutate = useMutation(cancelOrderStatus, {
        onSuccess:(data)=>{
            setOpenCancel({...openCancel, open:false});
            router.push("/restaurant/table");
        },
        onError:(data)=>{
            console.log({data});
            setError({
                open:true,
                message:data?.response?.data?.message?.message ?? "Error"
            })
        }
    })
  return (
    <Stack sx={{
        gap:1
    }}>
      <Typography m={1} variant="h5">Are you Sure you want to cancel Order?</Typography>
      <TextField 
       sx={{
            m:1
        }} 
        rows={5} 
        variant="filled"
        error={error.open}
        label={"Reason"}
        value={openCancel.reason} 
        multiline  disabled={cancelMutate.isLoading} 
        onChange={(e) => {
            setOpenCancel({...openCancel, reason:e.target.value})
            error && setError({
                open:false,
                message:""
            });
        }} 
        placeholder="Reason for Cancellation"
        />
        <Button sx={{
            m:1
        }} variant="outlined" disabled={cancelMutate.isLoading} onClick={()=>{
            if(openCancel.reason != ""){
                cancelMutate.mutate({
                    body:{
                        tableId:openCancel.tableId,
                        orderId:openCancel.orderId,
                        reason:openCancel.reason
                    },
                    token:user?.jwtToken,
                })
            }else{
                setError({
                    open:true,
                    message:"Please Add Reason"
                });
            }
        }}>Cancel &nbsp;<CancelOutlined/></Button>
        {error.open && 
        (<Stack m={1}>
            <Alert severity="error">{error.message}</Alert>
        </Stack>)}
    </Stack>
  );
};

export default CancelModal;
