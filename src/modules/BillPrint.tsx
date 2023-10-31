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
          p:0.25
        }}>
          <Stack>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "monospace",
                fontSize:"20px",
                fontWeight:700
              }}
            >
              {restaurant.restaurantInfo?.print?.billing?.restaurantName || restaurant.restaurantInfo?.restaurantName}
            </Text>
            {
              restaurant.restaurantInfo?.print?.billing?.restaurantShorts != "" &&
              <Text
              style={{
                textAlign: "center",
                fontFamily: "monospace",
                fontSize:"16px",
                fontWeight:500
              }}>
                {restaurant.restaurantInfo?.print?.billing?.restaurantShorts}
              </Text>
            }
          </Stack>
          {
            restaurant.restaurantInfo?.print?.billing?.restaurantAddress != "" &&
            <Text
              style={{
                textAlign: "center",
                fontFamily: "monospace",
                fontSize:"14px",
                fontWeight:500
              }}>
                {restaurant.restaurantInfo?.print?.billing?.restaurantShorts}
              </Text>
         }
          {
            restaurant.restaurantInfo?.print?.billing?.restaurantMobileNumber != "" &&
            <Text
              style={{
                textAlign: "center",
                fontFamily: "monospace",
                fontSize:"14px",
                fontWeight:500
              }}>
                Mo: {restaurant.restaurantInfo?.print?.billing?.restaurantMobileNumber}
              </Text>
          }
          <Divider color="black"></Divider>
          <Stack direction={"row"} flexWrap={"wrap"} justifyContent={"space-between"} alignItems={"center"}>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "monospace",
                fontSize:"14px",
                fontWeight:500
              }}>
                Order No: {order?._id.slice(order?._id.length - 3,order?._id.length )}
              </Text>
              <Text
              style={{
                textAlign: "center",
                fontFamily: "monospace",
                fontSize:"14px",
                fontWeight:500
              }}>
                Tbl No: {order?.table?.TableName}
              </Text>
            
          </Stack>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "monospace",
                fontSize:"14px",
                fontWeight:500
              }}>
                {moment(order?.timeCreated ? order?.timeCreated : order?.createdAt).format('DD-MMM-YYYY h:mm A')}
              </Text>
        </Stack>
        <Stack sx={{
          p:0.25
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
