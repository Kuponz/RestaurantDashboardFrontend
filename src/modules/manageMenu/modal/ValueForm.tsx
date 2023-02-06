import { FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material'
import React from 'react'

const ValueForm = ({values, setData}) => {
    // console.log({values});
    if(values.type == "boolean"){
        return (
            <>
            <FormControlLabel
                sx={{
                    justifyContent:"flex-start",
                    flexDirection:"row"
                }}
                control={<Switch checked={values?.value} onChange={e=>{
                    setData(oldData=>(
                        {
                         ...oldData, 
                         [values.name]:{
                            ...oldData[values.name],
                            value:!values?.value,
                        }
                    }
                    )) 
                }}/>}
                label={values?.name} 
                labelPlacement="top"
            />
            </>
        )
    }else if(values.type == "select"){
        return (<FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{values.title}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.value}
              label={values.title}
              onChange={(e)=>{
                setData(oldData=>(
                    {
                     ...oldData, 
                     [values.name]:{
                        ...oldData[values.name],
                        value:e.target.value
                    }
                }
                ))               
              }}
            >
            {values?.selectItem.map(menuValItem => (
                <MenuItem value={menuValItem.id} key={menuValItem.id}>{menuValItem.name}</MenuItem>
            ))}
            </Select>
          </FormControl>)
    }else{
        return (
            <>
                <TextField value={values.value} name={values?.name} onChange={e=>{
                    setData(dat=>({
                        ...dat,
                        [e.target.name]:{
                            ...dat[e.target.name],
                            value:e.target.value,

                        },
                    }))
                }} variant='filled' label={values.title}/>
            </>
        )
    }
}

export default ValueForm