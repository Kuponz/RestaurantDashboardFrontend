import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import moment, { Moment } from "moment";
import dayjs, { Dayjs } from "dayjs";
import {
  Box,
  Button,
  Drawer,
  Fab,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { CloseOutlined } from "@mui/icons-material";

const Filters = ({ mutate, user, isLoading, restaurant, setValue, value}) => {
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = (newValue: Dayjs | null, name: string) => {
    setValue({
      ...value,
      [name]: newValue,
    });
  };
  const handleIp = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack
        direction={"row"}
        justifyContent={"end"}
        alignItems={"center"}
        px={{ xs: 1, md: 15 }}
        spacing={2}
        pb={{xs:1}}
      >
        <Pagination
          count={value.pageCounts}
          defaultPage={value.pageNumber}
          siblingCount={0}
          variant="outlined"
          color="primary"
          disabled={isLoading}
          onChange={(e, val)=>{
            setValue({...value, pageNumber:val});
            mutate({...value,  pageNumber:val})
          }}
        />
        <IconButton
          id="basic-button"
          disabled={isLoading}
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick} >
          <FilterAltIcon />
        </IconButton>
      </Stack>
      <React.Fragment key={"bottom"}>
        <Box>
          <Menu
            id="basic-menu"
            open={open}
            onClose={handleClose}
            anchorEl={anchorEl}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <Stack direction={"column"} spacing={3}>
            <Stack
              spacing={3}
              direction={"column"}
              px={5}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <MobileDatePicker
                label="Start Date"
                inputFormat="MM/DD/YYYY"
                value={value.startDate}
                onChange={(newValue) => handleChange(newValue, "startDate")}
                renderInput={(params) => <TextField {...params} />}
              />
              <MobileDatePicker
                label="End Date"
                inputFormat="MM/DD/YYYY"
                value={value.endDate}
                onChange={(newValue) => handleChange(newValue, "endDate")}
                renderInput={(params) => <TextField {...params} />}
              />
              <FormControl variant="filled" sx={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-filled-label">
                  Page Size
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={value.pageSize}
                  name={"pageSize"}
                  onChange={(e) => handleIp(e)}
                >
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={75}>75</MenuItem>
                  <MenuItem value={100}>100</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <Button variant="contained" sx={{
              
            }}
            disabled={isLoading}
            onClick={()=>{
              // console.log({value})
              mutate({...value})
              handleClose();
            }}
            >Apply Filter</Button>
          </Stack>
          </Menu>
        </Box >
      </React.Fragment>
    </LocalizationProvider>
  );
};

export default Filters;
