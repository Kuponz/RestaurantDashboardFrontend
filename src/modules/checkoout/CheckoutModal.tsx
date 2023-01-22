import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import { ORDERTYPE } from 'store/constants/ordertype'

const CheckoutModal = ({instrData, setInstrData,setOpenAD, onClickKOT}) => {

    const ipDetail=[
        {
            title:"Name",
            name:"name",
            multiline:false,
            type:"text"
        },
        {
            title:"Mobile Number",
            name:"mobileNumber",
            multiline:false,
            type:"number"
            
        },
        {
            title:"Special Instruction",
            name:"specialInstruction",
            multiline:true,
            type:"text"
        },
        {
            title:"Order Type",
            value:ORDERTYPE.DINEIN,
            options:[
                {
                    title:ORDERTYPE.CUSTOMIZED,
                    value:ORDERTYPE.CUSTOMIZED
                },
                {
                    title:ORDERTYPE.DELIVERY,
                    value:ORDERTYPE.DELIVERY
                },
                {
                    title:ORDERTYPE.DINEIN,
                    value:ORDERTYPE.DINEIN
                },
                {
                    title:ORDERTYPE.ONLINE,
                    value:ORDERTYPE.ONLINE
                },
                {
                    title:ORDERTYPE.TAKEAWAY,
                    value:ORDERTYPE.TAKEAWAY
                },
            ],
            type:"select"
        }
    ]
    const handleChange = (event: SelectChangeEvent) => {
        setInstrData({
            ...instrData,
            orderType:event.target.value 
        })
    };
  return (
    <Stack gap={2}>
        {ipDetail?.map((idet, index)=>(
            idet.type == "select"?
                <>
                    <FormControl variant="filled" sx={{  my:1,
                        mx:2, minWidth: 120 }}>
        
                        <InputLabel id="demo-simple-select-filled-label">{idet.title}</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            key={index}
                            value={instrData.orderType}
                            label={idet.title}
                            onChange={handleChange}
                        >
                            {idet?.options.map((opt, id)=>(
                                <MenuItem key={id} value={opt.value}>{opt.title}</MenuItem>

                            ))}
                        </Select>
                    </FormControl>
                </>
            :
                <TextField 
                    sx={{
                        my:1,
                        mx:2
                    }} 
                    key={index} value={instrData[idet.name]} onChange={e=>setInstrData({
                        ...instrData,
                        [idet.name]:e.target.value
                    })} variant='filled' label={idet.title} type={idet.type} multiline={idet.multiline} rows={idet.multiline?5:1}
                />

        ))}
        <Stack direction={"row"} gap={2} p={2}>
            <Button variant='contained' onClick={e=>onClickKOT(e)}>KOT</Button>
            <Button variant='contained' onClick={e=>onClickKOT(e)}>Skip details & KOT</Button>
        </Stack>
    </Stack>
  )
}

export default CheckoutModal