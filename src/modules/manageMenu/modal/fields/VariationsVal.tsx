import {
  Button,
  Divider,
  FormControlLabel,
  IconButton,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useReducer, useState } from "react";
import { flexBox } from "theme/defaultFunction";
import AddIcon from "@mui/icons-material/Add";
import { redDeleteStyle } from "common/styles/deleteStyle";
import RemoveIcon from "@mui/icons-material/Remove";
// const VariationsVal = ({ values, setData, data }) => {
//   const [value, setValues] = useState([]);
//   const hitDelClick = (index)=>{
//     console.log({values, data});
//     let newFilteredValue = values.value.filter((newVal, i)=>i != index);
//     console.log(newFilteredValue, index);
//     values.value = newFilteredValue;
//     setData(dat=>{
//       dat[values.name]  = values
//       return dat;
//     })
//   }
//   console.log(values)
//   const addOnClick = ()=>{
//     setData(dat=>{
//       return dat;
//     })
//   }
//   // useEffect(() => {
//   //   setValues(values);

//   // }, [values])

//   return (
//     <>
//       <Stack sx={{ ...flexBox("row", "space-between") }}>
//         <Typography variant="h5">{values.title}</Typography>
//         <Button
//           variant="outlined"
//           onClick={() => {
//             setValues(
//               [
//                 ...value,
//               {
//               variationName: {
//                 type: "text",
//                 value: "",
//                 name: "variationName",
//                 title: "Variation Name",
//               },
//               available: {
//                 type: "boolean",
//                 value: true,
//                 name: "variationAvaialable",
//                 title: "Avaialable",
//               },
//               variationOptions: {
//                 type: "options",
//                 value: [],
//                 name: "variationOptions",
//                 title: "Variation Options",
//               },
//             }])
//             // setData({
//             //   ...data,
//             //   [values.name]: {
//             //     ...data[values.name],
//             //     value: [
//             //       ...data[values.name].value,
//             //       {
//             //         variationName: {
//             //           type: "text",
//             //           value: "",
//             //           name: "variationName",
//             //           title: "Variation Name",
//             //         },
//             //         available: {
//             //           type: "boolean",
//             //           value: true,
//             //           name: "variationAvaialable",
//             //           title: "Avaialable",
//             //         },
//             //         variationOptions: {
//             //           type: "options",
//             //           value: [],
//             //           name: "variationOptions",
//             //           title: "Variation Options",
//             //         },
//             //       },
//             //     ],
//             //   },
//             // });
//           }}
//         >
//           Add {values.title}
//         </Button>
//       </Stack>
//       {value.map((elm, ind) => {
//         return (
//           <Stack key={ind} gap={1}>
//             {
//               Object.keys(elm).map((vier, id) => (
//                 elm[vier].type == "boolean"?
//                 <BooleanGenerator key={ind} changer={{
//                   name:elm[vier].name,
//                   title:elm[vier].title,
//                   value:elm[vier].value,
//                   type: elm[vier].type,
//                   onChange:(e)=>{
//                     console.log(e.target.value)
//                     value[ind][vier].value = e.target.value;
//                     setValues(value);
//                     // console.log({value});
//                     // value.value[ind][vier].value = e.target.value;
//                     // console.log(values.value);
//                   }
//                 }} />
//                 :
//                 (elm[vier].type == "options"?
//                 <OptionsVal key={ind} index={ind} hitDelClick={hitDelClick}/>
//                 :
//                 <TextField
//                  variant='filled' fullWidth label={elm[vier].title} value={elm[vier].value} name={elm[vier].name} onChange={e=>{
//                   console.log(e.target.value)
//                   value[ind][vier].value = e.target.value;
//                   setValues(value);
//                   console.log(value);
//                  }}/>
//                 )
//               ))
//             }
//             </Stack>
//             )
//         })}
//       {/* <Button>Add Variation</Button> */}
//     </>
//   );
// };

// export default VariationsVal;

