import { Button, Divider, Stack, Typography } from "@mui/material";
import React, { useRef } from "react";
import { Printer, Text } from "react-thermal-printer";
import Orders from "./orders/orders/Orders";
import { useRouter } from "next/router";
import { userestaurantStore } from "store/restaurant/restaurantStore";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import moment from "moment";

export const BillPrint = ({order, reference=false, componentRef, setShowPrint}) => {
  const router = useRouter();
  const restaurant = userestaurantStore(state=>state.restaurant);
  console.log({restaurant});
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
        <Stack sx={{
          px: {
            xs: 0.5,
            md: 2,
          },
        }}>
          <Stack>
            <Typography variant="h3" textAlign={"center"} pt={1}>{restaurant.restaurantInfo?.print?.billing?.restaurantName || restaurant.restaurantInfo?.restaurantName}</Typography>
            {
              restaurant.restaurantInfo?.print?.billing?.restaurantShorts != "" &&
              <Typography variant="body1" textAlign={"center"} pt={0.25} pb={0}>{restaurant.restaurantInfo?.print?.billing?.restaurantShorts}</Typography>
            }
          </Stack>
          {
            restaurant.restaurantInfo?.print?.billing?.restaurantAddress != "" &&
            <Typography variant="body1" textAlign={"center"}  pt={0.0} pb={0}>{restaurant.restaurantInfo?.print?.billing?.restaurantAddress}</Typography>
          }
          {
            restaurant.restaurantInfo?.print?.billing?.restaurantMobileNumber != "" &&
            <Typography variant="body1" textAlign={"center"}>Mo: {restaurant.restaurantInfo?.print?.billing?.restaurantMobileNumber}</Typography>
          }
          <Divider color="black"></Divider>
          <Stack direction={"row"} flexWrap={"wrap"} justifyContent={"space-between"} alignItems={"center"}>
            <Typography px = {{
              xs: 0,
              md: 2,
            }}>Order No: {order?._id.slice(order?._id.length- 5,order?._id.length )}</Typography>

            <Typography px = {{
              xs: 0,
              md: 2,
            }}>{moment(order?.createdAt).format('DD-MMM-YYYY h:mm A')}</Typography>
          </Stack>
        </Stack>
        <Stack sx={{
          p:1
        }}>
          <Divider variant="fullWidth" color="black" ></Divider>
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
