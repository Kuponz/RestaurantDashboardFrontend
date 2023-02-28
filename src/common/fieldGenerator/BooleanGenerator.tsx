import { FormControlLabel, Switch } from "@mui/material";
import React from "react";

const BooleanGenerator = ({ changer }) => {
  return (
    <>
      <FormControlLabel
        sx={{
          justifyContent: "flex-start",
          flexDirection: "row",
        }}
        control={
          <Switch
            checked={changer?.value}
            onChange={(e) => {
              changer.onChange(e);
            }}
          />
        }
        label={changer.title}
        labelPlacement="top"
      />
    </>
  );
};

export default BooleanGenerator;
