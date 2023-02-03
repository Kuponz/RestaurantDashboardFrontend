import { IconButton, Stack, Tooltip, Typography } from '@mui/material'
import React from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/router';
const TopBar = ({title, backUrl, home=false, children}:{backUrl:string, title?:String, home:Boolean, children?:React.ReactNode}) => {
    const router = useRouter();
  return (
      <Stack direction={"row"} ml={1} justifyContent={"space-between"}  alignItems={"center"}>
        <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
          <Tooltip title={home?"Home":"Back"}>
            <IconButton onClick={()=>router.push(backUrl)}>
              {home?<HomeIcon/>:<KeyboardBackspaceIcon/>}
            </IconButton>
          </Tooltip>
         {title? <Typography variant='h4' sx={{
              px:2
          }}>{title}</Typography>:null}
        </Stack>
        <Stack>
          {children}
        </Stack>
      </Stack>
    )
}

export default TopBar