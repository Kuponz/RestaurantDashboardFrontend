import { Button, Stack } from '@mui/material';
import React, { useReducer, useState } from 'react'
import AddEditUserModal from './EditUserModal';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useUserStore } from 'store/user/userzustandstore';
import { userestaurantStore } from "store/restaurant/restaurantStore";
const ViewUserModal = ({userIndex, editUserMut, setuserIndex, edit, setEdit, setAllUserProfile}:{
    setuserIndex:  React.Dispatch<React.SetStateAction<{
        user: {
            mobileNumber: string;
            name: string;
            balanceAmount: Number;
            _id: string;
            isSameWhatsappNumber: boolean;
            dateOfBirth:Date;
        };
        index: number;
    } | undefined>>;
    userIndex:{
        user: {
            mobileNumber: string;
            name: string;
            balanceAmount: Number;
            _id: string;
            isSameWhatsappNumber: boolean;
            dateOfBirth:Date;
        };
        index: number;
    } | undefined,
    edit:boolean,
    setEdit:React.Dispatch<React.SetStateAction<boolean>>,
}) => {
    const user = useUserStore(state=>state.user);
    const restaurant = userestaurantStore((state) => state.restaurant);

    const [info, setInfo]=useState([
        {
            title:"Name",
            value:userIndex?.user.name,
            name:"name"
        },
        {
            title:"Mobile Number",
            value:userIndex?.user.mobileNumber,
            name:"mobileNumber"
        },
        {
            title:"Date of Birth",
            value:userIndex?.user.dateOfBirth,
            name:"dateOfBirth"
        },

        {
            title:"Balance Amount",
            value:userIndex?.user.balanceAmount,
            name:"balanceAmount"
        },
        {
            title:"Same Whatsapp Number",
            value:userIndex?.user.isSameWhatsappNumber ? "YES" : "NO",
            name:"isSameWhatsappNumber"
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
                                mobileNumber:info.find(e=>e.name == "mobileNumber")?.value,
                                dateOfBirth:info.find(e=>e.name == "dateOfBirth")?.value,
                                balanceAmount:info.find(e=>e.name == "balanceAmount")?.value,
                                isSameWhatsappNumber:info.find(e=>e.name == "isSameWhatsappNumber")?.value == "YES" ? true : false,
                                restaurantId: restaurant.restaurantInfo._id,
                                // role:info.find(e=>e.name == "role")?.value,
                                // _id:userIndex?.user?._id,
                            },
                            headerAuth:user?.jwtToken
                        }

                        console.log({props})
                        editUserMut.mutate(props);
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