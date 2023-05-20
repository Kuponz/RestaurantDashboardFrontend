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
import { useState } from "react";
import { redDeleteStyle } from "common/styles/deleteStyle";
export default function SimpleAccordion({
  orderValue,
  setValue,
  val,
  variableip,
  index,
}) {
  const [_, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const [checkoutitemmodalopen,setcheckoutitemmodelopen] = React.useState(false);
  console.log({ orderValue });
 

const getComplimentaryCount=()=>{
 let quantity=0;
  orderValue.complimentary.map((value)=>{
    if(value.isComplimentary)
    {
      quantity +=1;
    }
  })
  return quantity;
}


while(val[index].quantity<val[index].complimentary.length)
{
 val[index].complimentary.pop();
}
  return (
    <Paper 
         //sx={{
      //     display:"flex",
      //     justifyContent:"space-between",
      //     alignItems:"center",
      //     p:1,
      //     py:2,
      //     width:{
      //         xs:"100%",
      //         md:"48%",
      //         lg:"30%",
      //         xl:"32%"
      //     },
      //     height:"fit-content",
      //     //backgroundColor:theme=>itemVal && itemVal.quantity > 0 ?theme.palette.secondary.main:theme.palette.background.default
      // }
    
      sx={{
        width: "100%",
        // border:"2px solid",
        ...flexBox("column"),
        display:"flex",
          justifyContent:"space-between",
           alignItems:"center",
           p:1,
           py:2,
      }}
  
          elevation={8}
      >
        <Stack  aria-controls="panel1bh-content"
          id="panel1bh-header"
          px={4}
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
            <Stack direction={"row"} sx={{ gap: 2 }}>
              <Typography sx={{ color: "text.secondary" }}>
                {" "}
                x &nbsp;{orderValue.quantity}
              </Typography>
             
             
              <Typography sx={{ color: "text.secondary" }}>
                Total &#8377;{" "}
                {orderValue.isComplimentary ?  String(parseInt(orderValue?.item?.price) * (orderValue.quantity-getComplimentaryCount())) : String(parseInt(orderValue?.item?.price) * orderValue.quantity)}
              </Typography>
             { orderValue.isComplimentary ?  <Typography sx={{ color: "text.secondary" }}>
                Free {" "}
                {String(getComplimentaryCount())}
              </Typography> : <></> }
            </Stack>
          </Stack>
          <IconButton 
                  sx={redDeleteStyle}
                  onClick={()=>{
                    console.log("valus :");
                    console.log(val[index]);
                    variableip(orderValue.item, "*", parseInt("0"));
                  //  variableip(orderValue.item, "-");
                   // val[index].pop();
                  }}
                  >
                    <DeleteIcon/>
                  </IconButton>
          </Stack>
          <BasicModal open={checkoutitemmodalopen} setOpen={setcheckoutitemmodelopen} title={"Checkout Item"}>

              <CheckoutSelectedIteamModal orderValue={orderValue} val={val} variableip={variableip} index={index} setValue={setValue} setcheckoutitemmodelopen={setcheckoutitemmodelopen}></CheckoutSelectedIteamModal>

           </BasicModal>

       </Paper>

/* <Accordion
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
      <AccordionDetails>
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
                // val[index].item.selected.push(val[index].selected[val[index]?.selected?.length - 1]);
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
                // val[index].item.selected[val[index].item.selected.length -1].id = await Promise.all(uuidv4());
                // val[index].item.selected[-1]
                val[index].quantity += 1;
                setValue(val);
                forceUpdate();
              } else {
                variableip(orderValue.item, "+");
              }
            }}
            // onClick={()=>{return variableip(orderValue.item, "+")}}
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
                // val[index].item.selected.push(val[index].selected[val[index]?.selected?.length - 1]);
                console.log({
                  val: val[index].item.selected[
                    val[index].item.selected.length - 1
                  ],
                });
                val[index].item.selected.pop();
                // val[index].item.selected[-1]
                val[index].quantity -= 1;
                if (val[index].quantity == 0) {
                  let newValI = val.filter((valu, valI) => index != valI);
                  setValue(newValI);
                  forceUpdate();
                } else {
                  setValue(val);
                  forceUpdate();
                }
              } else {
                variableip(orderValue.item, "-");
              }
            }}
          >
            <RemoveIcon />
          </IconButton>
          {/* <IconButton color="error">
            <DeleteIcon />
          </IconButton> */
    //     </Stack>
    //     <Stack>
    //       <Typography my={0.5}>{orderValue?.item?.itemName}</Typography>
    //       <Typography variant="body2" color={"primary"} sx={{}}>
    //         {orderValue?.item?.selected?.map((sel) => {
    //           return (
    //             <>
    //               {sel.variations.length > 0 &&
    //                 sel.variations.map((selu, id) => (
    //                   <span key={id}>
    //                     {
    //                       selu?.variationOptions?.find(
    //                         (elm) => elm._id == selu.selected
    //                       )?.optName
    //                     }{" "}
    //                     <br />
    //                   </span>
    //                 ))}
    //               x1 <br />
    //             </>
    //           );
    //         })}
    //       </Typography>

    //       <Typography color={"primary.main"} my={0.5}>
    //         {orderValue?.specialInstruction}
    //       </Typography>
    //     </Stack>
    //     <TextField
    //       label={"Instructions"}
    //       sx={{
    //         display: specialOpen ? "flex" : "none",
    //         my: 1,
    //       }}
    //       onChange={(e) => (specialInstruction.current = e.target.value)}
    //       rows={7}
    //       multiline
    //       fullWidth
    //     />
    //     <Button
    //       variant="outlined"
    //       sx={{
    //         display: specialOpen ? "none" : "flex",
    //       }}
    //       onClick={() => {
    //         setSpecialOpen(true);
    //       }}
    //     >
    //       Add Special Instruction
    //     </Button>
    //     <Button
    //       variant="outlined"
    //       sx={{
    //         display: specialOpen ? "flex" : "none",
    //       }}
    //       onClick={() => {
    //         setSpecialOpen(false);
    //         val[index].specialInstruction = specialInstruction.current;
    //       }}
    //     >
    //       Save
    //     </Button>
    //   </AccordionDetails>
    // </Accordion>
    //  */}

  );
}
