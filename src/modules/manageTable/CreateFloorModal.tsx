import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import React from 'react'

const CreateFloorModal = ({isFloor, floorClick, tableClick, setisFloor, tableData, setTableData, onClickHandler}) => {
  const val=!isFloor?[
    "TableName",
    "floorId",
    "tableCapacity",
  ]:[
    "floorName" 
  ]
    
  return (
    <Stack sx={{
      p:1,
    }}
    spacing={3}
    >
      {
      val.map((keyVal, inde)=>tableData[keyVal].type == "text"?
      (
        <TextField variant='filled' value={tableData[keyVal].value} label={tableData[keyVal].title} name={tableData[keyVal].name} key={inde} onChange={(e)=>{
          setTableData({
            ...tableData,
            [e.target.name]:{
              ...tableData[e.target.name],
              value:e.target.value
            },
          })
        }}/>
      )
      :
      (
        <FormControl fullWidth key={inde} >
          <InputLabel id="demo-simple-select-label">{tableData[keyVal].title}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tableData[keyVal].value}
            label={tableData[keyVal].value}
            onChange={(e)=>{
              setTableData({
                ...tableData,
                [keyVal]:{
                  ...tableData[keyVal],
                  value:e.target.value,
                }
              })
            }}
          >
            {tableData[keyVal].options.map(opt=>(
              <MenuItem value={opt.value} key={opt.value}>{opt.title}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )
      )
    }
      <Button sx={{}} disabled={floorClick.isLoading || tableClick.isLoading} onClick={onClickHandler} variant='contained'>Add</Button>

    </Stack>
  )
}

export default CreateFloorModal