import { Button, Paper, Stack } from "@mui/material";
import React from "react";

const reportList = [
  { name: "Bill Summary" },
  { name: "Expense Detail" },
  { name: "Counter Cashier" },
  { name: "Discounts" },
];

const Reports = () => {
  return (
    <Stack direction={"row"} gap={2} mt={2} flexWrap={"wrap"}>
      {reportList.map((e, i) => (
        <Button sx={{ p: 1 }} key={i} variant={"contained"}>
          {e.name}
        </Button>
      ))}
    </Stack>
  );
};

export default Reports;
