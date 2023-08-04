import { Stack, Typography } from "@mui/material";
import React from "react";
import { Text } from "react-thermal-printer";

export const SeperateOrder = ({ orderVal, isKot }) => {
  // console.log({orderVal})

  const getComplimentaryItemCount=(order)=>{
    let quantity=0;
    order.complimentary.map((value)=>{
      if(value.isComplimentary)
      {
        quantity +=1;
      }
    })
    return quantity;
  }
  return (
    <Stack
      sx={{
        textDecoration: orderVal.quantity == 0 ? "line-through" : "none",
        color: orderVal.quantity == 0 ? "red" : "black",
      }}
      direction={"row"}
      justifyContent={"space-between"}
    >
      <Stack
        sx={{
          width: "50%",
        }}
      >
        <Text style={{
          fontFamily: "monospace",
          fontSize: "14px",
          fontWeight: 500
        }}>{orderVal?.menuId?.itemName}</Text>
        {orderVal.selected?.length > 0 &&
          orderVal.selected.map((orderse) =>
            orderse?.variations?.map((orderSel) => (
              <Stack key={orderSel._id}>
                <Text style={{
                  paddingLeft: "1rem",
                  fontFamily: "monospace",
                  fontSize: "12px",
                  fontWeight: 500
                }}>
                  {
                    orderSel.variationOptions.find(
                      (v) => v._id == orderSel.selected
                    )?.optName
                  }
                </Text>
              </Stack>
            ))
          )}
      </Stack>
      <Stack
        direction={"row"}
        gap={{
          xs: 0,
          sm: 5,
        }}
        sx={{
          width: "50%",
          justifyContent: isKot ? "flex-end" : "space-between",
        }}
      >
        <Stack direction={"row"} justifyContent={"flex-end"} gap={{ xs: 0.25, sm: 1 }}>
          {!isKot &&  (
            <Stack>
              {(orderVal.selected?.length > 0 && Number(orderVal?.menuId?.price) != 0) &&
                <Text style={{
                  fontFamily: "monospace",
                  fontSize: "14px",
                  fontWeight: 500
                }}>{orderVal?.menuId?.price}</Text>
              }
              {orderVal.selected?.length > 0 &&
                orderVal.selected.map((orderse) =>
                  orderse?.variations?.map((orderSel) => (
                    <Stack direction={"row"} key={orderSel._id}>
                      <Text style={{
                        fontFamily: "monospace",
                        fontSize: "14px",
                        fontWeight: 500
                      }}>
                        {
                          orderSel.variationOptions.find(
                            (v) => v._id == orderSel.selected
                          )?.price
                        }
                      </Text>
                    </Stack>
                  ))
                )}
            </Stack>
          )}
          <Stack direction={"column"}>
            {Number(orderVal?.menuId?.price) != 0 && (<Stack
              direction={"row"}
              gap={{
                xs: 0,
                sm: 1,
              }}
            >
              <Text style={{
                fontFamily: "monospace",
                fontSize: "14px",
                fontWeight: 500
              }}>x</Text>
              <Text style={{
                fontFamily: "monospace",
                fontSize: "14px",
                fontWeight: 500
              }}>{orderVal.quantity}</Text>
            </Stack>)}
            {orderVal.selected?.length > 0 &&
              orderVal.selected.map((orderse) =>
                orderse?.variations?.map((orderSel) => (
                  <Stack direction={"row"} key={orderSel._id} gap={1}>
                    <Text  style={{
          fontFamily: "monospace",
          fontSize:"14px",
          fontWeight:500
        }}>x</Text>
                    <Text  style={{
          fontFamily: "monospace",
          fontSize:"14px",
          fontWeight:500
        }}> 1</Text>
                  </Stack>
                ))
              )}
          </Stack>
        </Stack>
        {orderVal?.isComplimentary ? 
            <>
            <Stack
            sx={{
              width: "50%",
            }}
          >
            <Typography variant="h5" color="#ff0000" >{getComplimentaryItemCount(orderVal)} Free</Typography>
           
          </Stack>
          </>
         
        : <></>}

       
        <Stack direction={"column"}>
          {!isKot && Number(orderVal?.cost) != 0 && <Text style={{
            fontFamily: "monospace",
            fontSize: "14px",
            fontWeight: 600
          }}>₹{orderVal.cost}</Text>}
          {!isKot &&
            orderVal.selected?.length > 0 &&
            orderVal.selected.map((orderse) =>
              orderse?.variations?.map((orderSel) =>{
                let ord=orderSel.variationOptions.find(
                  (v) => v._id == orderSel.selected
                );
                return (
                  <Stack direction={"row"} key={orderSel._id}>
                    <Text style={{
                      fontFamily: "monospace",
                      fontSize: "14px",
                      fontWeight: 600
                    }}>
  
                      {
                        ord && ("₹" + ord.price)
                      }
                    </Text>
                  </Stack>
                )
              } )
            )}
        </Stack>
      </Stack>
    </Stack>
  );
};
