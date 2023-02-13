import React, { useState } from "react";
import { Button, Icon, IconButton, InputBase, TextField, Typography } from '@mui/material'
import { Box, Paper, Stack } from "@mui/material";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { size } from "theme/defaultFunction";
import { tokens } from "theme/theme";
import { SentimentNeutral } from "@mui/icons-material";

const Categories = ({ categories, filterItems, activeCategory, setsearchMenuItem }) => {
    console.log({ categories })
    return (
        <div className="btn-container" style={{
            display: 'inline-flex ',
            flexDirection: 'row',
            padding: 10,
            gap: 4,
            ...size("100%", "100%"),
            overflowX: 'auto',
            whiteSpace: 'nowrap'
        }}
        >
            <Button variant='outlined' color={activeCategory._id == "ALL"?"error":"primary"}
                onClick={() => {
                    setsearchMenuItem({
                        open:false,
                        menuItem:[],
                        value:""
                    })
                    filterItems({
                        _id: "ALL",
                        categoryName: "All"
                    })
                }}
                    
            >
                All
            </Button>
            {
                categories?.map((category, index) => {
                    return (
                        <>
                            <Box>
                                <Button variant='outlined' color={activeCategory._id == category._id?"error":"primary"}
                                    key={index}
                                    onClick={() => {
                                        setsearchMenuItem({
                                            open:false,
                                            menuItem:[],
                                            value:""
                                        }) 
                                        filterItems(category)}}
                                >
                                    {category?.categoryName}
                                </Button>
                            </Box>
                        </>
                    );
                })
            }
        </div>
    );
};

export default Categories;
