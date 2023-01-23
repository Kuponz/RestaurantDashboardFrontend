import { Avatar, Button, CircularProgress, IconButton, Menu, MenuItem, Stack, Tooltip } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import { logoutuserfunction } from "store/api/axiosSetup";

function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name?.split(' ')[0][0]}${name?.split(' ')[1][0]}`,
    };
  }
  function stringToColor(string: string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string?.length; i += 1) {
      hash = string?.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value?.toString(16)}`?.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  

export default function AvatarMenu({userState, logout}) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const router = useRouter();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const {mutate, isLoading} = useMutation(logoutuserfunction, {
      onSuccess:(data, variables, context)=> {

          console.log({
              data:data.data.data,
              variables,
              context,
              userState
          })
        
        localStorage.clear();
        logout();
        router.push("/auth")
      },
  })
    const handleClose = () => {
      setAnchorEl(null);
      mutate(userState?.jwtToken)
    };
    if(isLoading)
    {
      return <Stack><CircularProgress/></Stack>
    }
    return (
      <div>
        <IconButton id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{
            backgroundColor:"transparent",
          }}
          >
            <Tooltip title={"Click to Logout"}>
              <Avatar  {...stringAvatar(userState?.name)}/>
            </Tooltip>
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>User Settings</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
        );
    }