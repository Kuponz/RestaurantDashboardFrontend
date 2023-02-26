import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const FloorStructure = ({ infoSelected, setinfoSelected, restroDetails }) => {
  return (
    <>
      <FormControl fullWidth sx={{width:"200px"}}>
        <InputLabel>Floor</InputLabel>
        <Select
          label="Floor"
          defaultValue={"ALL"}
          onChange={(e) => {
            setinfoSelected((info) => ({ ...info, floor: e.target.value }));
          }}
        >
          <MenuItem value={"ALL"}>All</MenuItem>
          {restroDetails?.map((floorDet, ind) => (
            <MenuItem key={ind} value={floorDet._id}>
              {floorDet?.floorName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default FloorStructure;
