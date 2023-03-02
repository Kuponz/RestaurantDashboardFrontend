import { Button, CircularProgress, Paper, Stack, TextField, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Orders from "../orders/Orders";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CreateIcon from "@mui/icons-material/Create";
import { redDeleteStyle } from "common/styles/deleteStyle";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ClearIcon from "@mui/icons-material/Clear";
import PrintIcon from '@mui/icons-material/Print';
import { flexBox } from "theme/defaultFunction";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { updateOrderStatus } from "store/api/axiosSetup";
import { useUserStore } from "store/user/userzustandstore";
import { Printer, render } from "react-thermal-printer";
import BasicModal from "common/modalGenerator/Modal";
import { useReactToPrint } from "react-to-print";
import TablePrint from "./TablePrint";
import CancelModal from "./CancelModal";
import moment from "moment";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import KotModal from "modules/orders/kot/kotModal";
import LocalSnackBar from "./components/snackBar";
import TopBar from "common/topBar/TopBar";

const KotCheckout = ({ order }) => {
  const router = useRouter();
  const [openCancel, setOpenCancel] = useState({
    open: false,
    reason: "",
    orderId: order?.details?._id,
    tableId: order?.details?.table?._id,
  });

  const [swapOpen, setSwapOpen] = useState(false);
  const   [count, setCount] = useState(moment(new Date()));
  const user = useUserStore((state) => state.user);
  const { mutate, isLoading } = useMutation(updateOrderStatus, {
    onSuccess: (data, variables, context) => {
      console.log({
        data: data.data.data,
        variables,
        context,
      });
      router.push(
        `/restaurant/table/bill?tableId=${data?.data?.data?.table._id}&orderId=${data?.data?.data?.orderStatus?._id}`
      );
    },
    onError: (error, variables, context) => {
      console.log({ error });
    },
  });
  let componentRef = useRef(null);
  const handlePrintPart2 = useReactToPrint({
    content: () => componentRef.current,
  });
  console.log({
    order
  })
  const timeDiff = (createdAt) => {
    var now = moment(new Date()); //todays date
    var end = moment(createdAt); // another date
    var duration = moment.duration(now.diff(end));
    // console.log({
    //   now,
    //   end,
    //   duration,
    // });
    var days = moment.utc(duration.asMilliseconds()).format("HH:mm:ss");
    // console.log(moment(duration).hour(), moment(duration).minutes(), moment(duration).second())
    return days;
  };
  const handlePrint = async () => {
    const data = await render(
      <Printer type="epson">
        <TablePrint componentRef={componentRef} order={order?.details} />
      </Printer>
    );
    handlePrintPart2();
  };
  const handleSwap = () => {
    setSwapOpen(true);
  };
  useEffect(() => {
    const timer = setTimeout(() => setCount(timeDiff(order?.details?.createdAt)), 1e3)
    return () => clearTimeout(timer)
   })
  return (
    <Stack
      sx={{
        height: "100%",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Stack>
        <TopBar title={"KOT Order"} backUrl="/restaurant/table" home={false}>
          <Stack
            justifyContent={"space-between"}
            direction={"row"}
            alignItems={"center"}
          >
            <Stack
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ px: 1 }}>Time(HH:MM:SS): </Typography>
              <Typography>
                {String(count)}{" "}
              </Typography>
            </Stack>
            <Tooltip title="Print KOT">
              <Button
                variant="outlined"
                sx={{
                  m: 1,
                }}
                startIcon={<PrintIcon/>}
                onClick={handlePrint}
              >
                KOT
              </Button>

            </Tooltip>
          </Stack>
        </TopBar>
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
          gap={1}
          p={1}
        >
          <Button
            variant="outlined"
            startIcon={<SwapVertIcon />}
            onClick={handleSwap}
            disabled={isLoading}
          >
            Swap Tables
          </Button>
          <Button
            variant="outlined"
            disabled={isLoading}
            onClick={() => {
              router.push(
                `/restaurant/table/menu?edit=${true}&table=${
                  order?.details?.table._id
                }`
              );
            }}
            sx={{ ...flexBox() }}
          >
            <CreateIcon /> Update Order
          </Button>
        </Stack>
      </Stack>
      <Stack sx={{
        height:"100%",
        overflowY:"auto"
      }}>
        <Orders order={order?.details} />
      </Stack>
      <Paper elevation={0} variant="free" sx={{ p: 2, minWidth: "clamp(15rem,80vw,30rem)" }}>
        <Stack sx={{...flexBox("row", "space-between")}}>
          {user?.role == "OWNER" || user?.role == "CAPTAIN" ? 
          <Button
            sx={redDeleteStyle}
            disabled={isLoading}
            onClick={() => {
              setOpenCancel({
                ...openCancel,
                orderId: order?.details?._id,
                tableId: order?.details?.table?._id,
                open: true,
              });
            }}
          >
            <ClearIcon /> Cancel
          </Button>
          :
          <></>
          }

          <Button
            variant="contained"
            color="inherit"
            sx={{
              ml: "auto",
              backgroundColor: "#fff !important",
              color: "#000 !important",
            }}
            disabled={isLoading}
            onClick={() => {
              let onjForOrder = {
                orderDetail: {
                  orderId: order?.details?._id,
                  tableId: order?.details?.table?._id,
                  status: "BILLING",
                },
                token: user?.jwtToken,
              };
              console.log(onjForOrder);
              mutate(onjForOrder);
            }}
            startIcon={<ReceiptIcon />}
          >
            {isLoading?<CircularProgress/>:"Generate Bill "}
          </Button>
        </Stack>
      </Paper>
      <div style={{ display: "none" }}>
        <TablePrint componentRef={componentRef} order={order?.details} />
      </div>
      <BasicModal
        title="Cancel Order"
        open={openCancel?.open}
        setOpen={(callto: boolean) => {
          setOpenCancel({ ...openCancel, open: callto });
        }}
      >
        <CancelModal
          user={user}
          openCancel={openCancel}
          setOpenCancel={setOpenCancel}
        />
      </BasicModal>
      <KotModal data={order} open={swapOpen} setOpen={setSwapOpen} />
    </Stack>
  );
};

export default KotCheckout;
