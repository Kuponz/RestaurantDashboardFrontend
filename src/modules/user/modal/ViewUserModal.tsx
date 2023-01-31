import { Button, Stack } from '@mui/material';
import React from 'react'
import AddEditUserModal from './EditUserModal';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const ViewUserModal = ({userIndex, edit, setEdit}:{
    userIndex:{
        user: {
            mobileNumber: string;
            name: string;
            role: string;
            _id: string;
            isLogin: boolean;
        };
        index: number;
    } | undefined,
    edit:boolean,
    setEdit:React.Dispatch<React.SetStateAction<boolean>>,
}) => {
    const info=[
        {
            title:"Name",
            value:userIndex?.user.name,
        },
        {
            title:"Mobile Number",
            value:userIndex?.user.mobileNumber,
        },
        {
            title:"Role",
            value:userIndex?.user.role,
        },
        {
            title:"Login",
            value:userIndex?.user.isLogin ? "True":"False",
        },
    ]
  return (
    <Stack justifyContent={"center"}>
        {info.map((userInfo, index)=>(
            <AddEditUserModal edit={edit} key={index} userInfo={userInfo}/>
        ))}
        <Stack direction={"row"} width={"100%"} justifyContent={"flex-end"}>
            {
                edit?
                <Button variant='outlined' onClick={()=>setEdit(false)}><SaveIcon/>Save</Button>
                :
                <Button variant='outlined' onClick={()=>setEdit(true)}><EditIcon/>Edit</Button>
            }
        </Stack>
    </Stack>
  )
}

export default ViewUserModal