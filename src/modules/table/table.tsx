import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import styles from "./waiter.module.css";
import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { Router, useRouter } from "next/router";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import BasicModal from "common/modalGenerator/Modal";
import ModalSupport from "./ModalSupport";
import CustomCard from "./CustomCard";

  // <Card variant="free" onClick={()=>{
  //   router.push(`/restaurant/table/menu?table=${3}`)
  // }}>
  //   <CardActionArea>
  //     <CardContent>
  //     </CardContent>
  //   </CardActionArea>
  // </Card>
// const CustomCardRes = () => {
//   return (
//     <Card variant="reserved">
//       <CardActionArea>
//         <CardContent>
//           <Typography variant="h5" component="div">
//             # Table No {"3"}
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// };

export const Waiter = () => {
  const [openModel, setOpenModel]  = useState(false);
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.floor}>
        <FormControl fullWidth>
          <InputLabel>Floor</InputLabel>
          <Select label="Floor" defaultValue={0}>
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={1}>I Floor</MenuItem>
            <MenuItem value={2}>II Floor</MenuItem>
            <MenuItem value={3}>III Floor</MenuItem>
          </Select>
        </FormControl>
        <IconButton onClick={()=>setOpenModel(true)}><QuestionMarkIcon/></IconButton>
      </div>
      
      <Stack sx={{
        height:"100%",
        width:"100%",
        overflowY:"auto",
        p:2,
        pb:15,
        flexDirection:"row",
        flexWrap:"wrap",
        gap:2
      }}>
      <Divider sx={{
        width:"100%"
      }}>
        I FLOOR
      </Divider>
       {
       "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, nisi quasi architecto hic laborum est eos soluta esse accusantium nesciunt, mollitia veniam autem accusamus voluptate, sequi illum. Ipsum in illum eligendi alias perspiciatis debitis suscipit quos ipsam distinctio. Magni, id aut. Doloremque eos quaerat nobis!"
       .split(" ").map(elm=>(<CustomCard key={elm}/>))
       }
      </Stack>
      <BasicModal title={"Representations"} open={openModel} setOpen={setOpenModel}>
        <ModalSupport/>
      </BasicModal>
      {/* <div className={styles.base}> */}
      {/* <Paper> */}
      {/* <Button variant="contained">Table Reservation</Button>
        <Button variant="contained">
          <PersonIcon />
        </Button> */}

      {/* <BottomNavigation
        showLabels
        sx={{ height: "100%",backgroundColor:"#f8fafc" }}
        // value={value}
        // onChange={(event, newValue) => {
        //   setValue(newValue);
        // }
      >
        <BottomNavigationAction
          label="Reservation"
          icon={<RestaurantMenuIcon sx={{ fontSize: "2rem" }} />}
        />
        <BottomNavigationAction
          label="User Profile"
          icon={<PersonIcon sx={{ fontSize: "2rem" }} />}
        />
        <BottomNavigationAction label="User Profile" icon={<PersonIcon />} />
      </BottomNavigation> */}
      {/* </div> */}
      {/* </Paper> */}
    </div>
  );
};
