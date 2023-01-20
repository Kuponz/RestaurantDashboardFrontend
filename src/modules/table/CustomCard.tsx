import { Divider, Paper, Stack, Tooltip, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { flexBox } from 'theme/defaultFunction'
import { tokens } from 'theme/theme'

const CustomCard = () => {
    const router = useRouter();
    const dummyData={
        status:"VACANT",
        order:{
            total:"$500",
            items:5,
        },
        tableName:"Table Number 3",
        tableId:"13384"
    }
    const varaint={
        "VACANT":"outlined",
        "ORDERING":"inprogress",
        "OCCUPIED":"reserved",
        "BILLING":"free"
    }
    const varaintSelection=dummyData.status
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
        router.push(`/restaurant/table/menu?table=${dummyData?.tableId}`)
      }}
      >
          <Typography variant="body1" component="div" sx={{
                color:varaintSelection=="VACANT"?tokens().greenAccent[500]:"white"
            }}>
              {dummyData.tableName}
          </Typography>
          {
              dummyData.order &&  (dummyData.order.total)?
               <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                    
                >
                    <Typography variant='caption' sx={{
                        color:varaintSelection=="VACANT"?tokens().grey[300]:"white"
                    }}>{dummyData.order.total}</Typography>
                    <Typography variant='caption' sx={{
                        color:varaintSelection=="VACANT"?tokens().grey[300]:"white"
                    }}>{dummyData.order.items}</Typography>
                
                </Stack>
                :
                <Stack direction={"row"}>

                    <Typography variant='caption'>{dummyData.status}</Typography>
                </Stack>

            }
      </Paper>
    </Tooltip>
  )
}

export default CustomCard