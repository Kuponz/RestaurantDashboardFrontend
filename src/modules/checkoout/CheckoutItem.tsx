// import { ArrowDownwardOutlined } from '@mui/icons-material'
// import { Button, Stack, Typography } from '@mui/material'
// import React from 'react'

// const CheckoutItem = () => {
//   return (
//     <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
//         <Typography sx={{
//             overflowWrap:"anywhere",
//             width:"70%"
//         }}>CheeseCheeseCheeseCheeseCheeseCheeseCheeseCheeseCheeseCheese</Typography>
//         <Typography sx={{
//             overflowWrap:"normal",
//             width:"30%"
//         }}> x 235000000</Typography>
//         <Button variant='outlined' color='error'> <ArrowDownwardOutlined/></Button>
//     </Stack>
//   )
// }

// export default CheckoutItem

import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button, IconButton, Paper, Stack, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { flexBox } from "theme/defaultFunction";
import { stringify } from "querystring";
import BasicModal from "common/modalGenerator/Modal";
import CheckoutSelectedIteamModal from "./CheckoutSelectedModal";
export default function SimpleAccordion({
  orderValue,
  setValue,
  val,
  variableip,
  index,
}) {
  const [specialOpen, setSpecialOpen] = React.useState(false);
  const specialInstruction = React.useRef("");
  const [_, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const [checkoutitemmodalopen,setcheckoutitemmodelopen] = React.useState(false);
  console.log("Data is :");
  console.log({ orderValue });
  return (
    <Accordion
    TransitionProps={{ unmountOnExit: true }}
    sx={{
      width: "100%",
      // border:"2px solid",
      ...flexBox("column"),
    }}
  >
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1bh-content"
      id="panel1bh-header"
      sx={{
        ...flexBox(),
        width: "100%",
      }}
      onClick={()=>{
        setcheckoutitemmodelopen(true);
      }}
    >
      <Stack
        sx={{
          width: "100%",
          // border:"2px soid red"
        }}
      >
        <Typography
          sx={{
            width: "90%",
            flexShrink: 0,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {orderValue?.item?.itemName}
        </Typography>
        <Stack direction={"row"} sx={{ gap: 5 }}>
          <Typography sx={{ color: "text.secondary" }}>
            {" "}
            x &nbsp;{orderValue.quantity}
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Total &#8377;{" "}
            {String(parseInt(orderValue?.item?.price) * orderValue.quantity)}
          </Typography>
        </Stack>
      </Stack>
    </AccordionSummary>
      <BasicModal open={checkoutitemmodalopen} setOpen={setcheckoutitemmodelopen} title={"Checkout Item"}  >
        <CheckoutSelectedIteamModal orderValue={orderValue} val={val} index={index} setValue={setValue} forceUpdate={forceUpdate} variableip={variableip} specialInstruction={specialInstruction} specialOpen={specialOpen} setSpecialOpen={setSpecialOpen}></CheckoutSelectedIteamModal>
      </BasicModal>
  </Accordion>
  
  );
}
