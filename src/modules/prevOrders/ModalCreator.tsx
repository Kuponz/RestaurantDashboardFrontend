import { Stack, Typography } from "@mui/material";
import { OrderItems } from "modules/orders/OrderItems";
import React from "react";

const ModalCreator = ({ setWatchOrder, watchOrder, open, setOpen }) => {
  return (
    <>
      <Stack direction={"column"}>

        <Stack direction={"row"} py={0.25} justifyContent={"space-between"} sx={{
          width:"100%",
          flexWrap:"wrap"
        }}>
          <Typography variant="h5" width={{
            xs:"100%",
            md:"45%"
          }}>
            Table: {watchOrder.table.TableName}
          </Typography>

          <Typography variant="h5" width={{
            xs:"100%",
            md:"45%"
          }}>
          {watchOrder.orderStatus}
          </Typography>

        </Stack>

        <Stack direction={"row"} py={0.25} justifyContent={"space-between"} sx={{
          width:"100%",
          flexWrap:"wrap"
        }}>
          {Object.keys(watchOrder.orderAmount).map((orderVal, index)=>(
            <Stack direction={"row"} py={0.25} justifyContent={"space-between"} sx={{
              width:{
                xs:"100%",
                md:"45%"
              },
            }} key={index}>
              <Typography color={orderVal == "total"?"primary.main":"inherit"} sx={{
                fontWeight:orderVal=="total"?700:500,
                fontSize:orderVal=="total"?16:14
              }}>
              {orderVal} :
              </Typography>
              <Typography color={orderVal == "total"?"primary.main":"inherit"} sx={{
                fontWeight:orderVal=="total"?700:500,
                fontSize:orderVal=="total"?16:14
              }}>
                {watchOrder.orderAmount[orderVal]}
              </Typography>
            </Stack>
          ))}
        </Stack>
        <Stack direction={"row"} py={0.25} justifyContent={"space-between"} sx={{
          width:"100%",
          flexWrap:"wrap"
        }}>
          <Typography variant="body2" width={{
            xs:"100%",
            md:"45%"
          }}>Order Id: {watchOrder._id}</Typography>
          <Typography variant="body2" width={{
            xs:"100%",
            md:"45%"
          }}>
            Order Type: {watchOrder.orderType}
          </Typography>
        </Stack>
        <Stack direction={"row"} py={0.25} justifyContent={"space-between"} sx={{
          width:"100%",
          flexWrap:"wrap"
        }}>
          <Typography variant="body2" width={{
            xs:"100%",
            md:"45%"
          }}>
            Payment Status: {watchOrder.paymentStatus ? "DONE" : "UNPAID"}
          </Typography>
          <Typography variant="body2" width={{
            xs:"100%",
            md:"45%"
          }}>
            Waiter: {watchOrder?.createdUser?.name}
          </Typography>
          
        </Stack>

        <Stack direction={"row"} py={0.25} justifyContent={"space-between"} sx={{
          width:"100%",
          flexWrap:"wrap"
        }}>
          <Typography variant="body2" width={{
            xs:"100%",
            md:"45%"
          }}>
            Payment Mode: {watchOrder.paymentStatus ? watchOrder?.paymentDetails?.paidVia : "NONE"}
          </Typography>
          {
            watchOrder.orderStatus === "CANCELLED" ? (
              <Typography variant="body2" width={{
                xs:"100%",
                md:"45%"
              }}>
                Reason for Cancellation: {watchOrder.specialInstruction ?  watchOrder.specialInstruction : "NONE"}
              </Typography>)
              :
              null
          }
        </Stack>


      </Stack>
      <Stack>
        <Stack
          sx={{
            width: "100%",
            flexDirection: "row",
            // border:"2px soid red"
          }}
        >
          <Stack sx={{ width: "60%" }}>
            <Typography
              sx={{
                width: "100%",
                flexShrink: 0,
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              Item Name
            </Typography>
          </Stack>
          <Stack direction={"row"} sx={{ width: "40%" }}>
            <Typography sx={{ color: "text.secondary" }}> Quantity</Typography>
            <Typography sx={{ ml: "auto", color: "text.secondary" }}>
              Cost
            </Typography>
          </Stack>
        </Stack>
        {watchOrder.order.map((ord, idn) => (
          <OrderItems isDashboardViewer={true} menuData={ord} key={idn} />
        ))}
      </Stack>
    </>
  );
};

export default ModalCreator;
