import { Button, IconButton, Stack, TextField, ToggleButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { flexBox } from "theme/defaultFunction";
import TextForm from "./TextForm";
import BooleanField from "./BooleanField";
import { MinimizeOutlined, PlusOneOutlined } from "@mui/icons-material";

const VariationsVal = ({ values, setData, data }) => {
  return (
    <>
      <Stack sx={{ ...flexBox("row", "space-between") }}>
        <Typography variant="h5">{values.title}</Typography>
        <Button
          variant="outlined"
          onClick={() => {
            setData({
              ...data,
              [values.name]: {
                ...data[values.name],
                value: [
                  ...data[values.name].value,
                  {
                    variationName: {
                      type: "text",
                      value: "",
                      name: "variationName",
                      title: "Variation Name",
                    },
                    available: {
                      type: "boolean",
                      value: "",
                      name: "variationName",
                      title: "Variation Name",
                    },
                    variationOptions: {
                      type: "options",
                      value: [],
                      name: "variationOptions",
                      title: "Variation Options",
                    },
                  },
                ],
              },
            });
          }}
        >
          Add {values.title}
        </Button>
      </Stack>
      {values.value.map((elm, ind) => {
        return Object.keys(elm).map((vier, ind) => {
        if (elm[vier].type == "boolean") {
            return <BooleanField key={ind} values={values} setData={setData} />;
          } else if (elm[vier].type == "options") {
            return (<OptionsVal key={ind}/>)
          } else {
            return <TextForm key={ind} values={values} setData={setData} />;
          }
        });
      })}
      <Button>Add Variation</Button>
    </>
  );
};

export default VariationsVal;


const OptionsVal = ()=>{
    let jSONVAL= [
        {
            optName:{
                type:"text",
                name:"optName",
                title:"name",
                value:""
            },
            price:{
                type:"number",
                name:"price",
                title:"Price",
                value:""
            },
            available:{
                type:"boolean",
                name:"available",
                title:"Avaialable",
                value:true
            },
        },
    ]
    const [jsVal, setJsVal] = useState(jSONVAL);
    return (
        <Stack sx={{
            ...flexBox("column")
        }}>
            {jsVal.map(jsonOpt=>{
                return (Object.keys(jsonOpt).map(valJs=>{
                    if(jsonOpt[valJs].type == "boolean"){
                        return (<BooleanField/>)
                    }else{
                        return (<TextForm/>)
                    }
                }))
            })}
            <Stack direction={"row"} gap={2}>
                <IconButton onClick={()=>{
                    setJsVal([...jsVal, {
                        optName:{
                            type:"text",
                            name:"optName",
                            title:"name",
                            value:""
                        },
                        price:{
                            type:"number",
                            name:"price",
                            title:"Price",
                            value:""
                        },
                        available:{
                            type:"boolean",
                            name:"available",
                            title:"Avaialable",
                            value:true
                        },
                    },])
                }}><PlusOneOutlined/></IconButton>
                <IconButton onClick={()=>{
                    // jsVal.pop();
                    setJsVal(oldjs=>{
                        oldjs = oldjs.filter((elm, i)=>i == oldjs.length - 1 && (oldjs.length > 1)?false:true);
                        console.log(oldjs)
                        return oldjs;
                    })
                }}><MinimizeOutlined/></IconButton>
            </Stack>
        </Stack>
    )
}