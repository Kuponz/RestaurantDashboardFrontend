import Head from "next/head";
import { Waiter } from "modules/table";
import HomeStructure from "modules/home/HomeStructure";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { CompleteOrders, OrderContainer } from "modules/orders/OrderContainer";
import { useState } from "react";
import { flexBox } from "theme/defaultFunction";

export default function orders() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>etoPOS</title>
        <meta
          name="description"
          content="India's first paperless and Innovative POS with minimum investments and Maximum returns"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <div> */}
      <HomeStructure>
          <Typography variant="h2">Stay Tuned</Typography>
          <Typography variant="body2">Construction in Progress!</Typography>
          <Stack direction={"column"} sx={{
              py:5,

          }}>
              <Typography pb={3}>Meanwhile You can Book Table: </Typography>
              <Button variant={"outlined"} onClick={()=>{
                  router.push("/restaurant/table")
              }} sx={{...flexBox(), gap:1}}>Book Tables <EastOutlinedIcon/></Button>
          </Stack>

      </HomeStructure>
      {/* </div> */}
    </>
  );
}
