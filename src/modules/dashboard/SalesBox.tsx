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
import AdjustIcon from "@mui/icons-material/Adjust";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import { flexBox } from "theme/defaultFunction";
import { tokens } from "theme/theme";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ViewListIcon from "@mui/icons-material/ViewList";

export default function SalesBox(prop) {
  return (
    <Paper
      onClick={() => {
        prop.setOpen({
          forWork: prop.name,
          work: true,
        });
      }}
      variant={prop.open.forWork === prop.name ? "free" : undefined}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "90px",
        cursor: "pointer",
        direction: "row",
        p: 1,
        py: 2,
        // mt: 2,
        pl: 2,
        pr: 2,
        flex: 1,
        // marginBlock: "4rem",
        // width: {
        //     xs: "100%",
        //     md: "48%",
        //     lg: "30%",
        //     xl: "30%"
        // },
        width: "100%",
      }}
      elevation={2}
    >
      {/* <Stack>
        <AdjustIcon />
      </Stack> */}
      <Stack
        sx={{
          // justifyContent: {
          //     xs: "space-between"
          // },
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Stack>
          <Typography variant="button" color={"#000"}>
            {prop.title}
          </Typography>
          <Typography
            variant="body2"
            // textAlign={"center"}
            sx={{
              fontSize: "18px",
              pt: 1,
              color:
                prop.open.forWork !== prop.name
                  ? (theme) => theme.palette.secondary.main
                  : "#fff",
            }}
          >
            {prop.orders}
          </Typography>
        </Stack>
      </Stack>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {prop.name === "totalPayment" ? (
          <CurrencyRupeeIcon />
        ) : (
          <ViewListIcon />
        )}

        {/* <Typography
          variant="body2"
          sx={{
            fontSize: "18px",
            ...flexBox(),
          }}
          color="black"
        >
          <SignalCellularAltIcon />
        </Typography> */}
      </Box>
    </Paper>
  );
}
