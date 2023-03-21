import { Stack, Typography, Divider, Button } from "@mui/material";
import React from "react";
import PrintIcon from "@mui/icons-material/Print";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const PrintReport = ({
  printData,
  componentRef,
  Report,
  restroData: restaurant,
  duration,
}) => {
  const handleSubmit = () => {
    printFn();
  };

  return (
    <>
      {printData ? (
        <Stack>
          <Stack
            ref={(el) => (componentRef.current = el)}
            p={1}
            gap={2}
            sx={{ minWidth: "180px" }}
          >
            <Stack direction={"row"} alignItems="center">
              <Typography variant="h2">
                {restaurant.restaurantInfo?.restaurantName}
              </Typography>
              {restaurant.restaurantInfo?.print?.billing
                ?.restaurantMobileNumber != "" && (
                <Typography ml={"auto"} variant="body1" textAlign={"center"}>
                  Mo:{" "}
                  {
                    restaurant.restaurantInfo?.print?.billing
                      ?.restaurantMobileNumber
                  }
                </Typography>
              )}
            </Stack>
            <Typography variant="caption" color={"#000"}>
              Report From{" "}
              <strong>{duration.startDate.format("DD/MM/YYYY")}</strong> to{" "}
              <strong>{duration.endDate.format("DD/MM/YYYY")}</strong>
            </Typography>
            <Divider color="#000" />
            {/* <Stack gap={1}>
              <Stack direction={"row"} gap={1} justifyContent={"center"}>
                <Typography fontWeight={900} flex={1}>
                  Bill No.
                </Typography>
                <Typography fontWeight={900} flex={1}>
                  T No.
                </Typography>
                <Typography fontWeight={900} flex={1}>
                  Food Bill Amt.
                </Typography>
                <Typography fontWeight={900} flex={1}>
                  Discount
                </Typography>
                <Typography fontWeight={900} flex={1}>
                  Recived Amt.
                </Typography>
              </Stack>
              <Divider />

              {printData.report.map((e, i) => (
                <React.Fragment key={i}>
                  <Stack direction={"row"} gap={1} justifyContent={"center"}>
                    <Typography flex={1}>{e.billNo.slice(-3)}</Typography>
                    <Typography flex={1}>{e.table}</Typography>
                    <Typography flex={1}>
                      {Math.round(e.foodBillAmount * 100) / 100}
                    </Typography>
                    <Typography flex={1}>
                      {Math.round(e.discount * 100) / 100}
                    </Typography>
                    <Typography flex={1}>
                      {Math.round(e.received * 100) / 100}
                    </Typography>
                  </Stack>
                </React.Fragment>
              ))}
            </Stack> */}
            {/* <TableContainer> */}
            <Table
              // sx={{ minWidth: 650 }}
              size="small"
              stickyHeader
            //   padding="none"
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 900 }}>Bill No.</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 900 }}>
                    T. No
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 900 }}>
                    Food Bill Amt.
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 900 }}>
                    Discount
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 900 }}>
                    Recived Amt.
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ pageBreakAfter: "auto" }}>
                {printData.report.map((e, i) => (
                  <TableRow
                    key={i}
                    sx={{
                      "& td, & th": { border: 0 },
                    }}
                    hover

                    // selected
                    // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{e.billNo.slice(-3)}</TableCell>
                    <TableCell align="center">{e.table}</TableCell>
                    <TableCell align="right">
                      {/* {Math.round(e.foodBillAmount * 100) / 100} */}
                      {e.foodBillAmount.toFixed(2)}
                      {/* {e.foodBillAmount} */}
                    </TableCell>
                    <TableCell align="right">
                      {/* {Math.round(e.discount * 100) / 100} */}
                      {e.discount.toFixed(2)}
                      {/* {e.discount} */}
                    </TableCell>
                    <TableCell align="right">
                      {/* {Math.round(e.received * 100) / 100} */}
                      {e.received.toFixed(2)}
                      {/* {e.received} */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* </TableContainer> */}
            <Stack alignItems={"center"} mt={3}>
              {Report === "Bill Summary" ? (
                <Stack gap={1}>
                  <Typography>
                    <strong>Total:</strong> ₹
                    {/* {Math.round(printData.totalCollection * 100) / 100} */}
                    {printData.totalCollection.toFixed(2)}
                  </Typography>
                  <Typography>
                    <strong>Total GST:</strong> ₹
                    {/* {Math.round(printData.totalGST * 100) / 100} */}
                    {printData.totalGST.toFixed(2)}
                  </Typography>
                </Stack>
              ) : (
                <Stack gap={1}>
                  <Typography>
                    <strong>Total Discount:</strong> ₹
                    {/* {Math.round(printData.totalDiscount * 100) / 100} */}
                    {printData.totalDiscount.toFixed(2)}
                  </Typography>
                  <Typography>
                    <strong>Total Recived:</strong> ₹
                    {/* {Math.round(printData.totalReceived * 100) / 100} */}
                    {printData.totalReceived.toFixed(2)}
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Stack>
        </Stack>
      ) : null}
    </>
  );
};

export default PrintReport;

// TODO : Note Maybe we shouldn't round off
