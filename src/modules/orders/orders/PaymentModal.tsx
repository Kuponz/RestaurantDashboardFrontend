// import { Button, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
// import React, { useState } from 'react'
// import { flexBox } from 'theme/defaultFunction'

import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { flexBox } from "theme/defaultFunction";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuidv4 } from "uuid";

const PaymentModal = ({
  order,
  settlePayment,
  settlePaymentDetails,
  paymentDetails,
  isLoading,
}) => {
  const [alignment, setAlignment] = useState(() => {
    settlePaymentDetails({
      ...paymentDetails,
      paidVia: "UPI",
    });
    return "UPI";
  });

  console.log(alignment);
  // const [selectTab, setselectTab] = useState('');

  // const handleSelect = (event: SelectChangeEvent) => {
  //     setselectTab(event.target.value)
  //     settlePaymentDetails({
  //         ...paymentDetails,
  //         fields:{
  //             [event.target.name]:selectTab
  //         }
  //     })
  // };
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      settlePaymentDetails({
        ...paymentDetails,
        paidVia: newAlignment,
      });
    }
  };
  // const valChange = (e)=>{
  //     settlePaymentDetails({
  //         ...paymentDetails,
  //         fields:{
  //             [e.target.name]:e.target.value
  //         }
  //     })
  // }
  // const ipData={
  //     "UPI":[
  //         {
  //             title:"APP",
  //             name:"app",
  //             type:"select",
  //             multiline:false,
  //             item:[
  //             ]
  //         },
  //         // {
  //         //     title:"UPI ID",
  //         //     name:"upiId",
  //         //     type:"number"

  //         // },
  //         // {
  //         //     title:"Amount Received",
  //         //     name:"amountReceived",
  //         //     type:"number"
  //         // },
  //     ],
  //     "CASH":[
  //         // {
  //         //     title:"Phone Number",
  //         //     name:"mobileNumber",
  //         //     type:"number"
  //         // },
  //         // {
  //         //     title:"Amount Received",
  //         //     name:"amountReceived",
  //         //     type:"number"
  //         // },
  //     ],
  //     "CARD":[
  //         // {
  //         //     title:"Phone Number",
  //         //     name:"mobileNumber",
  //         //     type:"number"
  //         // },
  //         // {
  //         //     title:"Amount Received",
  //         //     name:"amountReceived",
  //         //     type:"number"
  //         // },
  //         // {
  //         //     title:"card Details",
  //         //     name:"cardDetails",
  //         //     type:"text"
  //         // }
  //     ],
  //     "OTHER":[
  //         // {
  //         //     title:"Type",
  //         //     name:"otherType",
  //         //     type:"text",
  //             // multiline:false,

  //         // },
  //         // {
  //         //     title:"Phone Number",
  //         //     name:"mobileNumber",
  //         //     type:"number",
  //             // multiline:false,

  //         // },
  //         // {
  //         //     title:"Amount Received",
  //         //     name:"amountReceived",
  //         //     type:"number",
  //             // multiline:false,

  //         // },
  //         {
  //             title:"Details",
  //             name:"cardDetails",
  //             type:"text",
  //             multiline:true,
  //         }
  //     ]
  // }

  const [splitList, setsplitList] = useState([
    {
      id: uuidv4(),
      paidVia: "UPI",
      amount: (order.orderAmount.total / 2).toFixed(3),
    },
    {
      id: uuidv4(),
      paidVia: "CASH",
      amount: (order.orderAmount.total / 2).toFixed(3),
    },
  ]);

  useEffect(() => {
    if (alignment === "SPLITPAYMENT") {
      settlePaymentDetails({
        ...paymentDetails,
        splitPayment: splitList,
      });
    }
  }, [splitList]);

  // const [currentCost, setcurrentCost] = useState<number>();

  // if (currentCost! < order.orderAmount.total) {
  //   console.log("Value is Lower by ", order.orderAmount.total - currentCost!);
  //   setcurrentCost(order.orderAmount.total);
  //   let value: number = order.orderAmount.total;
  //   splitList.forEach((element) => {
  //     return (value -= element.amount);
  //   });
  //   setsplitList([
  //     ...splitList,
  //     {
  //       id: splitList.length,
  //       paidVia: "UPI",
  //       amount: value.toFixed(3),
  //     },
  //   ]);
  // }

  // useEffect(() => {
  //   let value = 0;
  //   splitList.forEach((element) => {
  //     return (value += parseFloat(element.amount));
  //   });
  //   setcurrentCost(value);
  // }, [splitList]);

  //   console.log(currentCost);

  return (
    <Stack>
      <Typography color={"primary.main"} textAlign={"center"} variant="h3">
        Collect ₹{order.orderAmount.total}
      </Typography>
      <Stack
        sx={{
          ...flexBox(),
          flexDirection: {
            xs: "column",
            md: "row",
          },
        }}
        gap={1}
        py={1}
      >
        <Typography variant="body1">Via</Typography>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
          disabled={isLoading}
        >
          <ToggleButton value="UPI">UPI</ToggleButton>
          <ToggleButton value="CASH">Cash</ToggleButton>
          <ToggleButton value="CARD">Card</ToggleButton>
          <ToggleButton value="OTHER">Other</ToggleButton>
          <ToggleButton value="SPLITPAYMENT">Split</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      {alignment === "SPLITPAYMENT" && (
        <Stack gap={2} sx={{ marginBlock: 2 }}>
          <Typography variant="h5" color={"primary.main"}>
            Split Payment Details
          </Typography>
          {splitList.map((split) => (
            <Fragment key={split.id}>
              <Stack direction="row" gap={2}>
                <FormControl fullWidth sx={{ flex: 0.4 }}>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={split.paidVia}
                    onChange={(evnt) => {
                      setsplitList(
                        splitList.map((e) => {
                          if (e.id === split.id) {
                            return { ...split, paidVia: evnt.target.value };
                          } else return e;
                        })
                      );
                    }}
                    label="Age"
                  >
                    <MenuItem value="UPI">UPI</MenuItem>
                    <MenuItem value="CASH">Cash</MenuItem>
                    <MenuItem value="CARD">Card</MenuItem>
                    <MenuItem value="OTHER">Other</MenuItem>
                    {/* <MenuItem value="SPLITPAYMENT">Split</MenuItem> */}
                  </Select>
                </FormControl>
                <TextField
                  sx={{ flex: 1 }}
                  label="Cost ₹"
                  type="number"
                  // value={Selections.Category?.name}
                  value={split.amount}
                  onChange={(evnt) => {
                    setsplitList(
                      splitList.map((e) => {
                        if (e.id === split.id) {
                          return { ...split, amount: evnt.target.value };
                        } else return e;
                      })
                    );
                  }}
                  // onChange={(e) => {
                  //   setSelections({
                  //     ...Selections,
                  //     Category: {
                  //       ...Selections.Category,
                  //       name: e.target.value,
                  //     },
                  //   });
                  // }}
                  variant="filled"
                />
                <Stack justifyContent={"center"} alignItems={"center"}>
                  <IconButton
                    onClick={() => {
                      setsplitList(splitList.filter((e) => e.id !== split.id));
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Stack>
            </Fragment>
          ))}
          <Stack justifyContent={"center"} alignItems={"center"}>
            <Button
              onClick={() => {
                let value: number = order.orderAmount.total;
                splitList.forEach((element) => {
                  return (value -= element.amount);
                });
                setsplitList([
                  ...splitList,
                  {
                    id: uuidv4(),
                    paidVia: "UPI",
                    amount: value.toFixed(3),
                  },
                ]);
              }}
            >
              Split More
            </Button>
          </Stack>
        </Stack>
      )}
      {/* <Stack sx={{
                py:2,
                gap:2
            }}>
                {
                    ipData[alignment].map((ip, key)=>{
                        if(ip.type == "select"){
                            return (
                                <FormControl fullWidth key={key}>
                                    <InputLabel id="demo-simple-select-label">{ip.title}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={paymentDetails?.fields[ip.name] ?? ""}
                                        label={ip.title}
                                        onChange={e=>valChange(e)}
                                    >
                                        <MenuItem value={10}>GPAY</MenuItem>
                                        <MenuItem value={20}>PHONEPE</MenuItem>
                                        <MenuItem value={30}>PAYTM</MenuItem>
                                        <MenuItem value={30}>CRED PAY</MenuItem>
                                        <MenuItem value={30}>MOBIKWIK</MenuItem>
                                        <MenuItem value={30}>Other</MenuItem>
                                    </Select>
                                </FormControl>
                            )
                        }else{
                            return (
                                <TextField
                                    key={key} 
                                    type={ip.type}
                                    variant="filled"
                                    label={ip.title}
                                    name={ip.name}
                                    value={paymentDetails?.fields[ip.name] ?? ""}
                                    onChange={e=>valChange(e)}
                                    multiline={ip.multiline}
                                    rows={ip.multiline?3:1}
                                />
                            
                            )
                        }
                    }
                    )
                }
            </Stack> */}
      <Stack direction={"row"} gap={1} justifyContent={"center"}>
        <Button
          disabled={isLoading}
          variant="outlined"
          onClick={() => {
            if (alignment === "SPLITPAYMENT") {
              let value = 0;
              splitList.forEach((element) => {
                return (value += Number(element.amount));
              });
              //  ! NOTE: Don't Type check by !== because js types sucks -> '099' != 99 for some reason and i don wanna debug this
              if (value != order.orderAmount.total) {
                alert("Cost of each split should be equal to order amount");
              } else {
                // settlePaymentDetails({
                //   ...paymentDetails,
                //   paidVia: "SPLITPAYMENT",
                //   splitPayment: splitList,
                // });
                settlePayment(splitList);
              }
            } else {
              settlePayment();
            }
          }}
        >
          {isLoading ? <CircularProgress /> : "Settle"}
        </Button>
      </Stack>
    </Stack>
  );
};
export default PaymentModal;

// const PaymentModal = ({order, setOpen}) => {
//     const [alignment, setAlignment] = React.useState('UPI');

// const handleChange = (
//     event: React.MouseEvent<HTMLElement>,
//     newAlignment: string,
// ) => {
//     setAlignment(newAlignment);
// };
//     const ipData={
//         "UPI":[
//             {
//                 title:"Phone Number",
//                 name:"mobileNumber",
//                 type:"number"
//             },
//             {
//                 title:"UPI ID",
//                 name:"upiId",
//                 type:"number"

//             },
//             {
//                 title:"Amount Received",
//                 name:"amountReceived",
//                 type:"number"
//             },
//         ],
//         "CASH":[
//             {
//                 title:"Phone Number",
//                 name:"mobileNumber",
//                 type:"number"
//             },
//             {
//                 title:"Amount Received",
//                 name:"amountReceived",
//                 type:"number"
//             },
//         ],
//         "CARD":[
//             {
//                 title:"Phone Number",
//                 name:"mobileNumber",
//                 type:"number"
//             },
//             {
//                 title:"Amount Received",
//                 name:"amountReceived",
//                 type:"number"
//             },
//             {
//                 title:"card Details",
//                 name:"cardDetails",
//                 type:"text"
//             }
//         ],
//         "OTHER":[
//             {
//                 title:"Type",
//                 name:"otherType",
//                 type:"text"

//             },
//             {
//                 title:"Phone Number",
//                 name:"mobileNumber",
//                 type:"number"
//             },
//             {
//                 title:"Amount Received",
//                 name:"amountReceived",
//                 type:"number"
//             },
//             {
//                 title:"Details",
//                 name:"cardDetails",
//                 type:"text"
//             }
//         ]
//     }
//   return (
//     <Stack>
//         <Typography color={"primary.main"} textAlign={"center"} variant='h3'>Collect ₹{order.orderAmount.total}</Typography>
//         <Stack sx={{...flexBox(), flexDirection:{
//             xs:"column", md:"row"
//         }}} gap={1}>
//             <Typography variant='body1'>Via</Typography>
//             <ToggleButtonGroup
//                 color="primary"
//                 value={alignment}
//                 exclusive
//                 onChange={handleChange}
//                 aria-label="Platform"
//                 >
//                 <ToggleButton value="UPI">UPI</ToggleButton>
//                 <ToggleButton value="CASH">Cash</ToggleButton>
//                 <ToggleButton value="CARD">Card</ToggleButton>
//                 <ToggleButton value="OTHER">Other</ToggleButton>
//                 </ToggleButtonGroup>
//         </Stack>
//         <Stack sx={{
//             py:2,
//             gap:2
//         }}>
//             {
//                 ipData[alignment].map((ip, key)=>(

//                     <TextField
//                         key={key}
//                         type={ip.type}
//                         variant="filled"
//                         label={ip.title}/>
//                 ))
//             }
//         </Stack>
//         <Stack direction={"row"} gap={1} justifyContent={"center"}>
//             <Button variant='outlined' onClick={()=>{}}>Alternate Payment</Button>
//             <Button variant='outlined'>Settle</Button>
//         </Stack>
//     </Stack>
//   )
// }

// export default PaymentModal
