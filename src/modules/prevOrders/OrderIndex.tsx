import { Button, CircularProgress, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Filters from './Filters'
import OrderCards from './OrderCards'
import BasicModal from "../../common/modalGenerator/Modal";
import ModalCreator from './ModalCreator';
import { userestaurantStore } from 'store/restaurant/restaurantStore';
import { useUserStore } from 'store/user/userzustandstore';
import { useMutation } from '@tanstack/react-query';
import { getorderHistory } from 'store/api/axiosSetup';
import dayjs from 'dayjs';
import TopBar from 'common/topBar/TopBar';


type Tfilter = {
    startDate: dayjs.Dayjs;
    endDate: dayjs.Dayjs;
    restaurantId: string;
    pageNumber: number;
    pageSize: number;
    headerAuth:string;
    pageCounts:number;
  };
const OrderIndex = () => {
    const [open, setOpen] = useState(false);
    const restaurant = userestaurantStore(state=>state.restaurant);
    const user = useUserStore(state=>state.user);
    const [orders, setOrder] = useState([]);
    const [value, setValue] = React.useState<Tfilter>({
        startDate: dayjs(),
        endDate: dayjs(),
        restaurantId: restaurant.restaurantInfo._id,
        pageNumber: 1,
        pageSize: 25,
        headerAuth:user.jwtToken,
        pageCounts:1,
      });
    const [watchOrder, setWatchOrder] = useState({});
    const {mutate, isLoading } = useMutation(getorderHistory,{
        onSuccess:(state)=>{
            console.log(state.data.data);
            console.log(state.data.data.orders);
            // {
            //     "orders": [
            //         {
            //             "orderAmount": {
            //                 "totalItem": 2,
            //                 "orderBeforeAddingGSTValue": 70,
            //                 "orderExcludeGSTValue": 100,
            //                 "orderGst": 3.5,
            //                 "total": 173.5
            //             },
            //             "paymentStatus": true,
            //             "isDeleted": false,
            //             "isEdited": false,
            //             "specialInstruction": "",
            //             "_id": "63db90696033ac00147d64bd",
            //             "restaurantId": "63cfa7b41912f42108a5d053",
            //             "order": [
            //                 {
            //                     "specialInstruction": "",
            //                     "isEdited": false,
            //                     "_id": "63db90696033ac00147d64be",
            //                     "quantity": 1,
            //                     "menuId": {
            //                         "ignoreTaxes": false,
            //                         "ignoreDiscounts": false,
            //                         "_id": "63cfb5ca653cc10014ed7107",
            //                         "categoryId": "63cfb59b653cc10014ed70ff",
            //                         "packingCharges": "0",
            //                         "itemrank": "5",
            //                         "favorite": true,
            //                         "restaurantId": "63cfa7b41912f42108a5d053",
            //                         "available": true,
            //                         "itemName": "Plain Rice",
            //                         "itemShortName": "PR",
            //                         "itemAttributeid": "501",
            //                         "itemdescription": "Rice with no jeera",
            //                         "minimumpreparationtime": "5 min",
            //                         "price": "70",
            //                         "itemTax": "0",
            //                         "variation": [],
            //                         "addon": [],
            //                         "createdAt": "2023-01-24T10:41:14.767Z",
            //                         "updatedAt": "2023-01-24T10:41:14.767Z",
            //                         "__v": 0
            //                     },
            //                     "cost": 70
            //                 },
            //                 {
            //                     "specialInstruction": "",
            //                     "isEdited": false,
            //                     "_id": "63db90696033ac00147d64bf",
            //                     "quantity": 1,
            //                     "menuId": {
            //                         "ignoreTaxes": true,
            //                         "ignoreDiscounts": true,
            //                         "_id": "63db5d1e6033ac00147d6402",
            //                         "categoryId": "63db5ce76033ac00147d63fa",
            //                         "packingCharges": "0",
            //                         "itemrank": "1",
            //                         "favorite": false,
            //                         "restaurantId": "63cfa7b41912f42108a5d053",
            //                         "available": true,
            //                         "itemName": "Chicken Shawarma(Pita)",
            //                         "itemShortName": "CSP",
            //                         "itemAttributeid": "001",
            //                         "itemdescription": "",
            //                         "minimumpreparationtime": "10",
            //                         "price": "100",
            //                         "itemTax": "0",
            //                         "variation": [],
            //                         "addon": [],
            //                         "createdAt": "2023-02-02T06:50:06.701Z",
            //                         "updatedAt": "2023-02-02T06:50:06.701Z",
            //                         "__v": 0
            //                     },
            //                     "cost": 100
            //                 }
            //             ],
            //             "orderStatus": "COMPLETED",
            //             "createdUser": {
            //                 "restaurantLinked": [
            //                     "63cfa7b41912f42108a5d053"
            //                 ],
            //                 "accesss": [],
            //                 "_id": "63cfa70f1912f42108a5d04f",
            //                 "name": "Test etoPOS",
            //                 "pin": "$2b$10$Tr9vqfenoyHPzkxSvBh6keZPeKgW6/.dh8.oOWKt5sBWB4RabyMDu",
            //                 "mobileNumber": "1231231234",
            //                 "role": "OWNER",
            //                 "isLogin": true,
            //                 "createdAt": "2023-01-24T09:38:23.122Z",
            //                 "updatedAt": "2023-02-01T13:12:04.935Z",
            //                 "__v": 0,
            //                 "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGVOdW1iZXIiOiIxMjMxMjMxMjM0Iiwicm9sZSI6Ik9XTkVSIiwiX2lkIjoiNjNjZmE3MGYxOTEyZjQyMTA4YTVkMDRmIiwiaWF0IjoxNjc1MjU3MTI0LCJleHAiOjE2Nzc4NDkxMjR9.WdRH1M4Iz8RkVWZMUAMd_KT6O-U_pvQXAbvCAbwHmdo"
            //             },
            //             "table": {
            //                 "status": "VACANT",
            //                 "_id": "63cfb3badd51640014090dc5",
            //                 "TableName": "LT #1",
            //                 "tableCapacity": 8,
            //                 "restaurantId": "63cfa7b41912f42108a5d053",
            //                 "floor": "63cfb3a7dd51640014090dbe",
            //                 "createdAt": "2023-01-24T10:32:26.371Z",
            //                 "updatedAt": "2023-02-02T10:45:50.442Z",
            //                 "__v": 0,
            //                 "orderId": null,
            //                 "waiter": null
            //             },
            //             "orderType": "DINEIN",
            //             "createdAt": "2023-02-02T10:28:57.910Z",
            //             "updatedAt": "2023-02-02T10:45:50.221Z",
            //             "__v": 0,
            //             "isCouponClaimed": false,
            //             "paymentDetails": {
            //                 "paidVia": "CARD"
            //             }
            //         },
            //         {
            //             "orderAmount": {
            //                 "totalItem": 1,
            //                 "orderBeforeAddingGSTValue": 0,
            //                 "orderExcludeGSTValue": 20,
            //                 "orderGst": 0,
            //                 "total": 20
            //             },
            //             "paymentStatus": true,
            //             "isDeleted": false,
            //             "isEdited": false,
            //             "specialInstruction": "",
            //             "_id": "63db5c3b6033ac00147d63c3",
            //             "restaurantId": "63cfa7b41912f42108a5d053",
            //             "order": [
            //                 {
            //                     "specialInstruction": "",
            //                     "isEdited": false,
            //                     "_id": "63db5c3b6033ac00147d63c4",
            //                     "quantity": 1,
            //                     "menuId": {
            //                         "ignoreTaxes": true,
            //                         "ignoreDiscounts": false,
            //                         "_id": "63dac0742b3d863650ba0b35",
            //                         "categoryId": "63cfb43cdd51640014090de3",
            //                         "packingCharges": "10",
            //                         "itemrank": "5",
            //                         "favorite": false,
            //                         "restaurantId": "63cfa7b41912f42108a5d053",
            //                         "available": true,
            //                         "itemName": "Bottle Pani",
            //                         "itemShortName": "pni",
            //                         "itemAttributeid": "00",
            //                         "itemdescription": "Water",
            //                         "minimumpreparationtime": "5min",
            //                         "price": "20",
            //                         "itemTax": "0",
            //                         "variation": [],
            //                         "addon": [],
            //                         "createdAt": "2023-02-01T19:41:40.811Z",
            //                         "updatedAt": "2023-02-01T19:41:40.811Z",
            //                         "__v": 0
            //                     },
            //                     "cost": 20
            //                 }
            //             ],
            //             "orderStatus": "COMPLETED",
            //             "createdUser": {
            //                 "restaurantLinked": [
            //                     "63cfa7b41912f42108a5d053"
            //                 ],
            //                 "accesss": [],
            //                 "_id": "63d965e7d4a4140014092e53",
            //                 "name": "New Test",
            //                 "pin": "$2b$10$axLPYKwGZKIzFW2dwgMJq.Es7Kw5y2xenbGU/JokNyZ3/INJYpKoi",
            //                 "mobileNumber": "9999999999",
            //                 "role": "OWNER",
            //                 "isLogin": true,
            //                 "createdAt": "2023-01-31T19:03:03.453Z",
            //                 "updatedAt": "2023-02-02T03:57:01.904Z",
            //                 "__v": 0,
            //                 "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGVOdW1iZXIiOiI5OTk5OTk5OTk5Iiwicm9sZSI6Ik9XTkVSIiwiX2lkIjoiNjNkOTY1ZTdkNGE0MTQwMDE0MDkyZTUzIiwiaWF0IjoxNjc1MzEwMjIxLCJleHAiOjE2Nzc5MDIyMjF9.2H277Vxv7yzr6xObfeovsoX3a3k8M5z0KrgzPdotM8M"
            //             },
            //             "table": {
            //                 "status": "VACANT",
            //                 "_id": "63cfb3badd51640014090dc5",
            //                 "TableName": "LT #1",
            //                 "tableCapacity": 8,
            //                 "restaurantId": "63cfa7b41912f42108a5d053",
            //                 "floor": "63cfb3a7dd51640014090dbe",
            //                 "createdAt": "2023-01-24T10:32:26.371Z",
            //                 "updatedAt": "2023-02-02T10:45:50.442Z",
            //                 "__v": 0,
            //                 "orderId": null,
            //                 "waiter": null
            //             },
            //             "orderType": "DINEIN",
            //             "createdAt": "2023-02-02T06:46:19.635Z",
            //             "updatedAt": "2023-02-02T06:46:43.971Z",
            //             "__v": 0,
            //             "isCouponClaimed": false,
            //             "paymentDetails": {
            //                 "paidVia": "CASH"
            //             }
            //         }
            //     ],
            //     "totalPages": 1
            // }
            setValue({...value, pageCounts:state?.data?.data?.totalPages});
            setOrder(state.data.data.orders);
        }
    })
    useEffect(()=>{
        mutate(value);
    },[])
  return (
    <Stack sx={{
        height:"100vh",
        width:"100%",
        overflow:"hidden",
        p:2,
    }}>
        <TopBar backUrl={"/"} home={true} title={`${orders.length ?? ""} orders`}>    
            <Filters mutate={mutate} isLoading={isLoading} restaurant={restaurant} user={user} setValue={setValue} value={value}/>  
        </TopBar>
        <Stack sx={{
            height:"100%",
            overflowY:"auto",
            gap:2,
            p:2,
            pt:3,
            pb:5,
            flexDirection:"row",
            flexWrap:"wrap",
        }}>
        {isLoading ?
        <><CircularProgress/></>
        :
            orders.map((order, index)=>(
                <OrderCards order={order} key={index} open={open} setOpen={setOpen} setWatchOrder={setWatchOrder}/>
            ))
            
        }
        </Stack>
        <BasicModal open={open} setOpen={setOpen} title={"Complete Order"}>
            <ModalCreator setWatchOrder={setWatchOrder} watchOrder={watchOrder} open={open} setOpen={setOpen}/>
        </BasicModal>
    </Stack>
  )
}

export default OrderIndex