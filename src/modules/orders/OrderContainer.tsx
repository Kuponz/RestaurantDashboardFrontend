import React from "react";
import { Paper, Stack, Grid, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { OrderItems } from "modules/orders/OrderItems";

export const OrderContainer = () => {
  return (
    <Grid item direction="column" sx={{ display: "grid" }}>
      <Paper>
        <Paper elevation={0} variant="free" sx={{ p: 2, minWidth: "20rem" }}>
          <Stack direction="row" justifyContent="center" alignItems="center">
            <Stack direction="column">
              <Typography variant="h4" fontWeight={600} color="white">
                Table Number
              </Typography>
              <Typography variant="button" color={"white"}>
                Time
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
              Status
            </Button>
          </Stack>
        </Paper>
        <Paper elevation={0}>
          {/*  */}

          {"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum, quas!"
            .split(" ")
            .map(() => {
              return <OrderItems />;
            })}
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
          {"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum, quas!"
            .split(" ")
            .map(() => {
              return <OrderItems />;
            })}
        </Paper>
      </Paper>
    </Grid>
  );
};
