import { Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { tokens } from "theme/theme";

const TableComponent = ({ tableData }: any) => {
  return (
    <>
      <Paper
        sx={{  
          width: {
            xs: "45%",
            md: "30%",
            lg: "18%",
          },
          height: "90px",
          p: 3,
          cursor: "pointer",
        }}
        elevation={4}
        // onClick={() => {
        // ?Attach Edit Functionality onClick
        // }}
      >
        <Typography
          variant="body1"
          component="p"
          sx={{
            color: tokens().greenAccent[500],
            width: "100%",
            textAlign: "center",
          }}
        >
          {tableData.TableName}
        </Typography>

        <Stack
          direction="row"
          width={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="caption" color={tokens().grey[300]}>
            {tableData.waiter ? tableData.waiter.name : tableData.status}
          </Typography>
        </Stack>
      </Paper>
    </>
  );
};

export default TableComponent;
