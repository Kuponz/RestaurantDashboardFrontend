import { MenuItem, Select } from "@mui/material";
import React from "react";

const SelectForm = ({ vari, variNa, extraOpen, setExtraOpen, forceUpdate }) => {
  return (
    <Select
      variant="filled"
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={variNa?.selected}
      label={variNa.variationName || "Variation"}
      onChange={(e) => {
        // console.log(e.target.value);
        // extraOpen.selected[k].variations[ke].selected = e.target.value;
        // setExtraOpen(extraOpen);
        // forceUpdate();
        // console.log({variNa, hs:extraOpen.selected})
        //   cl(extraOpen)
        //   setExtraOpen(extraOpen);
        //   forceUpdate();
        console.log({ variNa, hs: extraOpen.selected, vari });
        extraOpen.selected = extraOpen.selected.map((seli) => {
          if (seli.id == vari.id) {
            seli.variations = seli.variations.map((vair) => {
              if (vair._id == variNa._id) {
                vair.selected = e.target.value;
              }
              return vair;
            });
          }
          return seli;
        });
        console.log({ extraOpen });
        setExtraOpen(extraOpen);
        forceUpdate();
      }}
    >
      {variNa?.variationOptions?.map((varOps, ko) => (
        <MenuItem
          onClick={(e) => {}}
          key={ko}
          value={varOps._id}
        >{`${varOps.optName} | ₹${varOps.price} `}</MenuItem>
      ))}
    </Select>
  );
};

export default SelectForm;
