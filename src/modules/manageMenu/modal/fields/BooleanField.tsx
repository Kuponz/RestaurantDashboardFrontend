import { FormControlLabel, Switch } from '@mui/material'
import React from 'react'

const BooleanField = ({values, setData}) => {
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
}

export default BooleanField