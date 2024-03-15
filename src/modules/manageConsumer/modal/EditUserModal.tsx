import {
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useReducer } from "react";
import { useUserStore } from "store/user/userzustandstore";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

const AddEditUserModal = ({
  userInfo,
  edit,
  indexVal,
  setInfo,
  setAllUserProfile,
  info,
  setuserIndex,
}: {
  userInfo:
    | {
        title: string;
        value: string | undefined;
        name: string;
        select?: undefined;
      }
    | {
        title: string;
        value: string;
        select: string[];
        name: string;
      };
  edit: boolean;
  setuserIndex: React.Dispatch<
    React.SetStateAction<
      | {
          user: {
            mobileNumber: string;
            name: string;
            role: string;
            _id: string;
            isLogin: boolean;
          };
          index: number;
        }
      | undefined
    >
  >;
}) => {
  const user = useUserStore((state) => state.user);
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  if (userInfo?.name === "isSameWhatsappNumber" && edit) {
    return (
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        my={1}
      >
        <Typography>{userInfo.title}</Typography>
        <Select
          value={userInfo.value}
          onChange={(event: SelectChangeEvent) => {
            console.log(event.target.value);
            info[indexVal].value = event.target.value;
            setInfo(info);
            console.log(info);
            forceUpdate();
          }}
        >
          <MenuItem value={"YES"}>YES</MenuItem>
          <MenuItem value={"NO"}>NO</MenuItem>
        </Select>
      </Stack>
    );
  } else if (userInfo?.name === "dateOfBirth") {
    return (
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        my={1}
      >
        <Typography>{userInfo.title}</Typography>
        {edit ? (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              label={userInfo.title}
              inputFormat="MM/DD/YYYY"
              value={userInfo.value || null}
              onChange={(newValue) => {
                info[indexVal].value = newValue;
                setInfo(info);
                forceUpdate();
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        ) : (
          <Typography>
            {userInfo.value?.length !== 0 ? new Date(userInfo.value).toLocaleDateString() : "Not Available"}
          </Typography>
        )}
      </Stack>
    );
  } else {
    return (
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        my={1}
      >
        <Typography>{userInfo.title}</Typography>
        {edit ? (
          <TextField
            value={userInfo.value}
            onChange={(event: SelectChangeEvent) => {
              console.log(event.target.value);
              info[indexVal].value = event.target.value;
              setInfo(info);
              console.log(info);
              forceUpdate();
            }}
          />
        ) : (
          <Typography>
            {userInfo.value !== null ? userInfo.value : "Not Available"}
          </Typography>
        )}
      </Stack>
    );
  }
};

export default AddEditUserModal;
