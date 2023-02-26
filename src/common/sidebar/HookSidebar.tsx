import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react'
import { flexBox } from 'theme/defaultFunction';

const HookSidebar = ({ text, largeHide}) => {
    const router = useRouter();
    let color = text.url == router.asPath ? "white":"#383d4a";
    return (
      <Stack 
      onClick={()=>{
        router.push(text.url)
      }}
      sx={{
        ...flexBox("row", "flex-start", "center"),
        px:2,
        gap:3,
        py:1,
        borderRadius:1,
        cursor:"pointer",
        backgroundColor:theme=>text.url == router.asPath ?theme.palette.primary.main: "white",
        boxShadow:theme=>text.url == router.asPath ?3: 0,
        color:color,
        ":hover":{
            background:theme=>theme.palette.primary.main,
            color:"white"
        },
        m:1
      }}>
        {text.icons}
        {largeHide && text.title}
      </Stack>
    )
}


export default HookSidebar