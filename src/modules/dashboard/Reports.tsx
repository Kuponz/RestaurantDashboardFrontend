import {
  Button,
  Paper,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  CircularProgress,
} from "@mui/material";
import React, { useRef, useState } from "react";
import dayjs from "dayjs";
import PrintIcon from "@mui/icons-material/Print";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import type { Dayjs } from "dayjs";
import type { SelectChangeEvent } from "@mui/material";
import { userestaurantStore } from "store/restaurant/restaurantStore";
import { useUserStore } from "store/user/userzustandstore";
import { getOrderDiscount, getOrderReport } from "store/api/axiosSetup";
import { useMutation } from "@tanstack/react-query";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import PrintReport from "./PrintReport";
import VisibilityIcon from "@mui/icons-material/Visibility";

const reportList = [
  { name: "Bill Summary" },
  { name: "Expense Detail" },
  { name: "Counter Cashier" },
  { name: "Discounts" },
];

const Reports = () => {
  const restaurant = userestaurantStore((state) => state.restaurant);
  const user = useUserStore((state) => state.user);
  const componentRef = useRef(null);
  const [printData, SetprintData] = useState(null);
  const [Report, setReport] = useState("");
  const [value, setValue] = React.useState({
    startDate: dayjs().subtract(7, "day"),
    endDate: dayjs(),
    restaurantId: restaurant.restaurantInfo._id,
    headerAuth: user.jwtToken,
  });

  const printDoc = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: Report,
    removeAfterPrint: true,
  });

  const handleChange = (e: SelectChangeEvent) => {
    SetprintData(null);
    setReport(e.target.value);
  };

  const handleDateChange = (newValue: Dayjs | null, name: string) => {
    SetprintData(null);
    setValue({
      ...value,
      [name]: newValue,
    });
  };

  const getOrderData = useMutation(getOrderReport, {
    onSuccess: ({ data }) => {
      SetprintData(data.data);
      console.log(data.data.report);
      
    },
  });

  const getDiscountData = useMutation(getOrderDiscount, {
    onSuccess: ({ data }) => {
      SetprintData(data.data);
      console.log(data.data.report);
      
    },
  });

  const handleSubmit = () => {
    // SetprintData(null);
    const params = {
      startDate: value.startDate.format("MM/DD/YYYY"),
      endDate: value.endDate.format("MM/DD/YYYY"),
      headerAuth: value.headerAuth,
      restaurantId: value.restaurantId,
    };

    if (Report === "Bill Summary") {
      getOrderData.mutate(params);
      // if (printData) {
      //   // PrintSomething
      //   printDoc();
      // }
    }
    if (Report === "Discounts") {
      getDiscountData.mutate(params);
      // if (printData) {
      //   // PrintSomething
      //   printDoc();
      // }
    }
  };
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack direction={{ md: "row", xs: "column" }} gap={3} mt={2}>
          <FormControl sx={{ flex: 0.5 }}>
            <InputLabel>Type</InputLabel>
            <Select label="Report Type" value={Report} onChange={handleChange}>
              {reportList.map((e, i) => (
                <MenuItem key={i} value={e.name}>
                  {e.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Stack direction={"row"} gap={1} sx={{ "&>div": { flex: 1 } }}>
            <MobileDatePicker
              label="Start Date"
              inputFormat="MM/DD/YYYY"
              value={value.startDate}
              onChange={(newValue) => handleDateChange(newValue, "startDate")}
              renderInput={(params) => <TextField {...params} />}
            />
            <MobileDatePicker
              label="End Date"
              inputFormat="MM/DD/YYYY"
              value={value.endDate}
              onChange={(newValue) => handleDateChange(newValue, "endDate")}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
          <Button
            sx={{ p: "1rem 2rem" }}
            variant="contained"
            disabled={
              Report === "" ||
              Report === "Expense Detail" ||
              Report === "Counter Cashier" ||
              getOrderData.isLoading ||
              getDiscountData.isLoading ||
              printData
                ? true
                : false
            }
            startIcon={
              getOrderData.isLoading || getDiscountData.isLoading ? (
                <CircularProgress color="inherit" size={18} />
              ) : (
                <VisibilityIcon />
              )
            }
            onClick={handleSubmit}
          >
            View
          </Button>
          {printData ? (
            <Button
              sx={{ p: "1rem 2rem" }}
              variant="contained"
              startIcon={<PrintIcon />}
              onClick={printDoc}
            >
              Print
            </Button>
          ) : null}
          {/* <Button
            sx={{ p: "1rem 2rem" }}
            variant="contained"
            disabled={
              Report === "" ||
              Report === "Expense Detail" ||
              Report === "Counter Cashier" ||
              getOrderData.isLoading ||
              getDiscountData.isLoading
            }
            startIcon={
              getOrderData.isLoading || getDiscountData.isLoading ? (
                <CircularProgress color="inherit" size={18} />
              ) : (
                <PrintIcon />
              )
            }
            onClick={handleSubmit}
          >
            Print
          </Button> */}
        </Stack>
      </LocalizationProvider>
      <PrintReport
        printData={printData}
        componentRef={componentRef}
        Report={Report}
        restroData={restaurant}
        duration={value}
      />
    </>
  );
};

export default Reports;
