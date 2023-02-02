import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { type } from "os";
declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    free: true;
    reserved: true;
  }
}

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
    100: "#ECFFF6",
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
    400: "#f73378",
    500: "#f50057",
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
  warning: {
    100: "#ffb851",
    200: "#ffa726",
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
          dark: colors.primary[900],
        },
        secondary: {
          main: colors.greenAccent[500],
          light: colors.greenAccent[300],
        },
        neutral: {
          dark: colors.grey[700],
          main: colors.grey[500],
          light: colors.grey[100],
          default: colors.grey[300],
        },
        background: {
          default: "#f8fafc",
        },
        errorRed: colors.redAccent[300],
        white: "#fff",
      },
    },
    typography: {
      fontSize: 12,
      // ? Why less than default
      allVariants: {
        fontFamily: ["Readex Pro", "sans-serif"].join(","),
        color: colors.grey[800],
      },
      h1: {
        fontSize: 40,
        fontWeight: 700,
      },
      h2: {
        fontSize: 32,
        fontWeight: 500,
      },
      h3: {
        fontSize: 24,
      },
      h4: {
        fontSize: 20,
        fontWeight: 300,
      },
      h5: {
        fontSize: 16,
        fontWeight: 300,
      },
      h6: {
        fontSize: 14,
        fontWeight: 300,
      },
      body2: {
        color: colors.grey[300],
      },
      caption: {
        color: colors.grey[200],
      },
    },
    components: {
      MuiButton: {
        defaultProps: {
          sx: {
            p: 1,
            borderRadius: 10,
          },
          disableRipple: true,
        },
        variants: [
          {
            props: { variant: "outlined" },
            style: {
              backgroundColor: tokens().greenAccent[200],
              borderWidth: 0,
              color: "#31cb81 !important",
              borderRadius: "5px !important",
              ":hover": {
                backgroundColor:tokens().greenAccent[100],
                border:0,
                color: "#31cb81 !important",
              },
            },
          },
          {
            props: { variant: "contained" },
            style: {
              backgroundColor: tokens().greenAccent[500],
              borderWidth: 0,
              color: "#fff !important",
              boxShadow: "8",
              ":hover": {
                backgroundColor: tokens().greenAccent[400],
                borderWidth: 0,
                color: "#31cb81 !important",
                boxShadow: 10,
              },
            },
          },
          {
            props: { variant: "outlined", color:"error" },
            style: {
              backgroundColor: tokens().redAccent[500],
              borderWidth: 0,
              color: "#fff !important",
              boxShadow: "8",
              ":hover": {
                backgroundColor: tokens().redAccent[400],
                borderWidth: 0,
                color: "#fff !important",
                boxShadow: 10,
              },
              ":disabled":{
                backgroundColor:tokens().grey[200],
                borderWidth: 0,
                color: "#fff !important",
                boxShadow: "8",
              }
            },
          },
          
        ],
      },
      MuiTextField: {
        variants: [
          {
            props: { variant: "outlined" },
            style: {
              color: `${colors.greenAccent[700]} !important`,
              borderWidth: 0,
              fontSize: "18px",
            },
          },
        ],
      },
      MuiIcon: {
        defaultProps: {
          sx: {
            cursor: "pointer",
            color: colors.greenAccent[500],
          },
        },
      },
      MuiIconButton: {
        defaultProps: {
          sx: {
            backgroundColor: colors.greenAccent[200],
            color: colors.greenAccent[500],
            boxShadow: 3,
            ":focus": {
              backgroundColor: colors.greenAccent[700],
              color: colors.greenAccent[100],
              boxShadow: 10,
            },
            ":hover": {
              backgroundColor: colors.greenAccent[700],
              color: colors.greenAccent[100],
            },
          },
          disableRipple: true,
        },
      },

      MuiPaper: {
        defaultProps: {
          sx: {
            borderRadius: 1,
            p: 1,
            borderWidth: 1,
          },
          elevation: 10,
        },
        variants: [
          {
            props: { variant: "free" },
            style: {
              padding: 0,
              background: tokens().greenAccent[500],
            },
          },
          {
            props: { variant: "inprogress" },
            style: {
              padding: 0,
              background: colors.warning[100],
            },
          },
          {
            props: { variant: "reserved" },
            style: {
              padding: 0,
              background: "#e53935",
            },
          },
        ],
      },
      MuiCard: {
        variants: [
          {
            props: { variant: "free" },
            style: {
              padding: 0,
              background: tokens().greenAccent[500],
            },
          },
          {
            props: { variant: "reserved" },
            style: {
              padding: 0,
              background: "#e53935",
            },
          },
        ],
      },
    },
  });
};

export const useMode = () => {
  const theme = themeSettings();
  return theme;
};

// variants:[
//   {
//     props: { color:"error", className:"delete", },
//     style: {
//       backgroundColor:tokens().redAccent[500],
//       color:"#fff",
//       boxShadow:"rgba(0, 0, 0, 0.2) 0px 18px 50px -10px",
//       // boxShadow:3,
//       ":focus":{
//         backgroundColor:tokens().redAccent[400],
//         color:"#fff",
//         boxShadow:"rgba(0, 0, 0, 0.1) 0px 10px 50px",
//       },
//       ":hover":{
//         backgroundColor:tokens().redAccent[400],
//         color:"#fff",
//       }

//     },
//   }
// ]

