import { tokens } from "theme/theme";

export const redDeleteStyle={
    backgroundColor:tokens().redAccent[500],
    color:"#fff",
    boxShadow:3,
    ":focus":{
      backgroundColor:tokens().redAccent[400],
      color:"#fff",
      boxShadow:10,
    },
    ":hover":{
      backgroundColor:tokens().redAccent[400],
      color:"#fff",
    }
  }