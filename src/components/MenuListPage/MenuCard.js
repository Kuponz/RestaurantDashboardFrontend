
import { makeStyles } from "@material-ui/core/styles";
import { Box, Paper, Stack } from "@mui/material";
import { Button, Icon, IconButton, InputBase, TextField, Typography } from '@mui/material'
import { useState } from "react";

const MenuCard = ({ items }) => {
    const [val, setValue] = useState(3);

    const decrement = () => {
        setValue(val - 1)
    }
    const increment = () => {
        setValue(val + 1)
    }
    return (
        <div>
            {
                items.map((item) => {
                    const { id, title, price } = item;
                    return (
                        <>
                            <Paper sx={{
                                width: "100%",
                                mx: 1,
                                px: 1,
                                py: 1,
                                borderRadius: 2,
                                my: 1
                            }}
                                elevation={6}
                            >
                                <div >
                                    <div className=" flex align-items w-full ">
                                        <div>
                                            <Stack direction={"row"}>
                                                {title}
                                            </Stack>
                                        </div>
                                        <div>
                                            <span className="price" style={{ color: "#7E7E7E", fontWeight: 700 }}>
                                                {" "}
                                                &#8377;{price}
                                            </span>
                                        </div>
                                    </div>
                                    <Box sx={{
                                        m: 2,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}>
                                        <Button variant='outlined' onClick={decrement}>-</Button>
                                        <Paper><InputBase style={{ paddingLeft: "10px" }} value={val} />
                                        </Paper>
                                        <Button style={{ width: '5%' }} variant='outlined' onClick={increment}>+</Button>
                                    </Box>
                                </div>
                            </Paper>
                        </>
                    );
                })};

        </div>
    );
};
export default MenuCard;