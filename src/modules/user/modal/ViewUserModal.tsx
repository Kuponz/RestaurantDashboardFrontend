import { Button, Stack } from '@mui/material';
import React, { useReducer, useState } from 'react'
import AddEditUserModal from './EditUserModal';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useUserStore } from 'store/user/userzustandstore';

const ViewUserModal = ({userIndex, editUserMut, setuserIndex, edit, setEdit, setAllUserProfile}:{
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
                <Button variant='outlined' disabled={editUserMut.isLoading} onClick={()=>{
                    if(confirm("You Sure?"))
                    {
                        console.log({
                            info
                        })
                        const props={
                            userData:{
                                name:info.find(e=>e.name == "name")?.value,
                                role:info.find(e=>e.name == "role")?.value,
                                _id:userIndex?.user?._id,
                            },
                            headerAuth:user?.jwtToken
                        }
                        let b = true;
                        if(info.find(e=>e.name == "pin")?.value != ""){
                            if(confirm("Set New Pin?[If Not Kindly Clear Pin Details]"))
                            {
                                props?.userData["pin"] = info.find(e=>e.name == "pin")?.value;
                                console.log({props});
                                editUserMut.mutate(props);
                            }else{
                                b = false;
                            }
                            
                        }else{
                            if(b){
                                editUserMut.mutate(props);
                                console.log({props});
                            }
                        }
                    }
                }}><SaveIcon/>Save</Button>
                :
                <Button variant='outlined' disabled={editUserMut.isLoading}  onClick={()=>setEdit(true)}><EditIcon/>Edit</Button>
            }
        </Stack>
    </Stack>
  )
}

export default ViewUserModal