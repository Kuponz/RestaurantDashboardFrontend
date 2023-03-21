import { Button, Stack } from '@mui/material';
import React, { useReducer, useState } from 'react'
import AddEditUserModal from './EditUserModal';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useUserStore } from 'store/user/userzustandstore';

const ViewUserModal = ({userIndex, setuserIndex, edit, setEdit, setAllUserProfile}:{
    setuserIndex:  React.Dispatch<React.SetStateAction<{
        user: {
            mobileNumber: string;
            name: string;
            role: string;
            _id: string;
            isLogin: boolean;
        };
        index: number;
    } | undefined>>;
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
    const user = useUserStore(state=>state.user);
    const [info, setInfo]=useState([
        {
            title:"Name",
            value:userIndex?.user.name,
            name:"name"
        },
        {
            title:"New Pin",
            value: "",
            name:"pin"
        },
        {
            title:"Role",
            value:userIndex?.user.role || "",
            select:["OWNER", "WAITER", "CAPTAIN", "CHEF"],
            name:"role"
        }
    ]);
    console.log({
        userIndex
    })
  return (
    <Stack justifyContent={"center"}>
        {info.map((userInfo, index)=>(
            <AddEditUserModal 
                edit={edit} 
                setuserIndex = {setuserIndex}
                key={index} 
                indexVal={index}
                info={info}
                userInfo={userInfo}
                setInfo={setInfo}
                setAllUserProfile={setAllUserProfile}
            />

        ))}
        <Stack direction={"row"} width={"100%"} justifyContent={"flex-end"}>
            {
                edit?
                <Button variant='outlined' onClick={()=>{
                    setEdit(false)
                    if(confirm("You Sure?"))
                    {
                        console.log({
                            info
                        })
                    }
                }}><SaveIcon/>Save</Button>
                :
                <Button variant='outlined' onClick={()=>setEdit(true)}><EditIcon/>Edit</Button>
            }
        </Stack>
    </Stack>
  )
}

export default ViewUserModal