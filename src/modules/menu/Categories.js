import React from "react";
import { Button, Icon, IconButton, InputBase, TextField, Typography } from '@mui/material'
import { Box, Paper, Stack } from "@mui/material";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { size } from "theme/defaultFunction";
import { tokens } from "theme/theme";
const Categories = ({ categories, filterItems, activeCategory }) => {
    console.log({categories})
    return (


        <div className="btn-container" style={{
            display: 'flex',
            flexDirection: 'row',
            padding: 6,
            gap: 4,
            ...size("100%", "100%"),
            overflowX: 'auto',
            whiteSpace: 'nowrap'
        }}>
            <Button variant='outlined' color={activeCategory._id == "ALL" ? "primary":"secondary"} 
                onClick={() => filterItems({
                    _id:"ALL",
                    categoryName:"All"
                })}> 
                All
            </Button>
            {
                categories?.map((category, index) => {    
                    return (
                        <>
                            <Box>
                                <Button variant='outlined'  color={ activeCategory._id ==  category._id ? "primary":"secondary"} 
                                    key={index}
                                    onClick={() => filterItems(category)}> 
                                    {category?.categoryName}
                                </Button>
                            </Box>
                        </>
                    );
                })
            }
        </div >

    );
};

export default Categories;
