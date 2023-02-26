import { Stack, Typography } from "@mui/material";
import React from "react";
import { SeperateOrder } from "./SeperateOrder";
import { callfortitle } from "../SumValue";

const Orders = ({ order, print = false}) => {
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
            justifyContent: "space-between",
          }}
        >
          <Stack direction={"row"} gap={1}>
            <Typography variant="body1">Price</Typography>
            <Typography variant="body1"> Quantity</Typography>
          </Stack>
          <Typography variant="body1">Total</Typography>
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
            <SeperateOrder orderVal={orderVal} key={orderINdex} />
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
                  <Stack direction={"row"} key={index} justifyContent={"space-between"} alignItems={"center"}>
                      {/* {console.log({call:callfortitle(data), data})} */}
                      <Typography variant='body1'>{callfortitle(data)}</Typography>
                      <Stack direction={"row"}>
                          {(data == "total" || data == "orderGst") && <span>₹</span>}
                          <Typography variant='body1'>{data == "orderExcludeGSTValue" ? order?.orderAmount[data] + order?.orderAmount["orderBeforeAddingGSTValue"]:order?.orderAmount[data] }</Typography>
                      </Stack>
                  </Stack>
                )
              })}
            <Typography textAlign={"center"}>Thanks & visit Again!</Typography>
            <Typography textAlign={"center"} variant="caption" color={"black"}>powered by etoPOS</Typography>
            
        </Stack>
      )}
    </Stack>
  );
};

export default Orders;
