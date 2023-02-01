import { Stack } from '@mui/material'
import React, { useState } from 'react'
import ValueForm from './ValueForm'

// {
//   "categoryName":"Main Course",
//   "isAvailable": true,
//   "categoryRank":3

// }

const AddModal = ({isItem}:{isItem:boolean}) => {
  const [data, setData] = useState(()=>{
    if(isItem){
      return ({
        "categoryId":{
          value:"",
          type:"text",
          name:"categoryId",
          title:"Catgory"
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
  return (
    <Stack>
      {Object.keys(data).map((values, index)=>(
        <ValueForm key={index} values={data[values]} data={values}/>
      ))}
    </Stack>
    )
}

export default AddModal