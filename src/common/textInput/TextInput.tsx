import { Icon, IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material'
import React from 'react'
import { JSX } from '@types/react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
interface inputFields{
  fields:{
    variant: TextFieldProps & JSX.IntrinsicAttributes ,
    label:TextFieldProps & JSX.IntrinsicAttributes ,
    placeholder:TextFieldProps & JSX.IntrinsicAttributes ,
    fullWidth:TextFieldProps & JSX.IntrinsicAttributes ,
    name:TextFieldProps & JSX.IntrinsicAttributes ,
    type:TextFieldProps & JSX.IntrinsicAttributes ,
  },
  userObj: {
    mobileNumber: string | Number;
    pin: String | Number;
    showPin: boolean;
},
  setUserObj ?: any
  ,errorM?:Boolean,
  errorP?:Boolean,
  erroRef:any,
  disabled:Boolean
}

const TextInput = ({fields, erroRef, userObj, setUserObj, errorM, errorP}:inputFields) => {
  return (
    fields.name != "pin"?

    <>
      <TextField 
        variant={fields.variant} 
        label={fields.label} 
        name={fields.name} 
        fullWidth={fields.fullWidth} 
        placeholder={fields.placeholder}
        type={fields.type}
        margin="dense"
        error={(fields.name == "pin"?errorP:errorM)}
        disabled={fields.disabled}
        onChange={(e)=>{
          erroRef.current ={
            errorM:false,
            errorP:false,
            message:""
          }
          setUserObj({...userObj, [e.target.name]:e.target.value })
        }} 
      />
    </>
    :
    <>
    <TextField 
        variant={fields.variant} 
        label={fields.label} 
        name={fields.name} 
        fullWidth={fields.fullWidth} 
        placeholder={fields.placeholder}
        type={userObj.showPin?"number":fields.type}
        margin="dense"
        error={(fields.name == "pin"?errorP:errorM)}
        disabled={fields.disabled}
        onChange={(e)=>{
          erroRef.current ={
            errorM:false,
            errorP:false,
            message:""
          }
          if(e.target.name == "pin")
          {
            e.target.value = e.target.value.replace(/\D/g, "");
          }
          setUserObj({...userObj, [e.target.name]:e.target.value })
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              {
                !userObj.showPin?
                <Icon onClick={()=>setUserObj({...userObj, showPin:!userObj.showPin})}>
                  <VisibilityIcon/>
                </Icon>
                :
                <Icon onClick={()=>setUserObj({...userObj, showPin:!userObj.showPin})}>
                  <VisibilityOffIcon/>
                </Icon>

              }
            </InputAdornment>
          ),
        }} 
      />
    </>
  )
}

export default TextInput