import { Button, Stack, Typography } from "@mui/material";
import BasicModal from "common/modalGenerator/Modal";
import React, { useState } from "react";
import { userestaurantStore } from "store/restaurant/restaurantStore";
import PaymentModal from "./orders/PaymentModal";
import { useMutation } from "@tanstack/react-query";
import { completeOrderStatus } from "store/api/axiosSetup";
import { useRouter } from "next/router";
import { useUserStore } from "store/user/userzustandstore";
import DiscountIcon from "@mui/icons-material/Discount";
import PaymentsIcon from "@mui/icons-material/Payments";

const SumValue = ({ order, applyDiscount, setApplyDiscount }) => {
  const [open, setOpen] = useState(false);
  const restaurant = userestaurantStore((state) => state.restaurant);
  const [paymentDetails, settlePaymentDetails] = useState({});
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const { mutate, isLoading } = useMutation(completeOrderStatus, {
    onSuccess: (data, variables, context) => {
      console.log({
        data: data.data.data,
        variables,
        context,
      });
      setOpen(false);
      router.push("/restaurant/table");
    },
  });

  console.log(paymentDetails);
  const settlePayment = () => {
    const paymentD = {
      paymentDetails,
      tableId: order?.details?.table,
      orderId: order?.details?._id,
      token: user?.jwtToken,
    };
    console.log(paymentD);
    mutate(paymentD);
  };
  return (
    <Stack p={1} height={"100%"}>
      {Object?.keys(order?.details?.orderAmount || {})?.map((data, index) => {
        if (data == "orderBeforeAddingGSTValue") {
          return null;
        }
        // console.log(order?.details?.orderAmount.discount != 0)
        return data == "discount" ? (
          order?.details?.orderAmount.discount != 0 ? (
            <Stack
              direction={"row"}
              key={index}
              justifyContent={"space-between"}
              alignItems={"center"}
              py={1}
            >
              {/* {console.log({call:callfortitle(data), data})} */}
              <Typography variant="h5">{callfortitle(data)}</Typography>
              <Stack direction={"row"}>
                <span>- ₹</span>
                <Typography variant="h5">
                  {order?.details?.orderAmount[data]}
                </Typography>
              </Stack>
            </Stack>
          ) : (
            <></>
          )
        ) : data == "finalTotal" ? (
          <></>
        ) : (
          <Stack
            direction={"row"}
            key={index}
            justifyContent={"space-between"}
            alignItems={"center"}
            py={1}
          >
            {/* {console.log({call:callfortitle(data), data})} */}
            <Typography variant="h5">{callfortitle(data)}</Typography>
            <Stack direction={"row"}>
              {(data == "total" ||
                data == "orderGst" ||
                data == "orderExcludeGSTValue" ||
                data == "orderBeforeAddingGSTValue") && <span>₹</span>}
              <Typography variant="h5">
                {data == "orderExcludeGSTValue" ||
                data == "orderBeforeAddingGSTValue"
                  ? order?.details?.orderAmount[data] +
                    order?.details?.orderAmount["orderBeforeAddingGSTValue"]
                  : order?.details?.orderAmount[data]}
              </Typography>
            </Stack>
          </Stack>
        );
      })}
      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        sx={{
          width: "100%",
          justifyContent: "center",
          px: 2,
          gap: 1,
        }}
      >
        {/* {(user.role == "OWNER" || user.role == "CAPTAIN")&&<Button variant='outlined' startIcon={<DiscountIcon/>} onClick={()=>setApplyDiscount({...applyDiscount,open:true})}>Apply Discount</Button>} */}
        <Button
          variant="outlined"
          startIcon={<DiscountIcon />}
          onClick={() => setApplyDiscount({ ...applyDiscount, open: true })}
        >
          Apply Discount
        </Button>
        <Button
          variant="outlined"
          startIcon={<PaymentsIcon />}
          onClick={() => setOpen(true)}
        >
          Collect Payment
        </Button>
      </Stack>
      <BasicModal open={open} setOpen={setOpen} title={"Payment"}>
        <PaymentModal
          isLoading={isLoading}
          settlePayment={settlePayment}
          order={order.details}
          paymentDetails={paymentDetails}
          settlePaymentDetails={settlePaymentDetails}
        />
      </BasicModal>
    </Stack>
  );
};
export const callfortitle = (val: String) => {
  let title = "";
  switch (val) {
    case "discount":
      title = "Discount";
      break;
    case "totalItem":
      title = "Total Items";
      break;
    case "orderGst":
      title = "GST";
      break;
    case "orderBeforeAddingGSTValue":
      title = "Order Value";
      break;
    case "orderExcludeGSTValue":
      title = "Order value";
      break;
    case "total":
      title = "Total";
      break;
    default:
      break;
  }
  return title;
};

export default SumValue;
