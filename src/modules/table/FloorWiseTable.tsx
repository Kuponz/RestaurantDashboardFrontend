import { Divider, Stack, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import CustomCard from './CustomCard'
import { flexBox } from 'theme/defaultFunction';

const FloorWiseTable = ({restroDetails, infoSelected}) => {
  const [useData, setuseData] = useState([]);
  let floorData = useCallback(()=>{
    if(infoSelected?.floor == "ALL"){
      return restroDetails;
    }else{
      return restroDetails?.filter(resId=>resId._id == infoSelected.floor);
    }
  },[infoSelected,restroDetails])
  useEffect(()=>{
    setuseData(floorData())
  },[floorData])
  return (
    <>
    {useData?.map((floorData)=>(
      <Stack key={floorData?._id} sx={{width:"100%", height:"fit-content"}} direction={"column"} flexWrap={"wrap"} py={{
        xs:1,
        sm:2,
        md:5
      }} gap={5}>
      <Stack>
        <Divider sx={{
          width:"100%"
        }}>
          {floorData?.floorName}
        </Divider>
      </Stack>
      <Stack direction={"row"} flexWrap={"wrap"} gap={3}>
        {floorData?.tables?.length != 0 ? 
        
        floorData?.tables?.map((tableData, index)=>(<CustomCard key={index} tableData={tableData}/>))
        
        :
        <Typography variant='h4'>
          No Tables Added!
        </Typography>
        }
      </Stack>
    </Stack>
    )
    )}
    </>
  )
}

export default FloorWiseTable