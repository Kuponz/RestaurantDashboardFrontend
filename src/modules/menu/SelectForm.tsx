
import { Checkbox, FormControlLabel, MenuItem, Radio, RadioGroup, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { flexBox } from "theme/defaultFunction";

const SelectForm = ({ vari, variNa, isAddon, extraOpen, setExtraOpen, forceUpdate }) => {
  let someOpen = structuredClone(extraOpen);
  const [current, setcurrent] = useState(extraOpen);

  useEffect(() => {
    setcurrent(someOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extraOpen]);
  // ! This is Some Fucked Up Logic But it works
  return (
    <RadioGroup
      variant="filled"
      value={variNa?.selected}
      label={variNa.variationName || "Variation"}
      aria-labelledby="demo-radio-buttons-group-label"
      name="radio-buttons-group"
      sx={{
        ...flexBox("row", "flex-start")
      }}
      onChange={(e) => {
        console.log({ variNa, hs: extraOpen.selected, vari });
        someOpen.selected = current.selected.map((seli) => {
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
        setExtraOpen(someOpen);
        forceUpdate();
      }}
    >
      {variNa?.variationOptions?.map((varOps, ko) => (
        <FormControlLabel
          key={ko}
          value={varOps._id} 
          control={<Radio />} 
          label={`${varOps.optName} | ₹${varOps.price} `} />
      ))}
    </RadioGroup>
  );
};

export default SelectForm;
