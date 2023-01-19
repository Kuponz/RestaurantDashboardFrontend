import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import styles from "./waiter.module.css";
import React, { useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { Router, useRouter } from "next/router";

const CustomCardFree = ({}) => {
  const router = useRouter();
  return (
    <Card variant="free" onClick={()=>{
      router.push(`/restaurant/table/menu?table=${3}`)
    }}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" component="div">
            # Table No {"3"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
const CustomCardRes = () => {
  return (
    <Card variant="reserved">
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" component="div">
            # Table No {"3"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export const Waiter = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.floor}>
        <FormControl fullWidth>
          <InputLabel>Floor</InputLabel>
          <Select label="Floor">
            <MenuItem value={1}>I Floor</MenuItem>
            <MenuItem value={2}>II Floor</MenuItem>
            <MenuItem value={3}>III Floor</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={styles.tables}>
        <CustomCardRes/>
        <CustomCardRes />
        <CustomCardRes />
        <CustomCardFree />
        <CustomCardFree />
        <CustomCardFree />
        <CustomCardRes />
        <CustomCardFree />
        <CustomCardFree />
        <CustomCardFree />
        <CustomCardRes />
        <CustomCardRes />
        <CustomCardFree />
        <CustomCardFree />
        <CustomCardFree />
        <CustomCardRes />
        <CustomCardFree />
        <CustomCardFree />
        <CustomCardFree />
        <CustomCardRes />
        <CustomCardRes />
        <CustomCardFree />
        <CustomCardFree />
        <CustomCardFree />
        <CustomCardRes />
        <CustomCardFree />
        <CustomCardFree />
        <CustomCardFree />
        <CustomCardRes />
        <CustomCardRes />
        <CustomCardRes />
        <CustomCardFree />
        <CustomCardRes />
        <CustomCardRes />
        <CustomCardFree />
      </div>
      <div className={styles.legend}>
        <div className={styles.legendFlex}>
          <div className={styles.flex}>
            <Paper sx={{ width: "1rem", height: "1rem" }} variant="free" />
            <span>Free</span>
          </div>
          <div className={styles.flex}>
            <Paper sx={{ width: "1rem", height: "1rem" }} variant="reserved" />
            <span>Reserved</span>
          </div>
        </div>
      </div>
      {/* <div className={styles.base}> */}
      {/* <Paper> */}
      {/* <Button variant="contained">Table Reservation</Button>
        <Button variant="contained">
          <PersonIcon />
        </Button> */}

      {/* <BottomNavigation
        showLabels
        sx={{ height: "100%" }}
        // value={value}
        // onChange={(event, newValue) => {
        //   setValue(newValue);
        // }
      >
        <BottomNavigationAction
          label="Reservation"
          icon={<RestaurantMenuIcon />}
        />
        <BottomNavigationAction label="User Profile" icon={<PersonIcon />} />
      </BottomNavigation> */}
      {/* </div> */}
      {/* </Paper> */}
    </div>
  );
};
