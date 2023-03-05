import { Stack, Typography } from "@mui/material";
import React from "react";
import { SeperateOrder } from "./SeperateOrder";
import { callfortitle } from "../SumValue";
import moment from "moment";
import { Text } from "react-thermal-printer";

const Orders = ({ order, print = false, isKot=false}) => {
  return (
    <Stack
      sx={{
        height: "100%",
      }}
    >
      <Stack
        direction={"row"}
        sx={{
          width: "100%",
          justifyContent: "space-between",
          px: {
            xs: 1,
            md: 2,
          },
        }}
      >
        <Stack
          sx={{
            width: "50%",
          }}
        >
          <Typography variant="body1">Item Name</Typography>
        </Stack>
        <Stack
          direction={"row"}
          sx={{
            width: "50%",
            justifyContent: isKot ?"flex-end":"space-between",
          }}
        >
          <Stack direction={"row"} gap={1}>
            {!isKot && <Typography variant="body1">Price</Typography>}
            <Typography variant="body1"> Quantity</Typography>
          </Stack>
          {!isKot && <Typography variant="body1">Total</Typography>}
        </Stack>
      </Stack>
      <Stack
        sx={{
          overflowY: "auto",
          pb: print ? 1 : 20,
          px: {
            xs: 1,
            md: 2,
          },
        }}
      >
        {order?.order?.map((orderVal, orderINdex) => (
          <>
            <SeperateOrder isKot={isKot} orderVal={orderVal} key={orderINdex} />
          </>
        ))}
      </Stack>
      {print && (
        <Stack sx={{
          overflowY: "auto",
          pb: 1,
          px: {
            xs: 1,
            md: 2,
          },
        }}>
          {Object?.keys(order?.orderAmount || {})?.map((data, index)=>{
                if(data == "orderBeforeAddingGSTValue"){
                    return null
                }
                return (
                    data == "discount" ?
                    (order?.orderAmount.discount != 0 ?
                    <Stack direction={"row"} key={index} justifyContent={"space-between"} alignItems={"center"} py={0}>
                        {/* {console.log({call:callfortitle(data), data})} */}
                        <Text>{callfortitle(data)}</Text>
                        <Stack direction={"row"}>
                            <span>- ₹</span>
                            <Text>{ order?.orderAmount[data]  }</Text>
                        </Stack>
                    </Stack>
                    :
                    <></>)
                    :
                    data == "finalTotal" ?
                    <></>
                    :
                    <Stack direction={"row"} key={index} justifyContent={"space-between"} alignItems={"center"} py={0}>
                        {/* {console.log({call:callfortitle(data), data})} */}
                        <Text>{callfortitle(data)}</Text>
                        <Stack direction={"row"}>    
                            {(data == "total" || data == "orderGst" || data == "orderExcludeGSTValue" || data == "orderBeforeAddingGSTValue") && <span>₹</span>}
                            <Text>{data == "orderExcludeGSTValue" || data == "orderBeforeAddingGSTValue"? order?.orderAmount[data] + order?.orderAmount["orderBeforeAddingGSTValue"]:order?.orderAmount[data] }</Text>
                        </Stack>
                    </Stack>
                )
              })}
            <Text style={{
              textAlign:"center",
              fontFamily:"monospace"
            }}>Thanks & visit Again!</Text>
            <Text style={{
              textAlign:"center",
              fontSize:"10px",
              fontFamily:"monospace"
              
            }}>powered by etoPOS</Text>
            
        </Stack>
      )}
    </Stack>
  );
};

export default Orders;
