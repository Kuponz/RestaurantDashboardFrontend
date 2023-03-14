import { Divider, Grid, TextField, Typography } from '@mui/material'
import { caseDataPrinter } from 'helper/casePrinter';
import React from 'react'

const ShowValue = ({printData, isLoading, setprintData, valueForm, forceUpdate}: {
    isLoading:Boolean;
    printData: {
      isEdit: boolean;
      value: {
        kot: {};
        billing: {};
      };
      type: string;
    };
    setprintData: React.Dispatch<
      React.SetStateAction<{
        isEdit: boolean;
        value: {
          kot: {};
          billing: {};
        };
        type: string;
      }>
    >;
    valueForm: string;
  }) => {
    // console.log({valueForm})
    let valEd = caseDataPrinter(valueForm);
  return (
    valEd != ""?
    <>
        <Grid item xs={5} >
            <Typography variant='h4'>{valEd}</Typography>
        </Grid>
        <Grid item xs={7}>
            {printData?.isEdit?
                <TextField disabled={isLoading} label={""} onChange={e=>{
                    printData?.value[printData.type][valueForm] = e.target.value;
                    setprintData(printData); 
                    forceUpdate();
                }} value={printData?.value[printData.type][valueForm] ?? ""} variant='filled' multiline={true} rows={3} fullWidth/>
            :
                <Typography>{printData?.value[printData.type][valueForm] == "" ? (<span style={{
                    color:"red"
                }}>Not Added!</span>): printData?.value[printData.type][valueForm] }</Typography>
            }
        </Grid>
    </>
    :
    <></>
)
}

export default ShowValue