import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Stack, Switch, TextField, Typography } from '@mui/material'
import React from 'react'
import { flexBox } from 'theme/defaultFunction'
import BooleanField from './fields/BooleanField'
import VariationsVal from './fields/VariationsVal'
import TextForm from './fields/TextForm'

const ValueForm = ({values, setData, data}) => {
    // console.log({values});
    if(values.type == "boolean"){
        return (
            <BooleanField setData={setData} values={values}/>
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
    }else if(values.type == "option"){
        return (<VariationsVal values={values} setData={setData} data={data}/>)
    }
    else{
        return (
            <TextForm values={values} setData={setData}/>
        )
    }
}

export default ValueForm