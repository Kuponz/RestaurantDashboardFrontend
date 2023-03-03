import { Stack, Typography } from '@mui/material'
import React from 'react'
import Orders from '../orders/Orders'
import moment from 'moment'

const TablePrint = ({order, componentRef}) => {
  return (
    <Stack ref={el=>(componentRef.current = el)} sx={{
      p:2
    }}>
        <Typography textAlign={"center"} variant='body1' p={0.5}>KOT</Typography>
        <Stack direction={"row"} justifyContent={"space-between"} sx={{
          px: {
            xs: 1,
            md: 2,
          },
        }}>
          <Typography>{order.table.TableName}</Typography>
          <Typography>{
          moment(order?.createdAt).format('MMMM Do YYYY, h:mm:ss a')
          }</Typography>
        </Stack>
        <Orders order={order} isKot={true}/>
    </Stack>
  )
}

export default TablePrint