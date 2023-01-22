import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Checkout from './Checkout';
import { useRouter } from 'next/router';
import { Drawer, Stack } from '@mui/material';

const drawerBleeding = 56;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

export default function MobileCheckout(props: Props) {
  const { window, val, setValue, variableip, tableId } = props;
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  // const toggleDrawer = (newOpen: boolean) => () => {
  //   setOpen(newOpen);
  // };
  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <Box sx={{ textAlign: 'center', pt: 1, position:"absolute", bottom:10, left:10, right:10  }}>
        <Button variant={"contained"} fullWidth onClick={()=>{
          setOpen(true)
        }}>Proceed to Bill</Button>
      </Box>
      <Drawer
        anchor={"bottom"}
        open={open}
        onClose={()=>setOpen(false)}
        onOpen={()=>setOpen(true)}
        swipeAreaWidth={100}
        disableSwipeToOpen={true}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display:{
            xs:"flex",
            md:"none"
          }
        }}
      >
        <Stack sx={{
          height:"100vh",
          width:"100%",
          overflow:"hidden",
          p:2,
          display:{
            xs:"flex",
            md:"none"
          }
        }}>
          <Checkout tableId={tableId} setOpen={setOpen} variableip={variableip} val={val} setValue={setValue} />
        </Stack>
      </Drawer >
    </Root>
  );
}