import { Button, CircularProgress, Modal, Paper, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useUserStore } from 'store/user/userzustandstore'
import UserCard from './UserCard'
import AddIcon from '@mui/icons-material/Add';
import TopBar from 'common/topBar/TopBar'
import BasicModal from 'common/modalGenerator/Modal'
import ViewUserModal from './modal/ViewUserModal'
import AddUser from './modal/AddUser';
import { useQuery } from '@tanstack/react-query';
import { userestaurantStore } from 'store/restaurant/restaurantStore';
import { getWorkUsers } from 'store/api/axiosSetup';
const ManageUserHome = () => {
    const restaurant = userestaurantStore(state=>state.restaurant);
    const user = useUserStore(state=>state.user);
    const { isLoading, isError, data, error } = useQuery(
        {
          enabled: !!restaurant.restaurantInfo,
          queryKey:['getWorkUsers'], 
          queryFn:()=>getWorkUsers({
            restaurantId:restaurant.restaurantInfo._id,
            headerAuth:user.jwtToken
          }),
          onSuccess:(data)=>{
            // console.log({data:data?.data?.data})
            setAllUserProfile(data?.data?.data?.staff)
          }
      })
    const [edit, setEdit] = useState(false);
    const [open, setOpen] = useState(false);
    const [newUser, setNewUser] = useState(false);
    const [allUserProfile, setAllUserProfile] = useState([]);
    console.log({allUserProfile})
    const [userIndex, setuserIndex] = useState<{
        user:{
            mobileNumber: string;
            name: string;
            role: string;
            _id: string;
            isLogin:boolean;
        },
        index:number
    }>();
    // console.log(user);
  return (
    <Stack sx={{
        width:"100%",
        height:"100vh",
        overflow:"hidden",
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:'flex-start',
        gap:3,
        p:3,
        flexWrap:"wrap"
    }}>
        <TopBar title={"Manage User"} home={true} backUrl={"/"}>
            <Button variant='contained' onClick={()=>{setNewUser(true);setOpen(true);}} sx={{
                borderRadius:1
            }}><AddIcon/>Add User</Button>
        </TopBar>
        <Stack sx={{
            width:"100%",
            height:"100%",
            overflowY:"auto",
            flexDirection:"row",
            justifyContent:"flex-start",
            alignItems:'flex-start',
            gap:3,
            pb:20,
            flexWrap:"wrap"
        }}>
            {isLoading?
                <>
                    <CircularProgress/>
                </>
            :
                allUserProfile.map((user, index)=>(
                <>
                <UserCard key={index} setNewUser={setNewUser} index={index} user={user} open={open} setOpen={setOpen} setuserIndex={setuserIndex}/>
                </>
                ))
            }
        </Stack>
        <BasicModal open={open} setOpen={setOpen} title={newUser?"Add User" : (edit?"Edit User":"View User")}>
            {
                newUser?
                <AddUser setOpen={setOpen} setNewUser={setNewUser}/>
                :
                <ViewUserModal setuserIndex={setuserIndex} setAllUserProfile={setAllUserProfile} userIndex={userIndex} edit={edit} setEdit={setEdit}/>

            }
        </BasicModal>
    </Stack>
  )
}

export default ManageUserHome