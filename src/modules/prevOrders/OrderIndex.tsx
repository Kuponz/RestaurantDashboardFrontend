import { Stack } from '@mui/material'
import React, { useState } from 'react'
import Filters from './Filters'
import OrderCards from './OrderCards'
import BasicModal from "../../common/modalGenerator/Modal";
import ModalCreator from './ModalCreator';
const OrderIndex = () => {
    const [open, setOpen] = useState(false);
    const orderJSon=[
        {
            "orderAmount": {
                "totalItem": 3,
                "orderBeforeAddingGSTValue": 400,
                "orderExcludeGSTValue": 0,
                "orderGst": 20,
                "total": 420
            },
            "paymentStatus": false,
            "isDeleted": false,
            "isEdited": false,
            "specialInstruction": "",
            "_id": "63d541b4faa38d0014bfef22",
            "restaurantId": "63cfa7b41912f42108a5d053",
            "order": [
                {
                    "specialInstruction": "",
                    "isEdited": false,
                    "_id": "63d541b4faa38d0014bfef23",
                    "quantity": 1,
                    "menuId": {
                        "ignoreTaxes": false,
                        "ignoreDiscounts": false,
                        "_id": "63cfb5ca653cc10014ed7107",
                        "categoryId": "63cfb59b653cc10014ed70ff",
                        "packingCharges": "0",
                        "itemrank": "5",
                        "favorite": true,
                        "restaurantId": "63cfa7b41912f42108a5d053",
                        "available": true,
                        "itemName": "Plain Rice",
                        "itemShortName": "PR",
                        "itemAttributeid": "501",
                        "itemdescription": "Rice with no jeera",
                        "minimumpreparationtime": "5 min",
                        "price": "70",
                        "itemTax": "0",
                        "variation": [],
                        "addon": [],
                        "createdAt": "2023-01-24T10:41:14.767Z",
                        "updatedAt": "2023-01-24T10:41:14.767Z",
                        "__v": 0
                    },
                    "cost": 70
                },
                {
                    "specialInstruction": "",
                    "isEdited": false,
                    "_id": "63d541b4faa38d0014bfef24",
                    "quantity": 1,
                    "menuId": {
                        "ignoreTaxes": false,
                        "ignoreDiscounts": false,
                        "_id": "63cfb581653cc10014ed70f9",
                        "categoryId": "63cfb43cdd51640014090de3",
                        "packingCharges": "0",
                        "itemrank": "5",
                        "favorite": true,
                        "restaurantId": "63cfa7b41912f42108a5d053",
                        "available": true,
                        "itemName": "Hara Bhara Kabab",
                        "itemShortName": "GK",
                        "itemAttributeid": "201",
                        "itemdescription": "Kebab",
                        "minimumpreparationtime": "5 min",
                        "price": "150",
                        "itemTax": "0",
                        "variation": [],
                        "addon": [],
                        "createdAt": "2023-01-24T10:40:01.890Z",
                        "updatedAt": "2023-01-24T10:40:01.890Z",
                        "__v": 0
                    },
                    "cost": 150
                },
                {
                    "specialInstruction": "",
                    "isEdited": false,
                    "_id": "63d541b4faa38d0014bfef25",
                    "quantity": 1,
                    "menuId": {
                        "ignoreTaxes": false,
                        "ignoreDiscounts": false,
                        "_id": "63cfb5ec653cc10014ed710d",
                        "categoryId": "63cfb59b653cc10014ed70ff",
                        "packingCharges": "0",
                        "itemrank": "5",
                        "favorite": true,
                        "restaurantId": "63cfa7b41912f42108a5d053",
                        "available": true,
                        "itemName": "Pulao",
                        "itemShortName": "PUR",
                        "itemAttributeid": "503",
                        "itemdescription": "Rice with some basic Ingredients",
                        "minimumpreparationtime": "5 min",
                        "price": "180",
                        "itemTax": "0",
                        "variation": [],
                        "addon": [],
                        "createdAt": "2023-01-24T10:41:48.827Z",
                        "updatedAt": "2023-01-24T10:41:48.827Z",
                        "__v": 0
                    },
                    "cost": 180
                }
            ],
            "orderStatus": "BILLING",
            "createdUser": "",
            "table": "63cfb39edd51640014090db8",
            "orderType": "DINEIN",
            "createdAt": "2023-01-28T15:39:32.308Z",
            "updatedAt": "2023-01-28T15:39:44.965Z",
            "__v": 0
        }
    ]
  return (
    <Stack sx={{
        height:"100vh",
        width:"100%",
        overflow:"hidden"
    }}>
        <Filters/>
        <Stack sx={{
            height:"100%",
            overflowY:"scroll",
            gap:2,
            p:2,
            pt:3,
            pb:5,
            flexDirection:{
                xs:"column",
                md:"row"
            },
            flexWrap:"wrap",
        }}>
            {
            orderJSon.map((order, index)=>(
                    <OrderCards order={order} key={index} open={open} setOpen={setOpen}/>
            ))
            }
        </Stack>
        <BasicModal open={open} setOpen={setOpen} title={"Complete Order"}>
            <ModalCreator/>
        </BasicModal>
    </Stack>
  )
}

export default OrderIndex