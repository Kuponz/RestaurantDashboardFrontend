import Head from 'next/head'
import Image from 'next/image'
import { Button, Icon, IconButton, InputBase, TextField, Typography } from '@mui/material'
import { Inter } from '@next/font/google'
import { AddAPhoto, ArrowLeft, ArrowRightAltOutlined, Share } from '@mui/icons-material'
import styles from '../styles/index.module.css';
import { Box, Paper, Stack } from "@mui/material";
import SearchIcon from "@material-ui/icons/Search"
import Display from '../components/MenuListPage/Display'
const inter = Inter({ subsets: ['latin'] })
export default function Home() {
  return (
    <>
      <Head>
        <title>Kuponz</title>
        <meta name="description" content="India's first paperless and Innovative POS with minimum investments and Maximum returns" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/*<Box m={1}>

          <Button variant='contained'>Mui Button react node typescript <AddAPhoto /></Button>
          {/* <Button variant='dashed'><ArrowRightAltOutlined/></Button> */}
      {/*<Button variant='outlined'> Mui</Button>
        </Box>
        <Box m={1}>
          <TextField variant='filled' />
          <TextField variant='standard' />
          <TextField variant='outlined' />
        </Box>
        <Box m={1}>
          <menu />
          <Typography>Hey</Typography>
          <Typography variant='h1'>Hey</Typography>
          <Typography variant='h2'>Hey</Typography>
          <Typography variant='h3'>Hey</Typography>
          <Typography variant='h4'>Hey</Typography>
          <Typography variant='h5'>Hey</Typography>
          <Typography variant='h6'>Hey</Typography>
          <Typography variant="body1">Hey</Typography>
          <Typography variant="body2">Hey</Typography>
          <Typography variant="caption">Hey</Typography>
          <Typography variant="subtitle1">Hey</Typography>
          <Typography variant="subtitle2">Hey</Typography>
        </Box>
        <Box>
          <Box>
            <Icon ><Share /></Icon>
            <IconButton sx={{ mx: 2 }} ><Share /></IconButton>
            <IconButton sx={{ mx: 2 }}><Share /></IconButton>
          </Box>
          <Box sx={{
            m: 5
          }}>
            <Paper><InputBase /></Paper>
          </Box>
        </Box>-->*/}

      <Box sx={{
        m: 2
      }}>
        <Paper>
          <Button variant='dashed'><SearchIcon /></Button>
          <InputBase placeholder='Search for items...' />
        </Paper>
      </Box>
      <Display />
      <div >
        <Button variant='contained' className={styles.button}>Proceed</Button>
      </div>
    </>
  )
}

