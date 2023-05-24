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
import { v4 as uuidv4 } from "uuid";
import { redDeleteStyle } from "common/styles/deleteStyle";
import React, { useEffect } from "react";
import { flexBox } from "theme/defaultFunction";
import SelectForm from "./SelectForm";

const Addons = ({ setExtraOpen, val, setValue, forceUpdate, extraOpen }) => {
  const addSelected = () => {
    console.log({ val, setValue, extraOpen });
    let b = false;
    let newVal = val.map((valu) => {
      if (valu?.item._id == extraOpen?.item?._id) {
        b = true;
        valu.item["selected"] = extraOpen?.selected;
        valu.quantity = extraOpen?.quantity;
        return valu;
      }
      return valu;
    });
    if (!b) {
      setValue([
        ...val,
        {
          item: { ...extraOpen?.item, selected: extraOpen?.selected },
          quantity: extraOpen?.quantity,
        },
      ]);
    } else {
      setValue(newVal);
    }
    setExtraOpen({
      open: false,
      selected: [],
      quantity: 0,
      item: {},
    });
  };
  const addMore = () => {
    extraOpen.selected = [
      ...extraOpen.selected,
      {
        variations: [...extraOpen.item.variations],
        addons: [...extraOpen.item.addons],
        id: uuidv4(),
      },
    ];
    extraOpen.quantity = extraOpen.selected.length;
    setExtraOpen(extraOpen);
    forceUpdate();
  };
  useEffect(() => {
    let newValue = val.find((vlaue) => {
      if (vlaue.item._id == extraOpen.item?._id) {
        return true;
      }
      return false;
    });
    if (newValue?.item?.selected) {
      extraOpen.selected = newValue?.item?.selected;
      extraOpen.quantity = extraOpen.selected.length;
      setExtraOpen(extraOpen);
      forceUpdate();
    }
  }, []);
  console.log({
    val,
    extraOpen,
  });
  return (
    <Stack px={2}>
      <Stack sx={{ ...flexBox("row", "space-between") }}>
        <Typography variant="h4">Additions</Typography>
        <Button
          variant="contained"
          sx={{}}
          onClick={() => {
            addMore();
          }}
        >
          Add More
        </Button>
      </Stack>
      {extraOpen?.selected?.map((vari, k) => (
        <Stack key={k} p={1}>
          <Stack py={2} sx={{ ...flexBox("row", "space-between") }}>
            <Typography variant={"subtitle1"}>Quantity No {k + 1}</Typography>
            <Button
              onClick={() => {
                console.log(extraOpen);
                extraOpen.selected = extraOpen.selected.filter(
                  (kom, mid) => mid != k
                );
                extraOpen.quantity = extraOpen.quantity - 1;
                setExtraOpen(extraOpen);
                forceUpdate();
              }}
              sx={{ ...redDeleteStyle }}
            >
              Remove
            </Button>
          </Stack>
          {/* {console.log({vari})} */}
          {vari?.variations?.map((variNa, ke) => (
            <Stack key={ke}>
              <FormLabel id="demo-radio-buttons-group-label">
                {variNa.variationName}
              </FormLabel>
              {/* Vairation */}
              <SelectForm
                isAddon={false}
                vari={vari}
                variNa={variNa}
                extraOpen={extraOpen}
                forceUpdate={forceUpdate}
                setExtraOpen={setExtraOpen}
              />
            </Stack>
          ))}

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
      ))}
      <Button sx={{}} variant={"contained"} onClick={addSelected}>
        {" "}
        Add
      </Button>
    </Stack>
  );
};

export default Addons;
