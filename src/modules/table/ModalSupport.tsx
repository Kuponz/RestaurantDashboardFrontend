import { Paper, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import {Link as MUIlink} from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import { flexBox } from 'theme/defaultFunction';
const ModalSupport = () => {
  return (
    <Stack>
        <Stack direction={"row"} alignItems={"center"} sx={{
            columnGap:2,
            m:0.5
        }}>
            <Paper sx={{ width: "1rem", height: "1rem" }} variant="free" />
            <Typography>Free</Typography>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} sx={{
            columnGap:2,
            m:0.5
        }}>
            <Paper sx={{ width: "1rem", height: "1rem" }} variant="inprogress" />
            <Typography>In Progress</Typography>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} sx={{
            columnGap:2,
            m:0.5
        }}>
            <Paper sx={{ width: "1rem", height: "1rem" }} variant="reserved" />
            <Typography> Reserved</Typography>
        </Stack>
        <Stack direction={"row"} py={2}>
            <Typography>Need More Support &nbsp;</Typography>
            <Link href={"callto:8766968741"}><MUIlink>
                <Stack sx={{...flexBox()}}>
                    Click & Contact Here 
                    <CallIcon/>
                </Stack>
                </MUIlink></Link>
        </Stack>
    </Stack>
  )
}

    //       <div className={styles.legend}>
    //         <div className={styles.legendFlex}>
    //           <div className={styles.flex}>
    //             <span>Free</span>
    //           </div>
    //           <div className={styles.flex}>
    //             <Paper sx={{ width: "1rem", height: "1rem" }} variant="reserved" />
    //             <span>Reserved</span>
    //           </div>
    //       </div>
    //   </div>
export default ModalSupport