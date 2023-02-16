
import { Button, Paper, Typography, CircularProgress, Box, Stack, ToggleButtonGroup, ToggleButton, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AdjustIcon from '@mui/icons-material/Adjust';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import { flexBox } from "theme/defaultFunction";
import { tokens } from "theme/theme";


export default function SalesBox(prop) {
    return (
        <>

            <Paper sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "90px",
                cursor: "pointer",
                direction: 'row',
                p: 1,
                py: 2,
                mt: 2,
                pl: 2,
                pr: 2,
                width: {
                    xs: "100%",
                    md: "48%",
                    lg: "30%",
                    xl: "30%"
                },

            }}
                elevation={2}
            >
                <Stack>
                    <AdjustIcon />
                </Stack>
                <Stack sx={{
                    justifyContent: {
                        xs: "space-between"
                    },
                    height: "100%"
                }}>
                    <Stack>
                        <Typography variant="body-2" color={tokens().grey[300]}>
                            {prop.title}</Typography>
                        <Typography variant="body2" sx={{
                            fontSize: "18px",
                            pt: 1,
                            color: theme => theme.palette.secondary.main,
                        }} >
                            &#8377; {prop.orders}

                        </Typography>

                    </Stack>

                </Stack>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <Typography variant="body2" sx={{
                        fontSize: "18px",
                        ...flexBox()
                    }} color="gray">
                        <SignalCellularAltIcon />
                    </Typography>
                </Box>
            </Paper>
        </>
    )
}