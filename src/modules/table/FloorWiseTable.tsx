import { Divider, Stack, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import CustomCard from './CustomCard'
import { flexBox } from 'theme/defaultFunction';

const FloorWiseTable = ({ restroDetails, infoSelected }) => {
  const [useData, setuseData] = useState([]);
  let floorData = useCallback(() => {
    if (infoSelected?.floor == "ALL") {
      return restroDetails;
    } else {
      return restroDetails?.filter(resId => resId._id == infoSelected.floor);
    }
  }, [infoSelected, restroDetails])
  useEffect(() => {
    setuseData(floorData())
  }, [floorData])
  { console.log({ floorData2: floorData() }) }
  return (
    <>
      {useData?.map((floorData) => (
        <>
          <Stack sx={{ width: "100%", height: "fit-content" }}>
            <Divider sx={{
              width: "100%"
            }}>
              {floorData?.floorName}
            </Divider>
          </Stack>
          {floorData?.tables?.length != 0 ?

            floorData?.tables?.map((tableData, index) => (<CustomCard key={index} tableData={tableData} />))

            :
            <Typography>No Tables Added</Typography>

          }
        </>
      )
      )}
    </>
  )
}

export default FloorWiseTable