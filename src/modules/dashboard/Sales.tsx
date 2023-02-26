import {
  Button,
  Paper,
  Typography,
  CircularProgress,
  Box,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FiltersSales from "./FiltersSales";
import { userestaurantStore } from "store/restaurant/restaurantStore";
import { useUserStore } from "store/user/userzustandstore";
import { useMutation } from "@tanstack/react-query";
import { getdashboardHistory, getorderHistory } from "store/api/axiosSetup";
import dayjs from "dayjs";
import TopBar from "common/topBar/TopBar";
import SalesBox from "./SalesBox";
import Payment from "./Payment";
import HomeStructure from "modules/home/HomeStructure";
import { flexBox, size } from "theme/defaultFunction";
import { CloseOutlined } from "@mui/icons-material";

type Tfilter = {
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  restaurantId: string;
  headerAuth: string;
  valueHeader: string;
};
const Sales = () => {
  const [open, setOpen] = useState({
    work: false,
    forWork: "",
  });
  const restaurant = userestaurantStore((state) => state.restaurant);
  const user = useUserStore((state) => state.user);
  const [orders, setOrder] = useState({});
  const [value, setValue] = React.useState<Tfilter>({
    startDate: dayjs(),
    endDate: dayjs(),
    restaurantId: restaurant.restaurantInfo._id,
    headerAuth: user.jwtToken,
    valueHeader: "TodaySales",
  });
  const [watchOrder, setWatchOrder] = useState({});
  const { mutate, isLoading } = useMutation(getdashboardHistory, {
    onSuccess: (state) => {
      console.log(state.data.data);
      setValue({ ...value });
      setOrder(state.data.data);
    },
  });
  useEffect(() => {
    mutate(value);
  }, []);
  console.log({ orders });
  return (
    <>
      <HomeStructure>
        {
          user.role == "OWNER" ?
          <Stack
            sx={{
              height: "100vh",
              width: "100%",
              pt: 4,
              pr: 0,
              pl: 1,
            }}
          >
            <TopBar backUrl={"/"} home={true} title={""}>
              <Stack
                sx={{
                  ...flexBox("row", "flex-end"),
                }}
              >
                <ToggleButtonGroup
                  color="primary"
                  aria-label="Platform"
                  value={value.valueHeader}
                  disabled={isLoading}
                  onChange={(e) => {
                    console.log({ e: e.target.value });
                    let changeValue = e.target.value;
                    value.endDate = dayjs();
                    if (
                      changeValue == "TodaySales" &&
                      changeValue != value.valueHeader
                    ) {
                      value.startDate = dayjs();
                      value.valueHeader = changeValue;
                      console.log({ value });
                      setValue({ ...value });
                      mutate(value);
                    } else if (
                      changeValue == "WeeklySales" &&
                      changeValue != value.valueHeader
                    ) {
                      value.startDate = dayjs().subtract(7, "days");
                      value.valueHeader = changeValue;
                      console.log({ value });
                      setValue({ ...value });
                      mutate(value);
                    } else if (
                      changeValue == "MonthlySales" &&
                      changeValue != value.valueHeader
                    ) {
                      value.startDate = dayjs().subtract(1, "month");
                      console.log({ value });
                      value.valueHeader = changeValue;
                      setValue({ ...value });
                      mutate(value);
                    }
                  }}
                >
                  <ToggleButton value="TodaySales">Today</ToggleButton>
                  <ToggleButton value="WeeklySales">Weekly</ToggleButton>
                  <ToggleButton value="MonthlySales">Monthly</ToggleButton>
                </ToggleButtonGroup>
                <FiltersSales
                  mutate={mutate}
                  isLoading={isLoading}
                  restaurant={restaurant}
                  user={user}
                  setValue={setValue}
                  value={value}
                />
              </Stack>
            </TopBar>
            {isLoading ? (
              <Stack
                sx={{
                  ...size("100%", "100%"),
                  ...flexBox(),
                }}
              >
                <CircularProgress />
              </Stack>
            ) : (
              <Stack sx={{ overflowY:"auto",overflowX: "hidden", height:"100%", width:"100%" }}>
                <Stack
                  sx={{
                    p: 1,
                    pb: 3,
                    pt: 5,

                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                    gap: 1,
                  }}
                >
                  <SalesBox
                    setOpen={setOpen}
                    title="Total Earning"
                    name={"totalPayment"}
                    orders={`₹ ${orders?.totalPayment?.total}`}
                  />
                  <SalesBox
                    setOpen={setOpen}
                    title="Total Completed Orders"
                    name={"totalOrders"}
                    orders={orders?.totalOrders?.completedOrders}
                  />
                </Stack>
                <Stack sx={{
                  p:1,
                  pb:10
                }}>
                  {open.work && (
                      <Stack
                      sx={{
                          p: 1,
                          overflow: "hidden",
                      }}
                      >
                      <Stack
                          sx={{
                          flexDirection: "row",
                          justifyContent: "flex-end",
                          }}
                      >
                          <IconButton
                          onClick={() => {
                              setOpen({
                              work: false,
                              forWork: "",
                              });
                          }}
                          >
                          <CloseOutlined />
                          </IconButton>
                      </Stack>
                      {open.forWork == "totalPayment" ?
                      <Stack
                          sx={{
                          p: 1,
                          pb: 3,
                          pt: 0,
                          flexDirection: "row",
                          flexWrap: "wrap",
                          justifyContent: "flex-start",
                          gap: 2,
                          }}
                      >
                          <Payment title="UPI Payment" isRupee={true} payment={orders?.totalPayment?.UPI} />
                          <Payment title="Cash Payment" isRupee={true} payment={orders?.totalPayment?.CASH} />
                          <Payment title="Card Paymment" isRupee={true} payment={orders?.totalPayment?.CARD} />
                          <Payment title="OTHERS " isRupee={true} payment={orders?.totalPayment?.OTHERS} />
                      </Stack>
                      :
                      <Stack
                          sx={{
                          p: 1,
                          pb: 3,
                          pt: 0,
                          flexDirection: "row",
                          flexWrap: "wrap",
                          justifyContent: "flex-start",
                          gap: 2,
                          }}
                      >
                          <Payment title="Complete Orders" payment={orders?.totalOrders?.completedOrders} />
                          <Payment title="Cancelled Orders" payment={orders?.totalOrders?.cancelledOrders} />
                          <Payment title="Currently Running" payment={orders?.totalOrders?.orderCurrentlyRunning} />
                      </Stack>
                      }
                      </Stack>
                  )}
                  </Stack>
              </Stack>
            )}
          </Stack>
          :
          <Stack>
            <Typography>Not Authorized</Typography>
          </Stack>
        }
      </HomeStructure>
    </>
  );
};
export default Sales;
