import { Button, Icon, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useUserStore } from 'store/user/userzustandstore';
import { flexBox, size } from 'theme/defaultFunction';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
const HomeStructure = () => {
    const router = useRouter();
    const userState = useUserStore(state=>state.user);
    useEffect(() => {
      if(!userState?.login){
        router.push("/auth")
      }
    }, [router, userState?.login])
    useEffect(()=>{
        if(userState?.login && userState.role == "WAITER"){
            router.push("/table")
        }
    },[])
  return (
    <Stack sx={{
        ...flexBox("column"),
        ...size("100vh", "100vw")
    }}>
        <Typography variant="h2">Stay Tuned</Typography>
        <Typography variant="body2">Construction in Progress!</Typography>
        <Stack direction={"column"} sx={{
            py:5,

        }}>
            <Typography pb={3}>Meanwhile You can Book Table: </Typography>
            <Button variant={"outlined"} onClick={()=>{
                router.push("/table")
            }} sx={{...flexBox(), gap:1}}>Book Tables <EastOutlinedIcon/></Button>
        </Stack>
    </Stack>
  )
}

export default HomeStructure