import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { flexBox, size } from "theme/defaultFunction";
import CheckoutItem from "./CheckoutItem";
import { Router, useRouter } from "next/router";
import { CloseOutlined } from "@mui/icons-material";
import BasicModal from "common/modalGenerator/Modal";
import CheckoutModal from "./CheckoutModal";
import { userestaurantStore } from "store/restaurant/restaurantStore";
import { ORDERTYPE } from "store/constants/ordertype";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "store/api/axiosSetup";
import { useUserStore } from "store/user/userzustandstore";
import { useorderStore } from "store/order/orderStore";

const Checkout = ({
  setOpen = () => {},
  oldOrderId,
  val,
  setValue,
  variableip,
  tableId,
}) => {
  const router = useRouter();
  const [instrData, setInstrData] = useState({
    specialInstruction: "",
    orderType: ORDERTYPE.DINEIN,
  });
  const restaurant = userestaurantStore((state) => state.restaurant);
  const user = useUserStore((state) => state.user);
  const { order, setOrder } = useorderStore((state) => state);
  const [openAD, setOpenAD] = useState(false);
  const { mutate, isLoading } = useMutation(createOrder, {
    onSuccess: (data, variables, context) => {
      console.log({
        data: data.data.data,
        variables,
        context,
      });
      setOrder(data?.data?.data?.orderStatus);
      if (data?.data?.data?.orderStatus && data?.data?.data?.orderStatus?._id) {
        if (data?.data?.data?.orderStatus?.orderStatus == "BILLING") {
          router.push(
            `/restaurant/table/bill?tableId=${data?.data?.data?.tableStatus?._id}&orderId=${data?.data?.data?.orderStatus?._id}`
          );
        } else {
          router.push(
            `/restaurant/table/order?orderId=${data?.data?.data?.orderStatus?._id}`
          );
        }
      }
    },
    onError: (error, variables, context) => {
      console.log({ error });
    },
  });
  const onClickKOT = (e, billing = false) => {
    e.preventDefault();
    val.map((orderVal) => {
      orderVal.menuId = orderVal.item._id;
      return orderVal;
    });
    let orderDetail = {
      order: val,
      orderType: instrData.orderType,
      specialInstruction: instrData.specialInstruction,
      restaurantId: restaurant?.restaurantInfo?._id,
      tableId: tableId,
      oldOrderId,
      billing,
      timeCreated: new Date().valueOf(),
    };
    console.log({
      token: user?.jwtToken,
      orderDetail,
      billing,
    });
    mutate({
      token: user?.jwtToken,
      orderDetail,
    });
  };

  return (
    <Stack
      p={{
        xs: 0,
        sm: 0,
        md: 2,
      }}
      sx={{
        ...size("100%", "100%"),
      }}
    >
      <Stack
        sx={{
          ...flexBox("row", "space-between"),
          py: 1,
        }}
      >
        <Typography variant="h3">Checkout Items</Typography>
        <IconButton
          sx={{
            display: {
              xs: "inline-block",
              md: "none",
            },
          }}
          onClick={() => {
            setOpen(false);
          }}
        >
          <CloseOutlined />
        </IconButton>
      </Stack>
      <Stack
        sx={{
          overflowY: "auto",
          py: 2,
          overflowX: "hidden",
          gap: 1,
          px: 2,
        }}
      >
        {val?.map((orderValue, key) => {
          if (!val[key].isComplimentary || val[key].complimentary.length == 0) {
            // this is if already the compliment structure is not there. then create new.
            val[key].isComplimentary = false;
            val[key].complimentary = [];
            for (let i = 1; i <= orderValue.quantity; i++) {
              val[key].complimentary.push({ id: i, isComplimentary: false });
            }
          } else if (val[key].complimentary.length != val[key].quantity) {
            for (
              let i = val[key].complimentary.length;
              i <= orderValue.quantity;
              i++
            ) {
              val[key].complimentary.push({
                id: i + 1,
                isComplimentary: false,
              });
            }
          }

          return (
            <CheckoutItem
              key={key}
              val={val}
              index={key}
              setValue={setValue}
              orderValue={orderValue}
              variableip={variableip}
            />
          );
        })}
      </Stack>
      <Stack>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Stack sx={{ flex: 1 }}>
            {[
              {
                title: "Order Type",
                value: ORDERTYPE.DINEIN,
                options: [
                  {
                    title: ORDERTYPE.CUSTOMIZED,
                    value: ORDERTYPE.CUSTOMIZED,
                  },
                  {
                    title: ORDERTYPE.DELIVERY,
                    value: ORDERTYPE.DELIVERY,
                  },
                  {
                    title: ORDERTYPE.DINEIN,
                    value: ORDERTYPE.DINEIN,
                  },
                  {
                    title: ORDERTYPE.ONLINE,
                    value: ORDERTYPE.ONLINE,
                  },
                  {
                    title: ORDERTYPE.TAKEAWAY,
                    value: ORDERTYPE.TAKEAWAY,
                  },
                ],
                type: "select",
              },
            ].map((idet, key) =>
              idet.type == "select" ? (
                <FormControl
                  key={key}
                  variant="filled"
                  sx={{ my: 1, mx: 2, minWidth: 120 }}
                  disabled={isLoading}
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    {idet.title}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    key={key}
                    value={instrData.orderType}
                    label={idet.title}
                    onChange={(event: SelectChangeEvent) => {
                      setInstrData({
                        ...instrData,
                        orderType: event.target.value,
                      });
                    }}
                  >
                    {idet?.options.map((opt, id) => (
                      <MenuItem key={id} value={opt.value}>
                        {opt.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <></>
              )
            )}
          </Stack>

          <Button
            variant="outlined"
            onClick={() => {
              if (val.length > 0) {
                setOpenAD(true);
              }
              // router.push("/restaurant/table/order")
            }}
            disabled={isLoading}
          >
            Add Instructions
          </Button>
        </Stack>
        <Stack
          direction={{
            xs: "row",
            md: "column",
            lg: "row",
          }}
          sx={{
            justifyContent: "space-between",
            p: 1,
            gap: 1,
          }}
        >
          <Button
            variant="outlined"
            color={"error"}
            onClick={() => {
              setValue([]);
              setOpen(false);
            }}
            disabled={val.length <= 0 || isLoading}
          >
            Remove All
          </Button>
          <Button
            variant="contained"
            onClick={(e) => onClickKOT(e, true)}
            disabled={val.length <= 0 || isLoading}
            sx={{}}
          >
            {isLoading ? <CircularProgress /> : "Generate Bill "}
          </Button>
          <Button
            variant="contained"
            sx={{}}
            onClick={(e) => onClickKOT(e)}
            disabled={val.length <= 0 || isLoading}
          >
            {isLoading ? <CircularProgress /> : "KOT"}
          </Button>
        </Stack>
      </Stack>
      <BasicModal open={openAD} setOpen={setOpenAD} title={"Add Instructions"}>
        <CheckoutModal
          isLoading={isLoading}
          instrData={instrData}
          onClickKOT={onClickKOT}
          setInstrData={setInstrData}
        />
      </BasicModal>
    </Stack>
  );
};

export default Checkout;
