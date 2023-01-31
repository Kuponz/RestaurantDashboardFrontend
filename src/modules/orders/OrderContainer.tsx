import React from "react";
import { Paper, Stack, Grid, Button, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import { OrderItems } from "modules/orders/OrderItems";
import moment, {} from "moment"
import { useMutation } from "@tanstack/react-query";
import { updateOrderStatus } from "store/api/axiosSetup";
import { useRouter } from "next/router";
export const OrderContainer = ({order, userDetails, adminPrev}) => {
  const router = useRouter();
  console.log({order, userDetails});
  const {mutate} = useMutation(updateOrderStatus, {
    onSuccess:(data, variables, context)=> {
      console.log({
        data:data.data.data,
        variables,
        context,
      })
      router.reload();
    },
    onError: (error, variables, context) =>{
        console.log({error})
    },
})
  const onReady = ()=>{
    const details = {
      orderDetail:{
        "orderId":order._id,
        "tableId":order.table._id, 
        "status":"PREPARED"
      },
      token:userDetails.jwtToken
    }
    mutate(details);
  }
  return (
    <Grid item direction="column" sx={{ display: "grid" }}>
      <Paper>
        <Paper elevation={0} variant="free" sx={{ p: 2, minWidth: "20rem" }}>
          <Stack direction="row" justifyContent="center" alignItems="center">
            <Stack direction="column">
              <Typography variant="h4" fontWeight={600} color="white">
                {order?.table?.TableName}
              </Typography>
              <Typography variant="button" color={"white"}>
                {
                  moment.utc(order?.updatedAt).local().startOf('seconds').fromNow()
                }
              </Typography>
            </Stack>
            <Button
              variant="contained"
              color="inherit"
              sx={{
                ml: "auto",
                backgroundColor: "#fff !important",
                color: "#000 !important",
              }}
              onClick={onReady}
            >
              Ready
            </Button>
          </Stack>
        </Paper>
        <Paper elevation={0}>
          {/*  */}

          {order?.order?.map((menuData, idn) => {
              return <OrderItems menuData={menuData} key={idn}/>;
            })}
            <Stack sx={{
              width:"100%"
            }}>
              {
                order?.specialInstruction && <Divider flexItem><Typography variant="body2">{order?.specialInstruction}</Typography></Divider>

              }
            </Stack>
        </Paper>
      </Paper>
    </Grid>
  );
};
export const CompleteOrders = () => {
  return (
    <Grid item direction="column" sx={{ display: "grid" }}>
      <Paper>
        <Paper elevation={0} variant="free" sx={{ p: 2, minWidth: "20rem" }}>
          <Stack direction="row" justifyContent="center" alignItems="center">
            <Typography variant="h4" fontWeight={600} color="white">
              Table Number
            </Typography>
            <Button
              variant="contained"
              color="inherit"
              sx={{
                ml: "auto",
                backgroundColor: "#fff !important",
                color: "#000 !important",
              }}
            >
              Done
            </Button>
          </Stack>
        </Paper>
        <Paper elevation={0}>
          <Typography>Construction in Progress</Typography>
        </Paper>
      </Paper>
    </Grid>
  );
};
