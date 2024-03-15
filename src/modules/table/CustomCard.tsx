import { Divider, Paper, Stack, Tooltip, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React,{ useEffect, useRef, useState } from 'react'
import { flexBox } from 'theme/defaultFunction'
import { tokens } from 'theme/theme'
import moment from "moment";

const CustomCard = ({ tableData }) => {
  const router = useRouter();
  const varaint = {
    "VACANT": "outlined",
    "ORDERING": "inprogress",
    "OCCUPIED": "reserved",
    "BILLING": "free"
  }

  const [count, setCount] = useState(moment(new Date()));
  const timeDiff = (createdAt) => {
    var now = moment(new Date()); //todays date
    var end = moment(new Date(createdAt)); // another date
    var duration = moment.duration(now.diff(end));
    var days = moment.utc(duration.asMilliseconds()).format("HH:mm:ss");
    return days;
  };
  const varaintSelection = tableData.status

  useEffect(() => {
    if(tableData?.status === 'OCCUPIED'){
      const interval = setInterval(() => {
        setCount(timeDiff(tableData?.updatedAt || tableData?.createdAt));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [tableData?.status, tableData]);

  return (
    <Tooltip title={varaintSelection}>
      <Paper
        variant={varaint[varaintSelection]}
        sx={{
          width: {
            xs: "45%",
            sm: "30%",
            md: "25%",
            lg: "15%"
          },
          height: "90px",
          p: 3,
          ...flexBox("column"),
          cursor: "pointer"
        }}
        onClick={() => {
          router.push(`/restaurant/table/menu?table=${tableData?._id}`)
        }}
      >
        <Typography variant="body1" component="p" sx={{
          color: varaintSelection == "VACANT" ? tokens().greenAccent[500] : "white",
          width: "100%",
          textAlign: "center"
        }}>
          {tableData.TableName}
        </Typography>

        <Stack direction="row"
          width={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant='caption' sx={{
            color: varaintSelection == "VACANT" ? tokens().grey[300] : "white"
          }}>{tableData.status  === 'OCCUPIED' ? String(count) :tableData.status }</Typography>
        </Stack>
      </Paper>
    </Tooltip>
  )
}

export default CustomCard