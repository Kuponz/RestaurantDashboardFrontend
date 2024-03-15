import Head from "next/head";
import { Waiter } from "modules/table";
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
import { RefreshOutlined } from "@mui/icons-material";
import dynamic from "next/dynamic";

const HomeStructure = dynamic(() => import("modules/home/HomeStructure"), {
  loading: () => <CircularProgress />,
});
const HomePage = dynamic(() => import("modules/homePage/HomePage"), {
  loading: () => <CircularProgress />,
});

export default function Home() {
  const router = useRouter();
  const [Selection, setSelection] = useState(true);
  const userDetails = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const setRestaurantDetails = userestaurantStore(
    (state) => state.setRestaurantDetails
  );
  console.log({
    userDetails,
  });
  const { isLoading, isError, data, error } = useQuery({
    enabled: !!(userDetails._id != "") ,
    queryKey: ["getRestaurantById"],
    queryFn: () =>
      getRestaurantById(userDetails?.jwtToken, userDetails?.restaurantLinked),
    onSuccess: (data) => {
      setRestaurantDetails(data?.data?.data?.restaurantInfo);
    },
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
    onerror: (data) => {
      console.log({ data });
    },
  });

  if (isError) {
    return (
      <Stack sx={{ ...flexBox("column"), ...size("100vh", "100vw"),gap:2 }}>
        <Typography>No network Detected!</Typography>
        <Button variant="outlined" onClick={async ()=>{
          logout();
        }}>Refresh <RefreshOutlined/></Button>
      </Stack>
    );
  }
  return (
    <>
      <Head>
        <title>etoPOS</title>
        <meta
          name="description"
          content="etoPOS.. India's first paperless and Innovative POS with minimum investments and Maximum returns"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        {userDetails?.login == false && userDetails?.jwtToken == ""?
        <div>
          <HomePage/>
        </div>
        :
          <div>
            <HomeStructure isLoading={isLoading} user={userDetails?.role}>
              {isLoading ? (
                <Stack sx={{ ...flexBox(), ...size("100vh", "100vw") }}>
                  <CircularProgress />
                </Stack>
              ) : (
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
              )}
            </HomeStructure>
          </div>
        }

      </body>
    </>
  );
}