// const OptionsVal = ({hitDelClick, index})=>{
//     let jSONVAL= [
//         {
//             optName:{
//                 type:"text",
//                 name:"optName",
//                 title:"name",
//                 value:""
//             },
//             price:{
//                 type:"number",
//                 name:"price",
//                 title:"Price",
//                 value:""
//             },
//             available:{
//                 type:"boolean",
//                 name:"available",
//                 title:"Avaialable",
//                 value:true
//             },
//         },
//     ]
//     const [jsVal, setJsVal] = useState(jSONVAL);
//     return (
//         <Stack sx={{
//             ...flexBox("column")
//         }}
//         gap={1}
//         >
//             {jsVal.map(jsonOpt=>{
//                 return (Object.keys(jsonOpt).map((valJs, ind)=>{
//                     if(jsonOpt[valJs].type == "boolean"){
//                         return (<BooleanGenerator key={ind} changer={{
//                           name:jsonOpt[valJs].name,
//                           title:jsonOpt[valJs].title,
//                           value:jsonOpt[valJs].value,
//                           type: jsonOpt[valJs].type,
//                           onChange:(e)=>{
//                             console.log(e.target.value)
//                           }
//                         }} />)
//                     }else{
//                         return (<TextFieldGenerator key={ind} changer={{
//                           name:jsonOpt[valJs].name,
//                           title:jsonOpt[valJs].title,
//                           value:jsonOpt[valJs].value,
//                           type: jsonOpt[valJs].type,
//                           onChange:(e)=>{
//                             console.log(e.target.value)
//                           }
//                         }} />)
//                     }
//                 }))
//             })}
//             <Stack direction={"row"} gap={2} p={2}>
//                 <IconButton onClick={()=>{
//                     setJsVal([...jsVal, {
//                         optName:{
//                             type:"text",
//                             name:"optName",
//                             title:"name",
//                             value:""
//                         },
//                         price:{
//                             type:"number",
//                             name:"price",
//                             title:"Price",
//                             value:""
//                         },
//                         available:{
//                             type:"boolean",
//                             name:"available",
//                             title:"Avaialable",
//                             value:true
//                         },
//                     },])
//                 }}><PlusOneOutlined/></IconButton>
//                 <IconButton sx={{...redDeleteStyle}} disabled={jsVal.length == 1} onClick={()=>{
//                     // jsVal.pop();
//                     setJsVal(oldjs=>{
//                         oldjs = oldjs.filter((elm, i)=>i == oldjs.length - 1 && (oldjs.length > 1)?false:true);
//                         console.log(oldjs)
//                         return oldjs;
//                     })
//                 }}><RemoveIcon/></IconButton>
//             </Stack>
//             <Stack sx={{

//               flexDirection:{
//                 xs:"column",
//                 md:"row",
//               },
//               gap:1
//             }}>
//               <Button startIcon={<AddIcon/>} variant="outlined">Add</Button>
//               <Button onClick={e=>hitDelClick(index)} startIcon={<DeleteIcon/>} sx={{...redDeleteStyle}}>Delete</Button>
//             </Stack>
//         </Stack>
//     )
// }

