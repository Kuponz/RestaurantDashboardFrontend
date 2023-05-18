import { Stack, Typography } from "@mui/material";
import React from "react";
import { SeperateOrder } from "./SeperateOrder";
import { callfortitle } from "../SumValue";
import { Text } from "react-thermal-printer";
import { userestaurantStore } from "store/restaurant/restaurantStore";

const Orders = ({ order, print = false, isKot = false }) => {
  const restaurant = userestaurantStore(
    (state) => state.restaurant.restaurantInfo
  );
  return (
    <Stack
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      <Stack
        direction={"row"}
        sx={{
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "space-between",
          px: {
            xs: 0.25,
          },
        }}
      >
        <Stack
          sx={{
            width: {
              xs: "30%",
              sm: "50%",
            },
          }}
        >
          <Text
              style={{
                fontFamily: "monospace",
                fontSize:"14px",
                fontWeight:500
              }}>
                Item
              </Text>
        </Stack>
        <Stack
          direction={"row"}
          sx={{
            width: "50%",
            justifyContent: isKot ? "flex-end" : "space-between",
          }}
        >
          <Stack direction={"row"} gap={{ xs: 0.25, sm: 1 }}>
            {!isKot && <Typography variant="body1">Rate</Typography>}
            <Text
              style={{
                textAlign: "center",
                fontFamily: "monospace",
                fontSize:"14px",
                fontWeight:500
              }}>
                Qty
              </Text>
          </Stack>
          {!isKot && <Text
              style={{
                textAlign: "center",
                fontFamily: "monospace",
                fontSize:"14px",
                fontWeight:500
              }}>
                Amt
              </Text>}
        </Stack>
      </Stack>
      <hr style={{ borderTop: "dotted 1px", width: "100%" }} />
      <Stack
        sx={{
          overflowY: "auto",
          pb: print ? 1 : 20,
          px: {
            xs: 0.25,
          },
        }}
      >
        {order?.order?.map((orderVal, orderINdex) => (
          <>
            <SeperateOrder isKot={isKot} orderVal={orderVal} key={orderINdex} />
          </>
        ))}
      </Stack>

      {print && (
        <Stack
          sx={{
            overflowY: "auto",
            px:0.25
          }}
        >
          {Object?.keys(order?.orderAmount || {})?.map((data, index) => {
            if (data == "orderBeforeAddingGSTValue") {
              return null;
            }
            return data == "discount" ? (
              order?.orderAmount.discount != 0 ? (
                <Stack
                  direction={"row"}
                  key={index}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  py={0}
                >
                  {/* {console.log({call:callfortitle(data), data})} */}
                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: "monospace",
                      fontSize:"14px",
                      fontWeight:500
                    }}>
                    {callfortitle(data)}
                  </Text>
                  <Stack direction={"row"}>
                    <span>- ₹</span>
                    
                    <Text style={{
                      textAlign: "center",
                      fontFamily: "monospace",
                      fontSize:"14px",
                      fontWeight:500
                    }}>{order?.orderAmount[data]}</Text>
                  </Stack>
                </Stack>
              ) : (
                <></>
              )
            ) : data == "finalTotal" ? (
              <></>
            ) : (
              <Stack
                direction={"row"}
                key={index}
                justifyContent={"space-between"}
                alignItems={"center"}
                py={0}
              >
                {/* {console.log({call:callfortitle(data), data})} */}
                <Text style={{
                      textAlign: "center",
                      fontFamily: "monospace",
                      fontSize:"14px",
                      fontWeight:500
                    }}>{callfortitle(data)}</Text>
                <Stack direction={"row"}>
                  <Text style={{
                      textAlign: "center",
                      fontFamily: "monospace",
                      fontSize:"14px",
                      fontWeight:500
                    }}>
                    {(data == "total" ||
                    data == "orderGst" ||
                    data == "orderExcludeGSTValue" ||
                    data == "orderBeforeAddingGSTValue") && <span>₹</span>}
                    {data == "orderExcludeGSTValue" ||
                    data == "orderBeforeAddingGSTValue"
                      ? order?.orderAmount[data] +
                        order?.orderAmount["orderBeforeAddingGSTValue"]
                      : order?.orderAmount[data]}
                  </Text>
                </Stack>
              </Stack>
            );
          })}
          <hr style={{ borderTop: "dotted 1px", width: "100%" }} />
          {print && (
            <Stack
              sx={{
                px: 0,
              }}
            >
              
              <Stack
                sx={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "monospace",
                    fontSize:"18px",
                    fontWeight:900
                  }}
                >
                  Grand Total:
                </Text>
                <Text
                style={{
                  textAlign: "center",
                    fontFamily: "monospace",
                    fontSize:"18px",
                    fontWeight:900
                }}
                >
                  ₹{order?.orderAmount?.total}
                </Text>
              </Stack>
            </Stack>
          )}
          <hr style={{ borderTop: "dotted 1px", width: "100%" }} />
          {restaurant?.print?.billing?.billEndMessage != "" && (
            <Text
              style={{
                textAlign: "center",
                fontFamily: "monospace",
              }}
            >
              {restaurant?.print?.billing?.billEndMessage}
            </Text>
          )}
          <Text
            style={{
              textAlign: "center",
              fontSize: "10px",
              fontFamily: "monospace",
            }}
          >
            powered by etoPOS
          </Text>
          <hr style={{ borderTop: "dotted 1px", width: "100%" }} />
        </Stack>
      )}
    </Stack>
  );
};

export default Orders;
