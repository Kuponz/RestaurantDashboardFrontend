import Head from "next/head";
import { Waiter } from "modules/table";
import HomeStructure from "modules/home/HomeStructure";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import {
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { flexBox, size } from "theme/defaultFunction";
import { useRouter } from "next/router";
import { CompleteOrders, OrderContainer } from "modules/orders/OrderContainer";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRestaurantById } from "store/api/axiosSetup";
import { useUserStore } from "store/user/userzustandstore";
import { userestaurantStore } from "store/restaurant/restaurantStore";
import IndexHome from "modules/home/IndexHome";

export default function Home() {
  const router = useRouter();
  const [Selection, setSelection] = useState(true);
  const userDetails = useUserStore((state) => state.user);
  const setRestaurantDetails = userestaurantStore(
    (state) => state.setRestaurantDetails
  );
  console.log({
    userDetails,
  });
  const { isLoading, isError, data, error } = useQuery({
    enabled: !!userDetails,
    queryKey: ["getRestaurantById"],
    queryFn: () =>
      getRestaurantById(userDetails?.jwtToken, userDetails?.restaurantLinked),
    onSuccess: (data) => {
      console.log({ data: data?.data?.data });
      console.log(userDetails);
      setRestaurantDetails(data?.data?.data?.restaurantInfo);
    },
    onerror: (data) => {
      console.log({ data });
    },
  });
  if (isLoading) {
    return (
      <Stack sx={{ ...flexBox(), ...size("100vh", "100vw") }}>
        <CircularProgress />
      </Stack>
    );
  }
  if (userDetails?.role == "WAITER") {
    return (
      <Stack sx={{ ...flexBox(), ...size("100vh", "100vw") }}>
        <Button
          onClick={() => {
            router.push("/restaurant/table");
          }}
        >
          Book Table
        </Button>
      </Stack>
    );
  }
  if (userDetails?.role == "CHEF") {
    return (
      <Stack sx={{ ...flexBox(), ...size("100vh", "100vw") }}>
        <Button
          onClick={() => {
            router.push("/restaurant/currentOrder");
          }}
        >
          Current Orders
        </Button>
      </Stack>
    );
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
        <HomeStructure>
          <Stack
            direction="column"
            // gap={2}
            sx={{
              width: "100%",
              height: "100vh",
              py: 3,
              px: 3,
              overflowX: "scroll",
              ...flexBox("column", "flex-start", "flex-start"),
            }}
          >
            <IndexHome />
          </Stack>
        </HomeStructure>
      </div>
    </>
  );
}

//   <Typography variant="h2">Welcome to etoPOS</Typography>
//   <Typography p={1} pb={3} variant="body2">Construction in Progress</Typography>
//   <Button variant="contained" onClick={()=>{router.push("/restaurant/table")}}>Book Table</Button>
