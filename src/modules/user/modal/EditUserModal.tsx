import { Stack, TextField, Typography } from '@mui/material'
import React from 'react'

const AddEditUserModal = ({userInfo, edit}:{userInfo:{
    title: string;
    value: string;
},
edit:boolean
}) => {
  return (
    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} my={1}>
        <Typography>{userInfo.title}</Typography>
        {
        edit?
            <TextField value={userInfo.value}/>
        :
            <Typography>{userInfo.value}</Typography>

        }
    </Stack>
    
  )
}

export default AddEditUserModal