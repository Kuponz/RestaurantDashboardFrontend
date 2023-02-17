
import Link from 'next/link';
import { Alert, Box, Button, CircularProgress, Icon, Link as MuiLink, Paper, Snackbar, Stack, TextField, Typography } from '@mui/material'
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { useLoginStyles } from './LoginAuth'
import TextInput from 'common/textInput/TextInput';
import { flexBox } from 'theme/defaultFunction';
import { SupportAgentOutlined } from '@mui/icons-material';
import { useUserStore } from 'store/user/userzustandstore';
import { useMutation } from '@tanstack/react-query';
import { loginUserFn } from 'store/api/axiosSetup';



const AuthRoleLogin = () => {
    const [userObj, setUserObj] = useState<{
        mobileNumber: string | Number; pin : String | Number;
        showPin:boolean,
    }>({
    mobileNumber:"",
    pin:"",
    showPin:false,

    });
    const erroRef = useRef({
        errorM:false,
        errorP:false,
        message:""
    });
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const userState = useUserStore(state=>state);
    const {mutate, isLoading} = useMutation(loginUserFn, {
        onSuccess:(data, variables, context)=> {

            console.log({
                data:data.data.data?.userLogged,
                variables,
                context,
                userState
            })
            userState.setUser(data.data.data?.userLogged)
        },
        onError: (error, variables, context) =>{
            console.log({error})
            if(error?.response?.data.data){
                erroRef.current = {
                    errorM:error?.response?.data?.data?.mobileNumber,
                    errorP:error?.response?.data?.data?.pin,
                    message:error?.response?.data?.message
                }
                setOpen(true);

            }else
            {
                erroRef.current={
                    message:error?.response?.data?.message ?? error?.message,
                    errorM:false,
                    errorP:false,
                }
                setOpen(true);
            }
        },
    })
    const InputJson = [
        {
            variant:"filled",
            type:"number",
            label:"Mobile Number",
            name:"mobileNumber",
            placeholder:"1234567891",
            fullWidth:true,
            disabled:isLoading
        },
        {
            variant:"filled",
            type:"password",
            label:"Pin",
            name:"pin",
            placeholder:"123456",
            fullWidth:true,
            disabled:isLoading            
        },
    ]
      // const router = useRouter();
    const handleClose = ()=>setOpen(false);
    const submitLogin = (e:any)=>{
        e.preventDefault();
        mutate(userObj)
    }
    useEffect(()=>{
        if(userState.user.login && userState.user.jwtToken && userState.user._id){
            router.push("/");
        }
    },[userState.user, router])
    return (
        <Stack sx={{
            background: 'linear-gradient(306deg, rgba(155,230,194,1) 12%, rgba(69,226,151,1) 36%, rgba(155,230,194,1) 89%)',
            height: '100vh',
            width:"100vw",
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
        }}>
            <Paper elevation={20} sx={{
                width:{
                    xs:'90%',
                    sm:'70%',
                    md:'40%',
                    lg:'30%',  
                },
                padding:2,
                ...flexBox("column"),

            }}>
                    <Typography variant='h3'>etoPOS<sup>TM</sup></Typography>
                    <Box sx={{
                        position:"relative",
                        width:"3rem",
                        height:"3rem",
                        mb:5
                    }}>
                        <Image src="/thirteen.svg" layout='fill' objectFit='contain' alt="Login Logo" />
                    </Box>

                    <Stack sx={{
                        gap:2,
                        width:"100%"
                    }}>
                        {InputJson.map((fields, val)=>(
                            <TextInput erroRef={erroRef} errorM={erroRef.current.errorM} errorP={erroRef.current.errorP} userObj={userObj} setUserObj={setUserObj} fields={fields} key={val}/>
                        ))}
                        <Typography>Forgot &nbsp; 
                            <Link href="/forgot">
                                <MuiLink>Pin</MuiLink>
                            </Link>
                        </Typography>
                        <Button variant='contained' disabled={isLoading} onClick={(e)=>submitLogin(e)}>{isLoading?<CircularProgress /> :"Login"}</Button>
                        <Typography variant='body2' textAlign={"center"} sx={{...flexBox()}}>Contact &nbsp; 
                            <Link target='_blank' href="https://wa.me/+918180850827" >
                                <MuiLink sx={{...flexBox()}}>
                                    Support
                                    <Icon><SupportAgentOutlined/></Icon>
                                </MuiLink>
                            </Link>
                        </Typography>
                    </Stack>
                    <Stack sx={{
                        pt:5
                    }}>

                        <Typography variant='caption'>Powered by etoPOS<sup>TM</sup></Typography>
                    </Stack>
            </Paper>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {erroRef.current.message}
                </Alert>
            </Snackbar>
        </Stack>
    )
}

export default AuthRoleLogin