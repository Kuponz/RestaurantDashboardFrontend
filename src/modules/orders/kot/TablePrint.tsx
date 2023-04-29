import { Stack, Typography } from '@mui/material'
import React from 'react'
import Orders from '../orders/Orders'
import moment from 'moment'
import { Printer, Text } from "react-thermal-printer";

const TablePrint = ({order, componentRef}) => {
  return (
    <div ref={el=>(componentRef.current = el)}>
      <Text style={{
        textAlign:"center",
        paddingTop:1,
      }}>KOT</Text>
      <div style={{
        display:"flex",
        padding:2,
        justifyContent:"space-between"
      }}>
        <Text>{order.table.TableName}</Text>
        <Text>{
        moment(order?.createdAt).format('MMMM Do YYYY, h:mm:ss a')
        }</Text>
      </div>
      <Orders order={order} isKot={true}/>

    </div>
  )
  // <Stack ref={el=>(componentRef.current = el)} sx={{
  //   p:2
  // }}>
  //     <Text textAlign={"center"} variant='body1' p={0.5}> ref={el=>(componentRef.current = el)}</Text>
  //     <Stack direction={"row"} justifyContent={"space-between"} sx={{
  //       px: {
  //         xs: 1,
  //         md: 2,
  //       },
  //     }}>
  //       <Text>{order.table.TableName}</Text>
  //       <Text>{
  //       moment(order?.createdAt).format('MMMM Do YYYY, h:mm:ss a')
  //       }</Text>
  //     </Stack>
  //     <Orders order={order} isKot={true}/>
  // </Stack>
}

// <Text>{orderItem.menuId.itemName}</Text>
// <Text>{orderItem.quantity}</Text>
// <Text>{orderItem.cost}</Text>
export default TablePrint