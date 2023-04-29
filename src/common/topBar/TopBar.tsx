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
      
      direction={{
        xs: "column",
        sm: "row",
      }}
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
        w={"100%"}
      >
        <Tooltip title={home ? "Home" : "Back"}>
          <IconButton onClick={() => router.push(backUrl)}>
            {home ? <HomeIcon /> : <KeyboardBackspaceIcon />}
          </IconButton>
        </Tooltip>
        {title ? (
          <Typography
            variant="h4"
            sx={{
              px: 2,
            }}
          >
            {title}
          </Typography>
        ) : null}
      </Stack>
      <Stack>{children}</Stack>
    </Stack>
  );
};

export default TopBar;
