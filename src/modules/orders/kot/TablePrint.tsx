import { Stack, Typography } from '@mui/material'
import React from 'react'
import Orders from '../orders/Orders'

const TablePrint = ({order, componentRef}) => {
  return (
    <Stack ref={el=>(componentRef.current = el)} sx={{
      p:2
    }}>
        <Typography textAlign={"center"} variant='body1' p={0.5}>KOT</Typography>
        <Stack direction={"row"} justifyContent={"space-between"} p={1}>
          <Typography>{order.table.TableName}</Typography>
          <Typography>{order.createdUser.name}</Typography>
        </Stack>
        <Orders order={order}/>
    </Stack>
  )
}

export default TablePrint