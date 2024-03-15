import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormLabel,
  IconButton,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import { v4 as uuidv4 } from "uuid";
import { redDeleteStyle } from "common/styles/deleteStyle";
import { flexBox } from "theme/defaultFunction";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import { VideoLibraryRounded } from "@mui/icons-material";
import Addons from "modules/menu/Addons";
import SelectForm from "modules/menu/SelectForm";
export default function CheckoutSelectedIteamModal({
  orderValue,
  val,
  variableip,
  index,
  setValue,
  setcheckoutitemmodelopen,
}) {
  const [specialOpen, setSpecialOpen] = React.useState(false);
  const [_, forceUpdate] = React.useReducer((x) => x + 1, 0);
  const specialInstruction = React.useRef("");

  const updateComplimentary = () => {
    let flag = 1;
    val[index].complimentary.map((value) => {
      if (value.isComplimentary) {
        val[index].isComplimentary = true;
        flag = 2;
      }
    });
    if (flag == 1) {
      val[index].isComplimentary = false;
    }
    setValue(val);
    forceUpdate();
  };

  return (
    <>
      <Paper px={2}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <IconButton
            disabled={orderValue?.item?.selected?.length > 0}
            onClick={async () => {
              if (orderValue?.item?.selected?.length > 0) {
                console.log({
                  v: val[index],
                });

                console.log({
                  val: val[index].item.selected[
                    val[index].item.selected.length - 1
                  ],
                });
                let newValInd = {
                  ...val[index].item.selected[
                    val[index].item.selected.length - 1
                  ],
                  id: uuidv4(),
                };
                console.log({ newValInd });
                val[index].item.selected.push(newValInd);

                val[index].quantity += 1;
                updateComplimentary();
                setValue(val);
                forceUpdate();
              } else {
                variableip(orderValue.item, "+");
              }
            }}
          >
            <AddIcon />
          </IconButton>
          <Stack
            sx={{
              width: "4rem",
            }}
          >
            <TextField
              value={orderValue.quantity}
              onChange={(e) => variableip(orderValue.item, "*", e.target.value)}
            />
          </Stack>
          <IconButton
            onClick={() => {
              if (orderValue?.item?.selected?.length > 0) {
                console.log({
                  v: val[index],
                });

                console.log({
                  val: val[index].item.selected[
                    val[index].item.selected.length - 1
                  ],
                });

                val[index].item.selected.pop();
                val[index].quantity -= 1;
                if (val[index].quantity == 0) {
                  let newValI = val.filter((valu, valI) => index != valI);
                  setValue(newValI);
                  forceUpdate();
                  setcheckoutitemmodelopen(false);
                } else {
                  setValue(val);
                  forceUpdate();
                }
                val[index].complimentary.pop(); // to pop the complimentary section
                updateComplimentary();
                setValue(val);
                forceUpdate();
              } else {
                variableip(orderValue.item, "-");
              }
            }}
          >
            <RemoveIcon />
          </IconButton>
        </Stack>
        <Stack>
          <Typography my={0.5}>{orderValue?.item?.itemName}</Typography>
          <Stack direction="column">
            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              flexWrap={"wrap"}
              gap={1}
            >
              {val[index].complimentary.map((value) => {
                return (
                  <>
                    <Stack direction="column">
                      <Paper elevation={6} sx={{
                        textAlign:"start",
                        p:1,
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"flex-start",
                        alignItems:"flex-start"
                      }}>
                        <Typography my={0.5}>
                          {orderValue?.item?.itemName} - {value.id}
                        </Typography>
                        <FormControlLabel
                          sx={{
                            justifyContent: "flex-start",
                            flexDirection: "row",
                          }}
                          control={
                            <Checkbox
                              checked={value.isComplimentary}
                              onChange={(e) => {
                                console.log(e.target.checked);
                                value.isComplimentary = e.target.checked;
                                console.log(value);
                                updateComplimentary();
                              }}
                            />
                          }
                          label={"Complimentary"}
                          labelPlacement="top"
                        />
                      </Paper>
                    </Stack>
                  </>
                );
              })}
            </Stack>
          </Stack>

          <Typography variant="body2" color={"primary"} sx={{}}>
            {orderValue?.item?.selected?.map((sel) => {
              return (
                <>
                  {sel.variations.length > 0 &&
                    sel.variations.map((selu, id) => (
                      <span key={id}>
                        {
                          selu?.variationOptions?.find(
                            (elm) => elm._id == selu.selected
                          )?.optName
                        }{" "}
                        <br />
                      </span>
                    ))}
                  x1 <br />
                </>
              );
            })}
          </Typography>

          <Typography color={"primary.main"} my={0.5}>
            {orderValue?.specialInstruction}
          </Typography>
        </Stack>
        <TextField
          label={"Instructions"}
          sx={{
            display: specialOpen ? "flex" : "none",
            my: 1,
          }}
          onChange={(e) => (specialInstruction.current = e.target.value)}
          rows={7}
          multiline
          fullWidth
        />
        <Button
          variant="outlined"
          sx={{
            display: specialOpen ? "none" : "flex",
          }}
          onClick={() => {
            setSpecialOpen(true);
          }}
        >
          Add Special Instruction
        </Button>
        <Button
          variant="outlined"
          sx={{
            display: specialOpen ? "flex" : "none",
          }}
          onClick={() => {
            setSpecialOpen(false);
            val[index].specialInstruction = specialInstruction.current;
          }}
        >
          Save
        </Button>
      </Paper>
    </>
  );
}

//backup for  variation part

//   orderValue.item?.addons?.length > 0 || orderValue.item.variations.length > 0 ?
//    <>
{
  /* 
    <Stack px={2}>
      <Stack sx={{ ...flexBox("row", "space-between") }}>
        <Typography variant="h4">Additions</Typography>
        <Button
          variant="contained"
          sx={{}}
          onClick={() => {
        //    addMore();
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
   
          {vari.variations?.map((variNa, ke) => (
            <Stack key={ke}>
              <FormLabel id="demo-radio-buttons-group-label">
                {variNa.variationName}
              </FormLabel>
              <SelectForm
                vari={vari}
                variNa={variNa}
                extraOpen={extraOpen}
                forceUpdate={forceUpdate}
                setExtraOpen={setExtraOpen}
              />
            </Stack>
          ))}
    </Stack>
      ))}
      <Button sx={{}} variant={"contained"} onClick={addSelected}>
        {" "}
        Add
      </Button>
    </Stack>

 */
}

//    </> :
