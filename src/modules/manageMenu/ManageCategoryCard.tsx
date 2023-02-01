import { CleaningServicesOutlined, EditNotificationsOutlined } from '@mui/icons-material'
import { IconButton, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
const ManageMenuCard = ({isCategory=true, menuVal }:{isCategory:boolean, menuVal:{
  "isAvailable": boolean,
  "menu": Object[],
  "_id": String,
  "restaurantId": String,
  "categoryRank": String,
  "categoryName": String,
  "createdAt": String,
  "updatedAt": String,
} | never}) => {
  return (
    isCategory?
    <Paper
        // elevation={0}
        variant="outlined"
        sx={{
          p: 2,
          minHeight:{
            xs:"7rem",
          },
          width:{
            xs:"100%",
            md:"45%",
            lg:"30%"
          },
          display: "flex",
          flexDirection:"column",
          position: "relative",
        }}
      >
        <Stack direction="row" justifyContent="center" alignItems="center" overflow={"hidden"}>
          <Typography variant="body2" fontWeight={800} color="primary.main" sx={{textOverflow: "ellipsis", overflow: "hidden" }}>
           {menuVal?.categoryName}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <IconButton>
            <VisibilityIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Stack>
    </Paper>
    :
    <Paper
        // elevation={0}
        variant="outlined"
        sx={{
          p: 2,
          height:{
            xs:"5rem",
            md:"7.5rem"
          },
          width:{
            xs:"100%",
            md:"45%",
            lg:"30%"
          },
          display: "flex",
          position: "relative",
        }}
      >
        <Stack direction="row" justifyContent="center" alignItems="center" overflow={"hidden"}>
          <Typography variant="body1" fontWeight={800} color="primary.main" sx={{textOverflow: "ellipsis", overflow: "hidden" }}>
            Menu NameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameName
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          position={"absolute"}
          sx={{ top: "-10px", right: "-10px" }}
          gap={2}
        >
          <IconButton>
            <VisibilityIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Stack>
    </Paper>
  )
}

export default ManageMenuCard

