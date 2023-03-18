import {
  CleaningServicesOutlined,
  EditNotificationsOutlined,
} from "@mui/icons-material";
import {
  FormControlLabel,
  IconButton,
  Paper,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { tokens } from "theme/theme";
import { redDeleteStyle } from "common/styles/deleteStyle";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
const ManageMenuCard = ({
  isCategory = true,
  menuVal,
  viewOne,
  setisItem,
  setViewOne,
  deleteMutate,
  userToken,
  setOpen
}: {
  isCategory: boolean;
  viewOne: {
    viewObj: {};
    id: number;
    open: boolean;
  };
  setisItem:React.Dispatch<
  React.SetStateAction<boolean>
>;
  setViewOne: React.Dispatch<
    React.SetStateAction<{
      viewObj: {};
      id: number;
      open: boolean;
    }>
  >;
  userToken: {
    login: boolean;
  };
  setOpen:React.Dispatch<React.SetStateAction<boolean>>;
  deleteMutate:UseMutationResult<AxiosResponse<any, any>, unknown, any, unknown>;
  menuVal:
    | {
        isAvailable?: boolean;
        menu?: Object[];
        categoryRank?: String;
        categoryName?: String;
        createdAt?: String;
        updatedAt?: String;
        ignoreTaxes?: boolean;
        ignoreDiscounts?: boolean;
        _id?: string;
        categoryId?: string;
        packingCharges?: string;
        itemrank?: string;
        favorite?: boolean;
        restaurantId?: string;
        available?: boolean;
        itemName?: string;
        itemShortName?: string;
        itemAttributeid?: string;
        itemdescription?: string;
        minimumpreparationtime?: string;
        price?: string;
        itemTax?: string;
        __v: 0;
      }
    | never;
}) => {
  return isCategory ? (
    <Paper
      // elevation={0}
      variant="outlined"
      sx={{
        p: 2,
        minHeight: {
          xs: "7rem",
        },
        width: {
          xs: "100%",
          md: "45%",
          lg: "30%",
        },
        display: "flex",
        flexDirection: "column",
        position: "relative",
        justifyContent: "space-between",
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        overflow={"hidden"}
      >
        <Typography
          variant="body2"
          fontWeight={800}
          color="primary.main"
          sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
        >
          {menuVal?.categoryName}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <IconButton onClick={() => {
          setisItem(false);
          setOpen(true);
          setViewOne({...viewOne, open:true, viewObj:menuVal})
        }}>
          <VisibilityIcon />
        </IconButton>
        <IconButton sx={redDeleteStyle} disabled={true}>
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Paper>
  ) : (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        minHeight: {
          xs: "7rem",
        },
        width: {
          xs: "100%",
          md: "45%",
          lg: "30%",
        },
        display: "flex",
        flexDirection: "column",
        position: "relative",
        justifyContent: "space-between",
      }}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        overflow={"hidden"}
      >
        <Typography
          variant="body2"
          fontWeight={800}
          color="primary.main"
          sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
        >
          {menuVal?.itemName}
        </Typography>
        <Typography
          variant="body2"
          fontWeight={800}
          sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
        >
          {menuVal?.categoryName}
        </Typography>
        <FormControlLabel
          control={<Switch checked={menuVal?.available} />}
          label="Available"
          labelPlacement="start"
        />
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <IconButton onClick={()=>{
          setisItem(true)
          setOpen(true);
          setViewOne({...viewOne, open:true, viewObj:menuVal})
        }}
        >
          <VisibilityIcon />
        </IconButton>
        <IconButton sx={redDeleteStyle} onClick={()=>{
          if(confirm("Are you sure You want to delete this?"))
          {
            deleteMutate?.mutate({
              menuId: menuVal._id,
              restaurantId:menuVal.restaurantId,
              headerAuth:userToken?.jwtToken
            })
          }
        }}
        disabled={deleteMutate?.isLoading}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Paper>
  );
};

export default ManageMenuCard;
