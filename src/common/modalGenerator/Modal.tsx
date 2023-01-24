import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
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
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius:2
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
            width:"100%"
          }}>
            {title}
            <IconButton onClick={handleClose}><CloseIcon/></IconButton>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {children}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
