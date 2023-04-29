import { TextField } from '@mui/material'
import React from 'react'

const TextForm = ({values, setData}) => {
  return (
    <>
        <TextField value={values?.value} name={values?.name} onChange={e=>{
            setData(dat=>({
                ...dat,
                [e.target.name]:{
                    ...dat[e.target.name],
                    value:e.target.value,

                },
            }))
        }} variant='filled' label={values?.title}/>
    </>
  )
}

export default TextForm