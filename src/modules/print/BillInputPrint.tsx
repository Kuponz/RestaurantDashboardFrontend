import { Grid, Stack, Typography } from "@mui/material";
import React from "react";
import ShowValue from "./ShowValue";

const BillInputPrint = ({
  isLoading,
  printData,
  forceUpdate,
  setprintData,
}: {
  isLoading:Boolean;
  printData: {
    isEdit: boolean;
    value: {
      kot: {};
      billing: {};
    };
    type: string;
  };
  setprintData: React.Dispatch<
    React.SetStateAction<{
      isEdit: boolean;
      value: {
        kot: {};
        billing: {};
      };
      type: string;
    }>
  >;
}) => {
  return (
    <Stack sx={{}}>
      <Grid container spacing={3}>
        {printData?.value[printData?.type] &&
          Object.keys(printData?.value[printData?.type])?.map((newData, index) => (
            <ShowValue
            isLoading={isLoading}
            forceUpdate={forceUpdate}
              key={index}
              valueForm={newData}
              printData={printData}
              setprintData={setprintData}
            />
          ))}
      </Grid>
    </Stack>
  );
};

export default BillInputPrint;
