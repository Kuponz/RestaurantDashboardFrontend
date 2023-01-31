import { IconButton, Stack, Tooltip, Typography } from '@mui/material'
import React from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/router';
const TopBar = ({title, backUrl, home=false, children}:{backUrl:string, title:String, home:Boolean, children}) => {
    const router = useRouter();
  return (
      <Stack direction={"row"} justifyContent={"space-between"} width={"100%"} alignItems={"center"}>
        <Stack direction={"row"} justifyContent={"flex-start"} alignItems={"center"}>
          <Tooltip title={home?"Home":"Back"}>
            <IconButton onClick={()=>router.push(backUrl)}>
              {home?<HomeIcon/>:<KeyboardBackspaceIcon/>}
            </IconButton>
          </Tooltip>
          <Typography variant='h4' sx={{
              px:2
          }}>{title}</Typography>
        </Stack>
        <Stack>
          {children}
        </Stack>
      </Stack>
    )
}

export default TopBar