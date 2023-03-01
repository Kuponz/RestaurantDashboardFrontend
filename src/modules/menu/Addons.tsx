import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const Addons = ({ setExtraOpen, val, setValue, forceUpdate, extraOpen }) => {
  const addSelected = ()=>{
    console.log({val, setValue, extraOpen});
    setValue([...val, {
      item: {...extraOpen?.item, selected:extraOpen?.selected},
      quantity: extraOpen?.quantity,
    }])
    setExtraOpen({
      open:false,
      selected:[],
      quantity:0,
      item:{},
    })
  }
  return (
    <Stack px={2}>
      {
        extraOpen?.selected?.map((vari, k)=>(
          <Stack key={k}>
          <Typography variant={"subtitle1"}>Quantity No {k + 1}</Typography>
          {
            vari?.variations?.map((variNa, ke)=>(
            <Stack key={ke}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  {variNa.variationName}
                </FormLabel>
                <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              defaultValue={extraOpen?.selected[k]?.variations[ke]?.selected || ""}
              onChange={(e) => {
                console.log(e.target.value + " " + e.target.name);
                extraOpen?.selected[k]?.variations[ke]["selected"] = e.target.value;
                console.log({ext: extraOpen?.selected[k]?.variations[ke]});
                setExtraOpen(extraOpen);
              }}
            >
              <Stack direction={"row"} flexWrap={"wrap"}>
                {
                  variNa?.variationOptions.map((varOps, ik) => (
                    <FormControlLabel
                      key={ik}
                      name={varOps.optName}
                      value={varOps._id}
                      control={<Radio />}
                      label={`${varOps.optName} | ₹${varOps.price} `}
                    />
                  ))
                }
              </Stack>
            </RadioGroup>
              </FormControl>
            </Stack>
          ))
          }
          {/* 
          {
            vari?.addons?.map((variNa, ke)=>(
            <Stack key={ke}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  {variNa.variationName}
                </FormLabel>
                <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              defaultValue={extraOpen?.selected[k]?.addons[ke]?.selected || ""}
              onChange={(e) => {
                console.log(e.target.value + " " + e.target.name);
                extraOpen?.selected[k]?.addons[ke]["selected"] = e.target.value;
                console.log({ext: extraOpen?.selected[k]?.addons[ke]});
                setExtraOpen(extraOpen);
              }}
            >
              <Stack direction={"row"} flexWrap={"wrap"}>
                {
                  variNa?.variationOptions.map((varOps, ik) => (
                    <FormControlLabel
                      key={ik}
                      name={varOps.optName}
                      value={varOps._id}
                      control={<Radio />}
                      label={`${varOps.optName} | ₹${varOps.price} `}
                    />
                  ))
                }
              </Stack>
            </RadioGroup>
              </FormControl>
            </Stack>
            ))
          }
           */}
        </Stack>
      ))
      }
      {/* {extraOpen?.selected?.map((vari, k) => (
        <Stack key={k}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              {vari.variationName}
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              onChange={(e) => {
                console.log(e.target.value + " " + e.target.name);
                let b = false;
                if (extraOpen.variations.length < 1) {
                  extraOpen.variations.push({
                    _id: vari._id,
                    selectedOpt: e.target.value,
                  });
                } else {
                  extraOpen.variations = extraOpen?.variations?.map((vare) => {
                    if (vare._id == vari._id) {
                      vare.selectedOpt = e.target.value;
                      b = true;
                    }
                    return vare;
                  });
                }
                if (!b) {
                  extraOpen.variations.push({
                    _id: vari._id,
                    selectedOpt: e.target.value,
                  });
                }
                setExtraOpen(extraOpen);
              }}
            >
              <Stack direction={"row"} flexWrap={"wrap"}>
                {vari?.variationOptions.map((varOps, ik) => (
                  <FormControlLabel
                    key={ik}
                    name={varOps.optName}
                    value={varOps._id}
                    control={<Radio />}
                    label={`${varOps.optName} | ₹${varOps.price} `}
                  />
                ))}
              </Stack>
            </RadioGroup>
          </FormControl>
        </Stack>
      ))}
      {extraOpen?.item?.addons?.map((vari, k) => (
        <Stack key={k}>
            <FormLabel id="demo-radio-buttons-group-label">
              {vari.variationName}
            </FormLabel>
              <Stack direction={"row"} flexWrap={"wrap"}>
                {vari?.variationOptions.map((varOps, ik) => (
                  <FormControlLabel key={ik} onChange={e=>{
                    console.log({e:e.target.name})
                    // if (extraOpen.addons.length < 1 && e.target.checked) {
                    //   extraOpen.addons.push({
                    //     _id: vari._id,
                    //     selectedOpt: [e.target.name],
                    //   });
                    // } else {
                    //   let b = false;
                    //   extraOpen.addons = extraOpen.addons.map((vare) => {
                    //     if (vare._id == vari._id) {
                    //       vare.selectedOpt = e.target.value;
                    //       b = true;
                    //     }
                    //     return vare;
                    //   });
                    // }
                    // if (!b) {
                    //   extraOpen.addons.push({
                    //     _id: vari._id,
                    //     selectedOpt: e.target.value,
                    //   });
                    // }
                    setExtraOpen(extraOpen);
                  }} control={<Checkbox/>} name={varOps._id} label={`${varOps.optName} | ₹${varOps.price} `} id={varOps?._id} />
                ))}
              </Stack>
        </Stack>
      ))} */}
      <Button sx={{}} variant={"contained"} onClick={addSelected}> Add</Button>
    </Stack>

  );
};

export default Addons;