const VariationsVal = ({ isAddon = false, values, setData, data }) => {
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  console.log({data});
  const [value, setValue] = useState(() => {
    let newData = [];
    if(isAddon){
      if(data.addons?.value && data.addons.value?.length > 0){
        newData = data?.addons?.value?.map(vari=>{
          return ({
            variationName: vari?.variationName,
            variationAvaialable: vari?.variationAvaialable,
            variationOptions: [...vari?.variationOptions],
            _id:vari?._id
          })
        })
        return newData
  
      }
    }else{
      if(data.variations?.value && data.variations.value?.length > 0){
        newData = data?.variations?.value?.map(vari=>{
          return ({
            variationName: vari?.variationName,
            variationAvaialable: vari?.variationAvaialable,
            variationOptions: [...vari?.variationOptions],
            _id:vari?._id
          })
        })
        return newData
  
      }
    }
    return newData
  });
  const addButtonVariation = () => {
    if(value.length > 0 ){
      if(value[value.length - 1].variationName != "" && value[value.length - 1].variationOptions.length > 0){
        setValue([
          ...value,
          {
            variationName: "",
            variationAvaialable: true,
            variationOptions: [],
          },
        ]);

      }else{
        alert("Please fill All fields in Variation in order to add new Variation!")
      }

    }else{
      setValue([
        {
          variationName: "",
          variationAvaialable: true,
          variationOptions: [],
        },
      ]);
    }
  };
  return (
    <Stack>
      <Stack sx={{ ...flexBox("row", "space-between") }}>
        <Typography variant="h5">{isAddon ? "Addon" : "Variations"}</Typography>
        <Button onClick={addButtonVariation}>
          Add {isAddon ? "Addon" : "Variations"}
        </Button>
      </Stack>
      <Stack>
        {value.map((variObj, index) => (
          <Stack key={index} py={1}>
            <TextField
              onChange={(e) => {
                console.log(e.target.value);
                value[index].variationName = e.target.value;
                console.log(value);
                setValue(value);
                forceUpdate();
                // setValue(val=>{
                //   val[index].variationName = e.target.value;
                //   return val;
                // })
              }}
              variant="filled"
              value={variObj.variationName}
              name={"variationName"}
              label={"Variation Name"}
            />
            <FormControlLabel
              sx={{
                justifyContent: "flex-start",
                flexDirection: "row",
              }}
              control={
                <Switch
                  checked={variObj.variationAvaialable}
                  onChange={(e) => {
                    console.log(e.target.checked);
                    value[index].variationAvaialable = e.target.checked;
                    console.log(value);
                    setValue(value);
                    forceUpdate();
                  }}
                />
              }
              label={"Available"}
              labelPlacement="top"
            />
            {variObj.variationOptions.map((variopt, ind) => (
              <Stack key={ind} p={1} gap={1}>
                <TextField variant="filled" name={"optName"} value={variopt.optName} onChange={(e)=>{
                  value[index].variationOptions[ind].optName = e.target.value;
                  setValue(value);
                  forceUpdate();
                }} label={"Option Name"}/>
                <TextField variant="filled" name={"price"} value={variopt.price} onChange={(e)=>{
                  value[index].variationOptions[ind].price = e.target.value;
                  setValue(value);
                  forceUpdate();
                }} label={"Price"}/>
                <FormControlLabel
                  sx={{
                    justifyContent: "flex-start",
                    flexDirection: "row",
                  }}
                  control={
                    <Switch
                      checked={variopt.available}
                      onChange={(e) => {
                        console.log(e.target.checked);
                        value[index].variationOptions[ind].available = e.target.checked;
                        console.log(value);
                        setValue(value);
                        forceUpdate();
                      }}
                    />
                  }
                  label={"Available"}
                  labelPlacement="top"
                />
                <Divider flexItem/>
              </Stack>
            ))}
            <Stack
              direction={"row"}
              gap={1}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <IconButton
                onClick={() => {
                  value[index].variationOptions.push({
                    optName: "",
                    price: "",
                    available: true,
                  });
                  setValue(value)
                  forceUpdate();
                }}
              >
                <AddIcon />
              </IconButton>
              <IconButton
              onClick={() => {
                if(value[index].variationOptions.length > 1){
                    value[index].variationOptions.pop();
                    setValue(value)
                    forceUpdate();
                }
              }}
                sx={{ ...redDeleteStyle }}
                disabled={variObj.variationOptions.length <= 1}
              >
                <RemoveIcon />
              </IconButton>
              <Button disabled={value.length <= 0} onClick={e=>{
                if(value.length > 0){
                  setValue(value.filter((v, i)=>i != index));
                  forceUpdate();
                }
                if(value.length == 1){
                  setData(dat=>{
                    dat[values.name].value = [];
                    console.log({dat});
                    return dat;
                  })
                }
              }} startIcon={<RemoveIcon/>} sx={{...redDeleteStyle}}>Delete</Button>
            </Stack>
          </Stack>
        ))}
      </Stack>
      {value.length > 0 && (<Button variant="outlined" onClick={()=>{
        console.log({values})

        if(value.length>0 && value[0].variationName != "" && value[0].variationOptions.length != 0){
          setData(dat=>{
            console.log({dat});
            dat[values.name].value = value;
            return dat;
          })
        }else{
          alert("All fields Not Added!")
        }
      }}>Add It</Button>)}
    </Stack>
  );
};

export default VariationsVal;

