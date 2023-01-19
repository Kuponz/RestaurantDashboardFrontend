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


import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, IconButton, Stack, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { flexBox } from 'theme/defaultFunction';
export default function SimpleAccordion() {
  return (
      <Accordion TransitionProps={{ unmountOnExit: true }} sx={{ 
        width:"100%",
        // border:"2px solid",
        ...flexBox("column")
        }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{
            ...flexBox(),
            width:"100%"
          }}
        >
          <Stack sx={{
            width:"100%",
            // border:"2px soid red"
          }}>
            <Typography sx={{ width: '90%', flexShrink: 0,
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow:"ellipsis",
                 }}>
                Paneer Butter masala Kulcha
                Paneer Butter masala Kulcha
                Paneer Butter masala Kulcha
                Paneer Butter masala Kulcha
                Paneer Butter masala Kulcha
                Paneer Butter masala Kulcha
                Paneer Butter masala Kulcha
                Paneer Butter masala Kulcha
                Paneer Butter masala Kulcha
                Paneer Butter masala Kulcha
                Paneer Butter masala Kulcha
            </Typography>
            <Stack direction={"row"} sx={{gap:5}}>
                <Typography sx={{ color: 'text.secondary' }}>x5</Typography>
                <Typography sx={{ color: 'text.secondary' }}>Total: Rs: 500</Typography>

            </Stack>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <IconButton><AddIcon/></IconButton>
                <Stack sx={{
                        width:"4rem"
                    }}>
                        <TextField />
                    </Stack>
                <IconButton><RemoveIcon/></IconButton>
                <IconButton color='error'><DeleteIcon/></IconButton>
            </Stack>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
            <Button>Add Special Instruction</Button>
            <TextField label={"Instructions"}  rows={7} multiline fullWidth/>
          </Typography>
        </AccordionDetails>
      </Accordion>
  );
}
