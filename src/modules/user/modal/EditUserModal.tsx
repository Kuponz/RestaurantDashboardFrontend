import { MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import React, { useReducer } from "react";
import { useUserStore } from "store/user/userzustandstore";

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

  if (userInfo?.name == "pin") {
    if (user.role == "OWNER" && edit) {
      return (
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          my={1}
        >
          <Typography>{userInfo.title}</Typography>
          <TextField value={userInfo.value}  onChange={(event: SelectChangeEvent) => {
            console.log(event.target.value);
            info[indexVal].value = event.target.value;
            setInfo(info);
            console.log(info)
            forceUpdate()
          }}/>
        </Stack>
      );
    }
  } else if (userInfo?.name == "role") {
    return (
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        my={1}
      >
        <Typography>{userInfo.title}</Typography>
        {edit ? (
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={userInfo.value}
            onChange={(event: SelectChangeEvent) => {
              console.log(event.target.value);
              info[indexVal].value = event.target.value;
              setInfo(info);
              console.log(info)
              forceUpdate()
            }}
          >
            {userInfo?.select?.map((newSel, key) => (
              <MenuItem key={key} value={newSel}>
                {newSel}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <Typography>{userInfo.value}</Typography>
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
          <TextField value={userInfo.value} onChange={(event: SelectChangeEvent) => {
            console.log(event.target.value);
            info[indexVal].value = event.target.value;
            setInfo(info);
            console.log(info)
            forceUpdate()
          }}/>
        ) : (
          <Typography>{userInfo.value}</Typography>
        )}
      </Stack>
    );
  }
};

export default AddEditUserModal;
