import Head from "next/head";
import { Waiter } from "modules/table";
import HomeStructure from "modules/home/HomeStructure";
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import { Button, CircularProgress, Grid, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { flexBox, size } from "theme/defaultFunction";
import { useRouter } from "next/router";
import { CompleteOrders, OrderContainer } from "modules/orders/OrderContainer";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentOrderByRestaurantId, getRestaurantById } from "store/api/axiosSetup";
import { useUserStore } from "store/user/userzustandstore";
import { userestaurantStore } from "store/restaurant/restaurantStore";
import { useorderStore } from "store/order/orderStore";

export default function CurrentOrder() {
  const router = useRouter();
  const [Selection, setSelection] = useState(true);
  const userDetails = useUserStore(state=>state.user);
  const setRestaurantDetails = userestaurantStore(state=>state.setRestaurantDetails);
  const {order, setIncomingOrder} = useorderStore(state=>state);
  const [alignment, setAlignment] = useState('incomingOrders');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  const { isLoading, isError, data, error } = useQuery(
    {
      queryKey:['getCurrentOrder'], 
      queryFn:()=>getCurrentOrderByRestaurantId(userDetails?.jwtToken, userDetails?.restaurantLinked),
      onSuccess:(data)=>{
        console.log({data:data?.data?.data})
        console.log(userDetails)
        setIncomingOrder(data?.data?.data?.currentOrders)
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
            {/* <Button
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
            </Button> */}
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton value="incomingOrders">Incoming Orders</ToggleButton>
              <ToggleButton value="completedOrders">Completed Orders</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
          <Grid
            container
            p={1}
            justifyContent="center"
            spacing={{ xs: 2, md: 3 }}
          >
            {alignment == "incomingOrders"?
              order?.incomingOrders?.map(runningOrder=>(
                <OrderContainer key={runningOrder._id} order={runningOrder} />
                
              ))
            :
              <CompleteOrders />
            }
          </Grid>
        </Stack>
        </HomeStructure>
      </div>
    </>
  );
}

