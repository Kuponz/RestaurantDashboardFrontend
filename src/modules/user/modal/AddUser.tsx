import { Alert, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Switch, TextField, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { createUser } from 'store/api/axiosSetup'
import { useUserStore } from 'store/user/userzustandstore'
const info=[
    {
        title:"Name",
        value:"",
        name:"name",
        type:"text"
    },
    {
        title:"Mobile Number",
        value:"",
        name:"mobileNumber",
        type:"number"
    },
    {
        title:"Pin",
        value:"",
        name:"pin",
        type:"number"
    },
    {
        title:"Confirm Pin",
        value:"",
        name:"confirmPin",
        type:"number"
    },
    {
        title:"Role",
        value:"WAITER",
        name:"role",
        type:"select",
        selectVal:[{
            name:"OWNER",
            title:"Owner",
        },
        {
            name:"WAITER",
            title:"Waiter",
        },
        {
            name:"CAPTAIN",
            title:"Captain",
        },
        {
            name:"CHEF",
            title:"Chef",
        }
    ]
    }
]
const AddUser = ({setNewUser, setAllUserProfile, setOpen}) => {
    const [addUser, setAddUser] = useState({
        "userData":{
            "mobileNumber":"",
            "name":"",
            "pin":"",
            "confirmPin":"",
            "role":"OWNER"        
        },
        viewForm:info
    })
    const user = useUserStore(state=>state.user);
    const [err, setError] = useState("")
    const {mutate, isLoading, error} = useMutation(createUser, {
        onSuccess:(data, variables, context)=> {

            // console.log({
            //     data:data.data.data,
            //     variables,
            //     context,
            // })
            setAllUserProfile(alp=>[...alp, data.data.data?.user])
            setNewUser(false);
            setOpen(false);
        },
        onError:(error, variables, context)=> {

            setError(error.response?error.response.data.message:String(error.response))
        },
    })

    const handleChange = (event: SelectChangeEvent<string>, name:string| number |  any) => {
        setAddUser({...addUser, userData:{ ...addUser.userData, [name]:event.target.value}})
    };
    
    const submitChanges = ()=>{
        // console.log(addUser)
        mutate({
            headerAuth:user.jwtToken, 
            userObj:addUser
        });
    }
    
  return (
    isLoading?
    <Stack sx={{
        width:"100%",
        textAlign:"center"
    }}>
    <CircularProgress/>
    </Stack>
    :
    <Stack>
        {error && (<Alert>{err}</Alert>)}
        {addUser.viewForm.map((userInfo, index)=>{
            if(userInfo.type == "select"){
                return (
                    <FormControl key={index} fullWidth>
                        <InputLabel id="demo-simple-select-label">{userInfo.title}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={addUser.userData.role}
                            label={userInfo.title}
                            onChange={e=>handleChange(e, userInfo.name)}
                        >
                            {userInfo.selectVal?.map(valu=>(
                                <MenuItem 
                                    key={valu.name}
                                    value={valu.name}
                                >{valu.title}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )

            }else{
                return (
                   <TextField 
                    key={index} 
                    sx={{my:2}} 
                    variant='filled' 
                    value={addUser?.userData[userInfo.name]} 
                    onChange={e=>handleChange(e, userInfo.name)} 
                    label={userInfo.title}
                    />
                )
            }
    })}
    <Button sx={{my:2, py:1}}
        disabled={isLoading}
        variant='outlined'
        onClick={submitChanges}
    >Add User</Button>

    </Stack>
  )
}

export default AddUser