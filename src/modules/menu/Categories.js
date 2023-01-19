import React from "react";
import { Button, Icon, IconButton, InputBase, TextField, Typography } from '@mui/material'
import { Box, Paper, Stack } from "@mui/material";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { size } from "theme/defaultFunction";
const Categories = ({ categories, filterItems, activeCategory }) => {
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
            {
                categories.map((category, index) => {
                    
                    return (
                        <>
                            <Box>
                                <Button variant='outlined' value={`${activeCategory === category ? "filter-btn active" : "filter-btn"
                                    }`}
                                    key={index}
                                    onClick={() => filterItems(category)}> {category}
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
