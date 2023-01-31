import { Stack, Typography } from "@mui/material";
import React from "react";
import { SeperateOrder } from "./SeperateOrder";
import { flexBox } from "theme/defaultFunction";
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
          <Typography variant="body2">Item Name</Typography>
        </Stack>
        <Stack
          direction={"row"}
          sx={{
            width: "50%",
            justifyContent: "space-between",
          }}
        >
          <Stack direction={"row"} gap={1}>
            <Typography variant="body2">Price</Typography>
            <Typography variant="body2"> Quantity</Typography>
          </Stack>
          <Typography variant="body2">Total</Typography>
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
          {Object?.keys(order?.orderAmount || {})?.map((data, index) => {
            return (
              <Stack
                direction={"row"}
                key={index}
                justifyContent={"space-between"}
                alignItems={"center"}
                py={1}
              >
                {/* {console.log({call:callfortitle(data), data})} */}
                <Typography variant="h5">{callfortitle(data)}</Typography>
                <Stack direction={"row"}>
                    {
                      (data == "total" || data == "orderGst") ?
                      <Typography variant="h4" fontWeight={700} color={"primary.main"}>
                        <span>₹</span>
                        {order?.orderAmount[data]}
                      </Typography>
                       :
                        <Typography variant="h5">
                        {order?.orderAmount[data]}
                        </Typography>
                    }
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
};

export default Orders;
