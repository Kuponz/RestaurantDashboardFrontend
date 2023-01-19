
import { makeStyles } from "@material-ui/core/styles";
import { Box, Paper, Stack } from "@mui/material";
import { Button, Icon, IconButton, InputBase, TextField, Typography } from '@mui/material'
import { useState } from "react";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { flexBox, size } from "theme/defaultFunction";

const MenuCard = ({ items }) => {
    const { id, title, price } = items;

    const [val, setValue] = useState(0);

    const decrement = () => {
        if(val<=0){

        }else{
            setValue(val - 1)
        }
    }
    const increment = () => {
        setValue(val + 1)
    }
    return (
        <>
        <Paper sx={{
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
            backgroundColor:theme=>val > 0 ?theme.palette.secondary.main:theme.palette.background.default
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
                    }}>{title}</Typography>
                    <Typography variant="body2" color={val > 0? "white":"neutral.default"}>
                        &#8377;{price}

                    </Typography>

                </Stack>
                {
                    val>0?
                    <Button variant="outlined" onClick={()=>setValue(0)} sx={{
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
                val <=0?
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>

                   <Button onClick={increment} variant="outlined" sx={{...flexBox()}}><AddIcon/>Add</Button>
                </Box>
                :
                <Box sx={{
                    display: 'flex',
                    flexDirection:"column",
                    justifyContent: 'space-between',
                    alignItems:"center",
                    gap:1
                }}>
                    <IconButton onClick={increment}>
                        <AddIcon/>
                    </IconButton>
                    <Stack sx={{
                        width:"4rem"
                    }}>
                        <TextField value={val} onChange={e=>{
                            if(e.target.value == ""){
                                setValue(parseInt(0))

                            }
                            setValue(parseInt(e.target.value))
                        }}/>
                    </Stack>
                    <IconButton onClick={decrement}>
                        <RemoveIcon/>
                    </IconButton>

                </Box>

            }
        </Paper>
    </>
    );
};
export default MenuCard;