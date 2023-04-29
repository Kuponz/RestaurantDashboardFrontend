
import { Box, Paper, Stack, Button, IconButton, TextField, Typography } from "@mui/material";
import { useReducer, useState } from "react";
import { useEffect } from "react";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { flexBox } from "theme/defaultFunction";
import EditIcon from '@mui/icons-material/Edit';
import { v4 as uuidv4 } from 'uuid';

const MenuCard = ({ items,extraOpen, val, forceUpdate, setValue, variableip, setExtraOpen }) => {
    const [itemVal, setitemVal] = useState({
    });

    // console.log({itemVal})
    useEffect(()=>{
        setitemVal(val.find(vali=>vali.item._id == items._id));

    },[val, items])
    return (
        <>
        <Paper variant="outlined" sx={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            p:1,
            py:2,
            width:{
                xs:"100%",
                md:"48%",
                lg:"30%",
                xl:"32%"
            },
            height:"fit-content",
            backgroundColor:theme=>itemVal && itemVal.quantity > 0 ?theme.palette.secondary.main:theme.palette.background.default
        }}
            elevation={6}
        >
            <Stack sx={{
                justifyContent:{
                    xs:val==0?"center":"space-between"
                },
                height:"100%"
            }}>
                <Stack>
                    <Typography sx={{
                        overflowWrap:"anywhere"
                    }}
                    variant="h4"
                    >{items?.itemName}</Typography>
                    <Typography variant="body2" sx={{
                        fontSize:"18px"
                    }} color={itemVal && itemVal.quantity > 0? "white":"neutral.default"}>
                        &#8377; {items?.price}

                    </Typography>

                </Stack>
                {
                    itemVal && itemVal.quantity > 0?
                    <Button variant="outlined" onClick={()=>variableip(items, "*", parseInt("0"))} sx={{
                        my:1
                    }}>
                        <RemoveIcon/>
                        Remove All 
                    </Button>
                    :
                    <></>
                }
            </Stack>
            {
                !itemVal?
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                   <Button onClick={()=>{
                        console.log({items})
                    if(items?.addons?.length > 0 || items.variations.length > 0){
                        extraOpen.open = true;
                        extraOpen.item = items;
                        extraOpen.quantity = 1;
                        extraOpen.selected = [
                            {
                                variations:[...items?.variations],
                                addons:[...items?.addons],
                                id:uuidv4(),
                            }
                        ];
                        setExtraOpen(extraOpen);
                        console.log({extraOpen})
                        forceUpdate();
                    }else{
                        setValue([
                            ...val,
                            {
                                item:items,
                                quantity:1,
                            }
                        
                        ])
                    }
                    }} variant="outlined" startIcon={<AddIcon/>} sx={{...flexBox()}}>Add</Button>
                </Box>
                :
                
                    items?.addons?.length > 0 || items.variations.length > 0?
                    <>
                        <IconButton onClick={()=>{
                            extraOpen.open = true;
                            extraOpen.item = items;
                            setExtraOpen(extraOpen);
                            console.log({extraOpen})
                            forceUpdate();
                            
                        }}
                        >
                            <EditIcon/>
                        </IconButton>
                    </>
                    :
                    <Box sx={{
                    display: 'flex',
                    flexDirection:"column",
                    justifyContent: 'space-between',
                    alignItems:"center",
                    gap:1
                }}>
                    <IconButton onClick={()=>{
                       
                        variableip(items, "+")
                       
                    }}
                    >
                        <AddIcon/>
                    </IconButton>
                    <Stack sx={{
                        width:"4rem"
                    }}>
                        <TextField value={itemVal.quantity} onChange={(e)=>variableip(items, "*", parseInt(e.target.value))}/>
                    </Stack>
                    <IconButton onClick={()=>variableip(items, "-")}>
                        <RemoveIcon/>
                    </IconButton>

                    </Box>
                    
                }

            
        </Paper>
    </>
    );
};
export default MenuCard;