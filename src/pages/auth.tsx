import { CircularProgress, Stack } from '@mui/material'
import React from 'react'
import dynamic from "next/dynamic";

const AuthRoleLogin = dynamic(() => import("modules/auth/AuthRoleLogin"), {
  loading: () => <CircularProgress />,
});

const auth = () => {
  return (
    <AuthRoleLogin/>
  )
}

export default auth