import Head from "next/head";
import { Waiter } from "modules/table";
import HomeStructure from "modules/home/HomeStructure";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { CompleteOrders, OrderContainer } from "modules/orders/OrderContainer";
import { useState } from "react";
import { flexBox } from "theme/defaultFunction";
import OrderIndex from "modules/prevOrders/OrderIndex";

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
        <OrderIndex/>
      </HomeStructure>
      {/* </div> */}
    </>
  );
}
