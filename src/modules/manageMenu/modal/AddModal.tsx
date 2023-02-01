import { Button, CircularProgress, Stack } from '@mui/material'
import React, { useRef, useState } from 'react'
import ValueForm from './ValueForm'
import { useMutation } from '@tanstack/react-query'
import { createCategory, createItem } from 'store/api/axiosSetup'

// {
//   "categoryName":"Main Course",
//   "isAvailable": true,
//   "categoryRank":3

// }

const AddModal = ({isItem, userToken, restroState, setOpen}:{isItem:boolean}) => {
  const [data, setData] = useState(()=>{
    if(isItem){
      return ({
        "categoryId":{
          value:"",
          type:"select",
          name:"categoryId",
          title:"Catgeory",
          selectItem:restroState.restaurant.categories.map(cate=>{
            return ({
              name:cate.categoryName,
              id:cate._id,
            })
          })
        },
        "packingCharges":{
          value:"",
          type:"text",
          name:"packingCharges",
          title:"Packing Charges"
        },
        "itemrank":{
          value:"",
          type:"text",
          name:"itemrank",
          title:"Item Rank"
        },
        "ignoreTaxes":{
          value:false,
          type:"boolean",
          name:"ignoreTaxes",
        },
        "favorite":{
          value:true,
          type:"boolean",
          name:"favorite",
        },
        "ignoreDiscounts":{
          value:false,
          type:"boolean",
          name:"ignoreDiscounts",

        },
        "available":{
          value:true,
          type:"boolean",
          name:"available",
          
        }, 
        "itemName":{
          value:"",
          type:"text",
          name:"itemName",
          title:"Item Name"
        }, 
        "itemShortName":{
          value:"",
          type:"text",
          name:"itemShortName",
          title:"Item Short Name"
        }, 
        "itemAttributeid":{
          value:"",
          type:"text",
          name:"itemAttributeid",
          title:"Item Attribute id"
        }, 
        "itemdescription":{
          value:"",
          type:"text",
          name:"itemdescription",
          title:"Item Description"
        }, 
        "minimumpreparationtime":{
          value:"",
          type:"text",
          name:"minimumpreparationtime",
          title:"minimumpreparationtime"
        }, 
        "price":{
          value:"",
          type:"text",
          name:"price",
          title:"price"
        }, 
        "itemTax":{
          value:"",
          type:"text",
          name:"itemTax",
          title:"itemTax"
        }
    
    })
    }else{
      return ({
        "categoryName":{
          value:"",
          type:"text",
          name:"categoryName",
          title:"Category Name"
        },
        "isAvailable": {
          value:true,
          type:"boolean",
          name:"isAvailable",
          title:"Available"
          
        },
        "categoryRank":{
          value:"",
          type:"number",
          name:"categoryRank",
          title:"Category Rank"
        }
      })
    }
  })
  const {mutate, isLoading, error} = useMutation(createCategory, {
    onSuccess:(data, variables, context)=> {
        console.log({
            data:data.data.data,
            variables,
            context,
        })
        restroState.setCategories([...restroState.restaurant.categories, data.data.data?.categoryResult])
        // setNewUser(false);
        setOpen(false);
    },
    onError:(error, variables, context)=> {
      console.log(error);
    },
  })
  const itemMutatation = useMutation(createItem, {
    onSuccess:(data, variables, context)=> {
        console.log({
            data:data.data.data,
            variables,
            context,
        })
        
        let categoryAddedRestro = restroState.restaurant.category.map(cat=>{
          if(cat._id == data.data.data.categoryResult)
          {
            return data.data.data.categoryResult;
          }else{
            return cat;
          }
        })
        restroState.setCategories([...categoryAddedRestro])
        setOpen(false);

        // setNewUser(false);
    },
    onError:(error, variables, context)=> {
      console.log(error);
    },
  })
  return (
    <Stack sx = {{
      gap:1,
      p:1,
      overflowX:"hidden"
    }}>
      {Object.keys(data).map((values, index)=>(
        <ValueForm setData = {setData} key={index} values={data[values]} data={values}/>
      ))}
      <Button onClick={()=>{
        let sendData={};
        if(isItem){
          sendData={
          "categoryId":data.categoryId?.value,
          "packingCharges":data.packingCharges?.value,
          "itemrank":data.itemrank?.value,
          "ignoreTaxes":data.ignoreTaxes?.value,
          "favorite":data.favorite?.value,
          "ignoreDiscounts":data.ignoreDiscounts?.value,
          "available":data.available?.value, 
          "itemName":data.itemName?.value, 
          "itemShortName":data.itemShortName?.value, 
          "itemAttributeid":data.itemAttributeid?.value, 
          "itemdescription":data.itemdescription?.value, 
          "minimumpreparationtime":data.minimumpreparationtime?.value, 
          "price":data.price?.value, 
          "itemTax":data.itemTax?.value
          }
          console.log(sendData)
          itemMutatation.mutate({
            sendData,
            headerAuth:userToken.jwtToken
          })
        }else{
          sendData={
            "categoryName":data["categoryName"]?.value,
            "isAvailable": data.isAvailable?.value,
            "categoryRank":data.categoryRank?.value
          }
          console.log(sendData)
          mutate({
            sendData,
            headerAuth:userToken.jwtToken
          })
        }
        
      }} variant='contained' disabled={(isLoading || itemMutatation.isLoading)}>{ (isLoading || itemMutatation.isLoading)?<CircularProgress/>:"Add"}</Button>
    </Stack>
    )
}

export default AddModal