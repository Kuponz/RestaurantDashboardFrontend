import { Divider, Paper, Stack, Tooltip, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { flexBox } from 'theme/defaultFunction'
import { tokens } from 'theme/theme'

const CustomCard = ({tableData}) => {
    const router = useRouter();
    // const dummyData={
    //     status:"VACANT",
    //     order:{
    //         total:"$500",
    //         items:5,
    //     },
    //     tableName:"Table Number 3",
    //     tableId:"13384"
    // }
    const varaint={
        "VACANT":"outlined",
        "ORDERING":"inprogress",
        "OCCUPIED":"reserved",
        "BILLING":"free"
    }
    const varaintSelection=tableData.status
  return (
    <Tooltip title={varaintSelection}>
      <Paper 
      variant={varaint[varaintSelection]} 
      sx={{
        width:{
            xs:"45%",
            md:"30%",
            lg:"18%"
        },
        height:"90px",
        p:3,
        ...flexBox("column"),
        cursor:"pointer"
      }}
      onClick={()=>{
        router.push(`/restaurant/table/menu?table=${tableData?._id}`)
      }}
      >
          <Typography variant="body1" component="div" sx={{
                color:varaintSelection=="VACANT"?tokens().greenAccent[500]:"white"
            }}>
              {tableData.TableName}
          </Typography>
          {
              tableData.order &&  (tableData.order.total)?
               <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                    
                >
                    <Typography variant='caption' sx={{
                        color:varaintSelection=="VACANT"?tokens().grey[300]:"white"
                    }}>{tableData.order.total}</Typography>
                    <Typography variant='caption' sx={{
                        color:varaintSelection=="VACANT"?tokens().grey[300]:"white"
                    }}>{tableData.order.items}</Typography>
                
                </Stack>
                :
                <Stack direction={"row"}>

                    <Typography variant='caption'>{tableData.status}</Typography>
                </Stack>

            }
      </Paper>
    </Tooltip>
  )
}

export default CustomCard