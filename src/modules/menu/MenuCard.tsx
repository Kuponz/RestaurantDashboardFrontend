
import { Box, Paper, Stack, Button, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { flexBox } from "theme/defaultFunction";

const MenuCard = ({ items, val, setValue, variableip }) => {
    const [itemVal, setitemVal] = useState({
        
        
    });
    console.log({itemVal})
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
                        setValue([
                            ...val,
                            {
                                item:items,
                                quantity:1
                            }
                        
                        ])
                    }} variant="outlined" sx={{...flexBox()}}><AddIcon/>Add</Button>
                </Box>
                :
                <Box sx={{
                    display: 'flex',
                    flexDirection:"column",
                    justifyContent: 'space-between',
                    alignItems:"center",
                    gap:1
                }}>
                    <IconButton onClick={()=>variableip(items, "+")}>
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