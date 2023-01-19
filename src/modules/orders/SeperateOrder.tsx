import { Stack, Typography } from '@mui/material'
import React from 'react'

export const SeperateOrder = () => {
  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack sx={{
            width:"50%"
        }}>
            <Typography>Item Name</Typography>
        </Stack>
        <Stack direction={"row"} gap={5}>
            <Typography>1</Typography>
            <Typography>Rs. 50</Typography>
        </Stack>
    </Stack>
  )
}
