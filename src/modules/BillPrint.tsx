import { Button, Stack, Typography } from "@mui/material";
import React, { useRef } from "react";
import { Printer, Text } from "react-thermal-printer";
import Orders from "./orders/orders/Orders";
import { useRouter } from "next/router";
import { userestaurantStore } from "store/restaurant/restaurantStore";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';

export const BillPrint = ({order, reference=false, componentRef, setShowPrint}) => {
  const router = useRouter();
  const restaurant = userestaurantStore(state=>state.restaurant);
  if(reference){
   return (
    <>
      <Stack direction={"row"} gap={1} sx={{
        p:1
      }}>
        <Button variant={"outlined"} onClick={()=>setShowPrint(false)}><KeyboardBackspaceIcon/>Back to order</Button>
        <Button variant={"outlined"} onClick={()=>{
        router.push("/restaurant/table")
      }}><TableRestaurantIcon/>Back to Table Booking</Button>
      </Stack>
      <Stack ref={el=>(componentRef.current = el)}>
        <Typography variant="h3" textAlign={"center"} pt={5} pb={2}>{restaurant.restaurantInfo.restaurantName}</Typography>
        <Stack sx={{
          p:2
        }}>
          <Orders print={true} order={order}/>
        </Stack>
      </Stack>

    </>
   ) 
  }else{
    return (
    <>
      <Text>{order.orderAmount.total}</Text>  
      {order.order.map(orderItem=>(
        <Stack key={orderItem}>
          <Text>{orderItem.menuId.itemName}</Text>
          <Text>{orderItem.quantity}</Text>
          <Text>{orderItem.cost}</Text>
  
        </Stack>
        
      ))}
    </>
    )
  }
}
