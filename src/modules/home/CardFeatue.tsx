import { Icon, Paper, Stack, Typography } from '@mui/material'
import { NextRouter } from 'next/router'
import React from 'react'
import { flexBox } from 'theme/defaultFunction'

const CardFeatue = ({homeInfo, router}:{
    router: NextRouter,
    homeInfo:{
        title: string,
        icons: JSX.Element,
        url: string;
    }
}) => {
  return (
    <Paper variant='outlined' onClick={()=>{
        console.log("Called");
        router.push(homeInfo.url);
    }} elevation={10} sx={{
        m:3,
        p:3,
        ...flexBox("column"),
        gap:1,
        minWidth:"150px",
        cursor:"pointer"
    }}>
        <Icon color={"primary.main"}>{homeInfo.icons}</Icon>
        <Typography variant='h5' color={"primary.main"}>{homeInfo.title}</Typography>
    </Paper>
  )
}

export default CardFeatue