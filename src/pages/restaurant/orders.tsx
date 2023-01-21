import Head from "next/head";
import { Waiter } from "modules/table";
import HomeStructure from "modules/home/HomeStructure";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { CompleteOrders, OrderContainer } from "modules/orders/OrderContainer";
import { useState } from "react";

export default function orders() {
  const router = useRouter();
  const [Selection, setSelection] = useState(true);
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
        <Stack
          direction="column"
          // gap={2}
          sx={{ width: "100%", height: "100vh", py: 3, overflowX: "scroll" }}
        >
          <Stack direction="row" justifyContent="center" spacing={5} p={2}>
            <Button
              onClick={() => {
                if (!Selection) {
                  setSelection(!Selection);
                }
              }}
              sx={{ p: 1 }}
              variant="contained"
            >
              Incoming Orders
            </Button>
            <Button
              onClick={() => {
                if (Selection) {
                  setSelection(!Selection);
                }
              }}
              sx={{ p: 1 }}
              variant="contained"
            >
              Completed Orders
            </Button>
          </Stack>

          {/* Component */}
          {/* <Stack p={1}> */}
          <Grid
            container
            p={1}
            justifyContent="center"
            spacing={{ xs: 2, md: 3 }}
          >
            {"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis officia voluptatibus doloribus sint possimus veniam. Dicta nesciunt minima rem eos, iusto mollitia ipsa facere optio aut earum beatae, iure maiores."
              .split(" ")
              .map(() => {
                if (Selection) {
                  return <OrderContainer />;
                } else {
                  return <CompleteOrders />;
                }
              })}
          </Grid>
          {/* </Stack> */}
        </Stack>
      </HomeStructure>
      {/* </div> */}
    </>
  );
}
