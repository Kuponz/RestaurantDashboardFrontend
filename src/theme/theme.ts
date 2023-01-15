import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { type } from "os";

// color design tokens export
export const tokens = () => ({
  grey: {
    100: "#d8d8d8",
    200: "#ced1d7",
    300: "#bcc2c9",
    400: "#636363",
    500: "#3c3c3c",
    600: "#303030",
    700: "#242424",
    800: "#1e2433",
    900: "#0c0c0c",
  },
  primary: {
    100: "#cdf3e1",
    200: "#b4ecd1",
    300: "#9be6c2",
    400: "#83e0b3", // manually changed
    500: "#6ADAA4",
    600: "#51D495",
    700: "#38CD85",
    800: "#1FC776",
    900: "#06C167",
  },
  greenAccent: {
    100: "#d0dcdb",
    200: "#e5f8ef",
    300: "#719592",
    400: "#42716e",
    500: "#31cb81",
    600: "#0f3e3b",
    700: "#147c4a",
    800: "#081f1e",
    900: "#04100f",
  },
  redAccent: {
    100: "#ecd0d7",
    200: "#d9a0b0",
    300: "#c57188",
    400: "#b24161",
    500: "#9f1239",
    600: "#7f0e2e",
    700: "#5f0b22",
    800: "#400717",
    900: "#20040b",
  },
  blueAccent: {
    100: "#cce6f4",
    200: "#9acee9",
    300: "#67b5dd",
    400: "#359dd2",
    500: "#0284c7",
    600: "#026a9f",
    700: "#014f77",
    800: "#013550",
    900: "#001a28",
  },
});

// mui theme settings
export const themeSettings = () => {
  const colors = tokens();
  return createTheme({
    palette: {
      ...{
        // palette values for light mode
        primary: {
          main: colors.primary[600],
          dark:colors.primary[900]
        },
        secondary: {
          main: colors.greenAccent[500],
        },
        neutral: {
          dark: colors.grey[700],
          main: colors.grey[500],
          light: colors.grey[100],
        },
        background: {
          default: "#f8fafc",
        },
        white:"#fff",

      },
    },
    typography: {
      fontSize: 12,
      allVariants: {
        fontFamily: ["Readex Pro", "sans-serif"].join(","),
        color:colors.grey[800],
      },
      h1: {
        fontSize: 40,
        fontWeight:700
    },
    h2: {
        fontSize: 32,
        fontWeight:500
    },
    h3: {
        fontSize: 24,
    },
    h4: {
        fontSize: 20,
        fontWeight:300
    },
    h5: {
        fontSize: 16,
        fontWeight:300
    },
    h6: {
        fontSize: 14,
        fontWeight:300
    },
    body2:{
        color:colors.grey[300]

    },
    caption:{
        color:colors.grey[200]
    }
    },
    components: {
        MuiButton:{
            defaultProps:{
                sx:{
                    p:1,
                    borderRadius:10
                },
                disableRipple:true,
            },
            variants: [
                {
                    props: { variant: 'outlined' },
                    style: {
                        backgroundColor:tokens().greenAccent[200],
                        borderWidth:0,
                        color:"#31cb81 !important",
                        ":hover":{
                            backgroundColor:tokens().greenAccent[200],
                            borderWidth:0,
                            color:"#31cb81 !important",

                        }
                    },                
                },
                {
                    props: { variant: 'contained' },
                    style: {
                        backgroundColor:tokens().greenAccent[500],
                        borderWidth:0,
                        color:"#fff !important",
                        boxShadow:8,
                        ":hover":{
                            backgroundColor:tokens().greenAccent[400],
                            borderWidth:0,
                            color:"#31cb81 !important",
                            boxShadow:10

                        }
                    },                
                },

            ],
        },
        MuiTextField:{
            variants:[
                {
                    props:{variant:"outlined"},
                    style:{
                        color:`${colors.greenAccent[700]} !important`,
                        borderWidth:0,
                        fontSize:'18px',
                    },


                }
            ]
        },
        MuiIcon:{
            defaultProps:{
                sx:{
                    cursor:"pointer",
                    color:colors.greenAccent[500]
                }
            }
        },
        MuiIconButton:{
            defaultProps:{
                sx:{
                    p:1,
                    fontSize:14,
                },
                disableRipple:true,
            }
        },
        MuiPaper:{
            defaultProps:{
                sx:{
                    borderRadius:1,
                    p:1,
                    borderWidth:1,
                },
                elevation:10
                
            },

        }
    },
  });
};

export const useMode = () => {
  const theme = themeSettings();
  return theme;
};
