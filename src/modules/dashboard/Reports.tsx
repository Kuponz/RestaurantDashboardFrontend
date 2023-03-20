import {
  Button,
  Paper,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
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

const reportList = [
  { name: "Bill Summary" },
  { name: "Expense Detail" },
  { name: "Counter Cashier" },
  { name: "Discounts" },
];

const Reports = () => {
  const restaurant = userestaurantStore((state) => state.restaurant);
  const user = useUserStore((state) => state.user);

  const [Report, setReport] = useState("");
  const [value, setValue] = React.useState({
    startDate: dayjs().subtract(7, "day"),
    endDate: dayjs(),
    restaurantId: restaurant.restaurantInfo._id,
    headerAuth: user.jwtToken,
  });

  const handleChange = (e: SelectChangeEvent) => {
    setReport(e.target.value);
  };

  const handleDateChange = (newValue: Dayjs | null, name: string) => {
    setValue({
      ...value,
      [name]: newValue,
    });
  };

  const getOrderData = useMutation(getOrderReport, {
    onSuccess: async (data) => {
      console.log(data);
    },
  });

  const getDiscountData = useMutation(getOrderDiscount, {
    onSuccess: async (data) => {
      console.log(data);
    },
  });

  const handleSubmit = () => {
    const params = {
      startDate: value.startDate.format("MM/DD/YYYY"),
      endDate: value.endDate.format("MM/DD/YYYY"),
      headerAuth: value.headerAuth,
      restaurantId: value.restaurantId,
    };
    console.log(params);

    if (Report === "Bill Summary") {
      getOrderData.mutate(params);
      // console.log(params);
    }
    if (Report === "Discounts") {
      getDiscountData.mutate(params);
    }
  };
  return (
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
        <Stack direction={"row"} gap={1}>
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
            Report === "Counter Cashier"
          }
          startIcon={<PrintIcon />}
          onClick={handleSubmit}
        >
          Print
        </Button>
      </Stack>
    </LocalizationProvider>
  );
};

export default Reports;
