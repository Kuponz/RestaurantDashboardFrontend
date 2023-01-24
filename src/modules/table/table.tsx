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
import { userestaurantStore } from "store/restaurant/restaurantStore";
import FloorStructure from "./FloorStructure";
import FloorWiseTable from "./FloorWiseTable";
import { useQuery } from "@tanstack/react-query";
import { getTables } from "store/api/axiosSetup";
import { useUserStore } from "store/user/userzustandstore";


export const Waiter = () => {
  const [openModel, setOpenModel]  = useState(false);
  
  const router = useRouter();
  const restroDetails = userestaurantStore(state=>state);
  const userDetails = useUserStore(state=>state.user);
  const [infoSelected, setinfoSelected] = useState({
    table:"",
    floor:"ALL"  
  });
  const { isLoading, isError, data, error } = useQuery(
    {
      queryKey:['getTable'], 
      queryFn:()=>getTables(
      userDetails?.jwtToken,userDetails?.restaurantLinked
      ),
      onSuccess:(data)=>{
        restroDetails.setFloors(data?.data?.data)
      }
  })
  console.log({
    isLoading, isError, data:data?.data?.data, error,restroDetails
  })
  return (
    <div className={styles.container}>
      <div className={styles.floor}>
        <FloorStructure infoSelected={infoSelected} setinfoSelected={setinfoSelected} restroDetails={restroDetails?.restaurant?.floors}/>
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
        justifyContent:"flex-start",
        gap:2
      }}>
        <FloorWiseTable infoSelected={infoSelected} restroDetails={restroDetails?.restaurant?.floors}/>
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
