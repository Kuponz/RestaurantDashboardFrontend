import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { flexBox } from 'theme/defaultFunction';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs:"90%",
    md:600
  },
  ...flexBox("column"),
  maxHeight:"90%",
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius:2,
  overflow:"hidden",
};

export default function BasicModal({open, setOpen, title, children}) {
  const handleClose = () => setOpen(false);

  return (
    <div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" py={1} sx={{
            ...flexBox(),
            justifyContent:"space-between",
            width:"100%",
            height:"10vh",
            fontWeight:700
          }}>
            {title}
            <IconButton onClick={handleClose}><CloseIcon/></IconButton>
          </Typography>
          <Stack sx={{
            overflowY:"auto",
            maxHeight:"100%",
            width:"100%"
          }}>
            {children}
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
