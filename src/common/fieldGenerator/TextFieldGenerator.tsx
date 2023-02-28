import { TextField } from '@mui/material'
import React from 'react'

const TextFieldGenerator = ({changer}) => {
    console.log({changer})
  return (
    <TextField variant='filled' fullWidth label={changer.title} value={changer.value} name={changer.name} onChange={e=>changer.onChange(e)}/>
  )
}

export default TextFieldGenerator