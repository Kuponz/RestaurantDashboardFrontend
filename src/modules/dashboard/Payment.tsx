import { Button, Paper, Typography, CircularProgress, Box, Stack, ToggleButtonGroup, ToggleButton, IconButton } from '@mui/material'
import { tokens } from "theme/theme";

export default function Payment(prop) {
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
                    md: "25%",
                    lg: "25%",
                    xl: "32%"
                },
                backgroundColor: prop?.negative? tokens().redAccent[500]: tokens().greenAccent[200],
                
            }}
                elevation={2}
            >

                <Stack sx={{
                    justifyContent: {
                        xs: "space-between"
                    },
                    height: "100%"
                }}>
                    <Stack>
                        <Typography variant="h5" color={prop?.negative?"white":tokens().grey[500]}>
                            {prop.title}</Typography>
                        <Typography variant="body2" sx={{
                            fontSize: "18px",
                            pt: 1,

                            color: theme => prop?.negative?"white":theme.palette.secondary.main,
                        }} >
                            {prop.isRupee && "₹ "} {prop.payment}

                        </Typography>

                    </Stack>

                </Stack>

            </Paper>

        </>
    )
}