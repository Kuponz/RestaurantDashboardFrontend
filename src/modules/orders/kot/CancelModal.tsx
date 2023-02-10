import { CancelOutlined } from "@mui/icons-material";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import { cancelOrderStatus } from "store/api/axiosSetup";

const CancelModal = ({user, openCancel, setOpenCancel}) => {
    const router = useRouter();
    const cancelMutate = useMutation(cancelOrderStatus, {
        onSuccess:(data)=>{
            setOpenCancel({...openCancel, open:false});
            router.push("/restaurant/table");
        },
        onError:(data)=>{
            console.log({data});
        }
    })
  return (
    <Stack>
      <Typography>Are you Sure you want to cancel Order?</Typography>
      <TextField 
        rows={5} 
        value={openCancel.reason} 
        multiline  disabled={cancelMutate.isLoading} 
        onChange={(e) => {setOpenCancel({...openCancel, reason:e.target.value})}} 
        />
        <Button disabled={cancelMutate.isLoading} onClick={()=>{
            cancelMutate.mutate({
                body:{

                },
                token:user?.jwtToken,
            })
        }}>Cancel &nbsp;<CancelOutlined/></Button>
    </Stack>
  );
};

export default CancelModal;
