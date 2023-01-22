import Head from "next/head";
import { Waiter } from "modules/table";
import HomeStructure from "modules/home/HomeStructure";
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import { Button, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { flexBox, size } from "theme/defaultFunction";
import { useRouter } from "next/router";
import { CompleteOrders, OrderContainer } from "modules/orders/OrderContainer";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRestaurantById } from "store/api/axiosSetup";
import { useUserStore } from "store/user/userzustandstore";
import { userestaurantStore } from "store/restaurant/restaurantStore";

export default function Home() {
  const router = useRouter();
  const [Selection, setSelection] = useState(true);
  const userDetails = useUserStore(state=>state.user);
  const setRestaurantDetails = userestaurantStore(state=>state.setRestaurantDetails);
  const { isLoading, isError, data, error } = useQuery(
    {
      queryKey:['getRestaurantById'], 
      queryFn:()=>getRestaurantById(userDetails?.jwtToken, userDetails?.restaurantLinked),
      onSuccess:(data)=>{
          console.log({data:data?.data?.data})
          console.log(userDetails)
          setRestaurantDetails(data?.data?.data?.restaurantInfo)
      }
  })
  if(isLoading){
    return (
        <Stack sx={{...flexBox(), ...size("100vh", "100vw")}}>
            <CircularProgress />
        </Stack>
    )
  }
  if(userDetails?.role == "WAITER" ){
    return (
      <Stack sx={{...flexBox(), ...size("100vh", "100vw")}}>
          <Button onClick={()=>{router.push("/restaurant/table")}}>Book Table</Button>
      </Stack>
  )
  }
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
      <div>
        {/* Auth Stuff Here */}
        {/* <Waiter /> */}
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
      </div>
    </>
  );
}

