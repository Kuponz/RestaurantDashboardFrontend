import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Paper,
  Typography,
} from "@mui/material";
import styles from "./waiter.module.css";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";

const CustomCardFree = () => {
  return (
    <Card variant="free">
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
  return (
    <div className={styles.container}>
      <div className={styles.tables}>
        <CustomCardRes />
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
        <div className={styles.flex}>
          <Paper sx={{ width: "2rem", height: "2rem" }} variant="free" />
          <span>Free</span>
        </div>
        <div className={styles.flex}>
          <Paper sx={{ width: "2rem", height: "2rem" }} variant="reserved" />
          <span>Reserved</span>
        </div>
      </div>
      <div className={styles.base}>
        <Button variant="contained">Table Reservation</Button>
        <Button variant="contained">
          <PersonIcon />
        </Button>
      </div>
    </div>
  );
};
