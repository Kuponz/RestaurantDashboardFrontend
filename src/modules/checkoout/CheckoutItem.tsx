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
import { v4 as uuidv4 } from "uuid";
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
  console.log({ orderValue });
  return (
       <Paper variant="outlined" 
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
        elevation={6}
    >
      <Stack  aria-controls="panel1bh-content"
        id="panel1bh-header"
        sx={{
          ...flexBox(),
          width: "100%",
        }}>
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
            <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'right',
                }}>
                   <Button onClick={()=>{
                          setcheckoutitemmodelopen(true);
                    }} variant="outlined" startIcon={<EditIcon/>} sx={{...flexBox()}}>Edit</Button>
                </Box>
          </Stack>
         
         <BasicModal open={checkoutitemmodalopen} setOpen={setcheckoutitemmodelopen} title={"Checkout Item"}>
            <CheckoutSelectedIteamModal></CheckoutSelectedIteamModal>

         </BasicModal>

        </Stack>
        </Stack>
     </Paper>


  );
}
