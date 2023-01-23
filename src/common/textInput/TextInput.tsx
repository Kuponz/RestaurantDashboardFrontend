import { TextField, TextFieldProps } from '@mui/material'
import React from 'react'
import { JSX } from '@types/react';
interface inputFields{
  fields:{
    variant: TextFieldProps & JSX.IntrinsicAttributes ,
    label:TextFieldProps & JSX.IntrinsicAttributes ,
    placeholder:TextFieldProps & JSX.IntrinsicAttributes ,
    fullWidth:TextFieldProps & JSX.IntrinsicAttributes ,
    name:TextFieldProps & JSX.IntrinsicAttributes ,
    type:TextFieldProps & JSX.IntrinsicAttributes ,
  },
  userObj:{
    mobileNumber: string | Number; password : String | Number
  },
  setUserObj ?: any
  ,errorM?:Boolean,
  errorP?:Boolean,
  erroRef:any,
  disabled:Boolean
}

const TextInput = ({fields, erroRef, userObj, setUserObj, errorM, errorP}:inputFields) => {
  return (
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
  )
}

export default TextInput