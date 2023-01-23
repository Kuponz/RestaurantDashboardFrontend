import React from "react";
import { Paper, Stack, Grid, Button, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import { OrderItems } from "modules/orders/OrderItems";
import moment, {} from "moment"
export const OrderContainer = ({order}) => {
  console.log({order})
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
            {
              order?.specialInstruction && <Divider>Instructions: {order?.specialInstruction}</Divider>

            }
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
