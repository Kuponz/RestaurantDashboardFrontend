import { Button, CircularProgress, Icon, IconButton, Paper, Stack, Typography } from '@mui/material';
import React from 'react'
import { flexBox } from 'theme/defaultFunction';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { tokens } from 'theme/theme';
import { useUserStore } from 'store/user/userzustandstore';
import { userestaurantStore } from 'store/restaurant/restaurantStore';

type userCard={
    user: {
        mobileNumber: string;
        name: string;
        role: string;
        _id: string;
    },
    index:number,
    open:boolean,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>,
    setuserIndex: React.Dispatch<React.SetStateAction<{
        user: {
            mobileNumber: string;
            name: string;
            role: string;
            _id: string;
        };
        index: number;
    } | undefined>>
}
const UserCard = ({user, open, deletUsermut, setNewUser, setOpen, index, setuserIndex}:userCard) => {
  const userData= useUserStore(state=>state.user);
  const restroData = userestaurantStore(state=>state.restaurant.restaurantInfo);
  return (
    <Paper variant='outlined' sx={{
        ...flexBox("column"),
        p:3,
        position:"relative",
        gap:1,
        width:{
          xs:"100%",
          md:"initial"
        },
        minHeight:150, minWidth:150
    }}>
        
        <Typography variant='h5'>{user.name}</Typography>
        <Typography variant='body2'>{user.role}</Typography>
        <Typography variant='body2'>{user.mobileNumber}</Typography>
        <Stack direction={"row"} justifyContent={"space-between"} width={"100%"} pt={1}>
            
            <IconButton onClick={()=>{
                setuserIndex({
                    user:user,
                    index
                });
                setNewUser(false);
                setOpen(true)}}
            ><VisibilityIcon/></IconButton>
            <IconButton 
            onClick={()=>{
              if(confirm("Sure Delete?"))
              {
                
                const props={
                  restaurantId:restroData?._id,
                  _id:user._id,
                  headerAuth:userData?.jwtToken
                }
                console.log({props})
                deletUsermut.mutate(props)
              }

            }}
            disabled={deletUsermut?.isLoading}
            sx ={{
            backgroundColor:tokens().redAccent[500],
            color:"#fff",
            boxShadow:3,
            ":focus":{
              backgroundColor:tokens().redAccent[400],
              color:"#fff",
              boxShadow:10,
            },
            ":hover":{
              backgroundColor:tokens().redAccent[400],
              color:"#fff",
            }
          }}>{deletUsermut?.isLoading?<CircularProgress/>:<DeleteIcon/>}</IconButton>
        </Stack>
    </Paper>
  )
}

export default UserCard