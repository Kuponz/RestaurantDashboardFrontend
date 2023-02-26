import React, { useState } from "react";
import { Button, Icon, IconButton, InputBase, TextField, Typography, useMediaQuery } from '@mui/material'
import { Box, Paper, Stack } from "@mui/material";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { size } from "theme/defaultFunction";
import { tokens } from "theme/theme";
import { SentimentNeutral } from "@mui/icons-material";
import { useTheme } from "@emotion/react";

const Categories = ({ categories, filterItems, activeCategory, setsearchMenuItem }) => {
    console.log({ categories })
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    return (
        matches?
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
                                <Button variant='outlined' color={activeCategory._id == category._id ? "error" : "primary"}
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
        :
        <Stack sx={{
            height:"100%",
            overflowY:"auto",
            gap:1
        }}>
        <Paper
        variant={activeCategory._id == "ALL"?"reserved":"free"}
        sx={{cursor:"pointer", p:2}}
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
            <Typography
                color={"white"} 

            >
                ALL
            </Typography>
        </Paper>
        {
            categories?.map((category, index) => {
                return (
                    <>
                        <Paper 
                        variant={activeCategory._id == category._id?"reserved":"free"}
                        onClick={() => {
                            setsearchMenuItem({
                                open:false,
                                menuItem:[],
                                value:""
                            }) 
                            filterItems(category)
                        }}
                        sx={{
                            p:1,
                            py:2,
                            cursor:"pointer"
                        }}
                        >
                            <Typography
                                color={"white"} 

                            >
                                {category?.categoryName}
                            </Typography>
                        </Paper>
                    </>
                    );
            })
        }
        </Stack>
        );
};
        // <div className="btn-container" style={{
        //     display: 'inline-flex ',
        //     flexDirection: 'column',
        //     padding: 10,
        //     gap: 4,
        //     ...size("100%", "100%"),
        //     overflowY: 'auto',
        //     whiteSpace: 'nowrap'
        // }}
        // >
            // <Button variant='outlined' color={activeCategory._id == "ALL"?"error":"primary"}
            //     onClick={() => {
            //         setsearchMenuItem({
            //             open:false,
            //             menuItem:[],
            //             value:""
            //         })
            //         filterItems({
            //             _id: "ALL",
            //             categoryName: "All"
            //         })
            //     }}
                    
            // >
            //     All
            // </Button>
        //     {
        //         categories?.map((category, index) => {
        //             return (
        //                 <p key={index}>
        //                 They say the fishing is excellent at Lake
        //                 <em style={{
        //                     overflowWrap:"anywhere"
        //                 }}>Chargoggagoggmanchauggagoggchaubunagungamaugg</em>,
        //                 though I've never been there myself. (<code>word-break</code>)
        //                 </p>
        //                 );
        //                 // <>
        //                 //     <Paper 
        //                 //     variant="free"
        //                 //     color={activeCategory._id == category._id ? "error" : "white"} 
        //                 //     onClick={() => {
        //                 //         setsearchMenuItem({
        //                 //             open:false,
        //                 //             menuItem:[],
        //                 //             value:""
        //                 //         }) 
        //                 //         filterItems(category)
        //                 //     }}
        //                 //     sx={{
        //                 //         color:"white",
        //                 //         p:1,
        //                 //         py:2,
        //                 //         textOverflow:"ellipsis"
        //                 //     }}
        //                 //     >
        //                 //         <Typography
        //                 //             color={activeCategory._id == category._id ? "error" : "white"} 

        //                 //         >
        //                 //             {category?.categoryName}
        //                 //         </Typography>
        //                 //     </Paper>
        //                 // </>
        //         })
        //     }
        // </div>

export default Categories;
