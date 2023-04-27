import { Button, Divider, Paper, Stack, Typography } from '@mui/material'
import { OrderItems } from 'modules/orders/OrderItems';
import moment from 'moment';
import React from 'react'
import { flexBox } from 'theme/defaultFunction';

const OrderCards = ({order, open, setOpen, setWatchOrder}:{
    order: {
        orderAmount: {
            totalItem: number;
            orderBeforeAddingGSTValue: number;
            orderExcludeGSTValue: number;
            orderGst: number;
            total: number;
        };
        paymentStatus: boolean;
        isDeleted: boolean;
        isEdited: boolean;
        "specialInstruction": String,
        "_id": String,
        "restaurantId": String,
        "order": [
            {
                "specialInstruction": String,
                "isEdited": Boolean,
                "_id": String,
                "quantity": number,
                "menuId": {
                    "_id": String,
                    "itemName": String
                },
                "cost": number
            },
        ],
        "orderStatus": String,
        "createdUser": String,
        "table": {
            "_id": String,
            "TableName": String
        },
        "orderType": String,
        "createdAt": String,
        "updatedAt": String,
    },
    open:Boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    console.log(moment.utc(order?.updatedAt).format("DD/MM/YYYY HH:MM").toString());
    console.log(order?.updatedAt);
    console.log( moment.utc(order?.updatedAt).local().startOf('seconds').fromNow());
  return (
    <Paper sx={{
        height:"fit-content",
        p:1,
        width:{
            xs:"100%",
            md:"45%",
            lg:"30%"
        }
    }}>
        <Paper elevation={0} variant="free" sx={{ p:2}}>
          <Stack direction="row" justifyContent={"space-between"}>
              <Typography variant="h4" fontWeight={600} color="white">
                {order?._id.slice(order?._id.length- 5,order?._id.length )}
              </Typography>
              <Stack direction={"column"}>
                <Typography variant="h6" color={"white"}>
                    {
                        moment.utc(order?.updatedAt).format("DD/MM/YYYY HH:MM").toString()
                    }
                    </Typography>
                    <Typography variant="h6" color={"white"}>
                    {
                    moment.utc(order?.updatedAt).local().startOf('seconds').fromNow()
                    }
                </Typography>
              </Stack>
          </Stack>
        </Paper>
        <Paper elevation={0}>
            <Stack p={1} gap={0.5}>
                {order?.order?.map((menuData, idn) => {
                return (idn < 3 && <OrderItems isDashboardViewer={true} menuData={menuData} key={idn}/>)
                })}
                <Typography variant='body2'>...</Typography>
                <Divider/>
                <Stack direction={"row"} sx={{
                    ...flexBox("row", "space-between")
                }}>
                    <Typography variant='h5'>Total : {order.orderAmount.total}</Typography>
                    <Typography variant='button' 
                    onClick={()=>{
                        setWatchOrder({...order});
                        setOpen(true);
                    }}
                    color={"primary.main"} sx={{
                        cursor:"pointer"
                    }}>.. Read More</Typography>  
                </Stack>
            </Stack>
        </Paper>
      </Paper>
  )
}

export default OrderCards