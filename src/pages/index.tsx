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
          sx={{ width: "100%", height: "100vh", py: 3, overflowX: "scroll", ...flexBox("column") }}
        >
          <Typography variant="h2">Welcome to etoPOS</Typography>
          <Typography p={1} pb={3} variant="body2">Construction in Progress</Typography>
          <Button variant="contained" onClick={()=>{router.push("/restaurant/table")}}>Book Table</Button>
          
        </Stack>
        </HomeStructure>
      </div>
    </>
  );
}

