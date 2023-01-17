import { Box, Button, Container, Grid, Paper, Stack, TextField, Typography, colors,  Link as MUILink } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import enLabels from 'pages/api/en'
import React from 'react'
import { ROUTES } from 'routes'

export const AuthPage = () => {
    const router = useRouter();
  return (
    <Box sx={{
        width:'100vw',
        height:"100vh",
        backgroundColor:theme=>theme.palette.secondary.light
    }}>
        <Grid container width={"100%"} height={"100%"} sx={{
            p:{
                xs:2,
                sm:3,
                md:5
            }
        }}>
            <Grid item xs={0} md={6} lg={6} sx={{
                display:{
                    xs:"none",
                    md:"block"
                },
            }}>
                <div style={{
                    height:"100%",
                    width:"100%",
                    position:"relative",
                }}>
                    <Image
                        src={"https://www.td.com/ca/en/business-banking/images/orderPOSSupplies_smp_tcm380-302419.svg"}
                        layout="fill"
                        objectFit="contain"
                        style={{
                            width:"100%",
                            height:"100%",
                            
                        }}
                        alt={"Login Auth Image"}
                    />
                </div>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
                <Paper elevation={20} sx={{
                    height:"100%",
                    ml:{
                        lg:20
                    },
                    borderRadius:5,
                    
                    mr:{
                        lg:10
                    },
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    flexDirection:"column",
                    py:5
                }}>
                    <Stack sx={{
                        flex:1,
                        display:"flex",
                        justifyContent:"flex-start",
                        alignItems:"center",
                        flexDirection:"column",
                        width:"100%",
                        gap:2
                    }}>
                        <Stack sx={{
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center",
                            flexDirection:"column",
                            width:"100%",
                        }}>
                            <Box sx={{
                                height:50,
                                width:50,
                                position:"relative"
                            }}>
                                <Image src={"/thirteen.svg"} alt="logo"
                                layout="fill"
                                objectFit="contain"
                                style={{
                                    width:"100%",
                                    height:"100%",
                                    
                                }}
                                />

                            </Box>
                        </Stack>
                        <Stack sx={{
                            flex:1,
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center",
                            flexDirection:"column",
                            width:"100%",
                            gap:2
                        }}>
                            <Typography variant='h2' sx={{
                                pb:3
                            }}>{enLabels.AUTH.LOGINTITLE}</Typography>
                            <TextField variant='filled' sx={{
                                minWidth:"280px"
                            }} label={"Phone Number"} placeholder='ex: 123456789'/>
                            <TextField variant='filled' sx={{
                                minWidth:"280px"
                            }} label={"Password"} placeholder='ex: kuponz@1234564'/>
                            <Link href={ROUTES.FORGOT}>
                                <MUILink variant="body2">
                                    {enLabels.AUTH.FORGOT}
                                </MUILink>
                            </Link>
                            <Button sx={{

                            }} onClick={()=>{router.push(`/${ROUTES.OWNER_DASHBOARD}`)}}>{enLabels.AUTH.BUTTON}</Button>
                            <Button sx={{

                            }}>{enLabels.AUTH.GOOGLE_BUTTON}</Button>
                            <Typography variant='body2'>{enLabels.COMMON.CONTACT} <Link href={ROUTES.MAIL} style={{
                            }}>
                                <MUILink variant="body2">
                                {enLabels.COMMON.SUPPORT}
                                </MUILink>
                            </Link></Typography>   
                        </Stack>
                    </Stack>
                    <Box sx={{

                    }}>
                        <Typography variant='body2'>{enLabels.COMMON.POWERED}</Typography>
                    </Box>
                </Paper>
            </Grid>

        </Grid>
    </Box>
  )
}
