import { Switch, TextField } from '@mui/material'
import React from 'react'

const ValueForm = ({values}) => {
    console.log({values});
    if(values.type == "boolean"){
        return (
            <>
                <Switch aria-label={values.name}/>
            </>
        )
    }else{
        return (
            <>
                <TextField variant='filled' label={values.title}/>
            </>
        )
    }
}

export default ValueForm