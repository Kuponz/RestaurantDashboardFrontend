import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/router";
const TopBar = ({
  title,
  backUrl,
  home = false,
  children,
}: {
  backUrl: string;
  title?: String;
  home: Boolean;
  children?: React.ReactNode;
}) => {
  const router = useRouter();
  return (
    <Stack
      paddingBottom={"0.5rem"}
      
      direction={"row"}
      gap={1}
      sx={{
        justifyContent: {
          xs: "center",
          sm: "space-between",
        },
        alignItems: {
          xs: "baseline",
          sm: "center",
        },
        mt:{xs:"1.5rem", md:"1rem"}

      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Tooltip title={home ? "Home" : "Back"} sx={{
          display:{
            xs:"none",
            sm:"flex",
          },
          bgcolor:"primary.main",
          color:"white",
          justifyContent:"center",
          alignItems:"center",
          boxShadow: 2,
          borderRadius: "50%",
        }}>
          <IconButton onClick={() => router.push(backUrl)}>
            {home ? <HomeIcon /> : <KeyboardBackspaceIcon />}
          </IconButton>
        </Tooltip>
        {title ? (
          <Typography
            variant="h4"
            sx={{
              px: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width:{
                xs:"5rem",
                sm:"100%"
              }
            }}
          >
            {title}
          </Typography>
        ) : null}
      </Stack>
      <Stack flex={1}>{children}</Stack>
    </Stack>
  );
};

export default TopBar;
