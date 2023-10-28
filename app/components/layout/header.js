'use client'
import * as React from 'react';
import './header.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'

export default function header() {
  const { logout } = useLogout()
  const router = useRouter()
  const { user, authIsReady } = useAuthContext()
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: 'white' }}>
      <Grid
       container 
       spacing={0} 
       columns={12}
       justifyContent="flex-start"
       alignContent="center"
       backgroundColor="white"
       className="header"
      >
        <Grid item xs={2}>
            <Image
                src="/logo.png"
                width="1000"
                height="1000"
                className="header-logo"
                alt="logo"
                style={{margin: "auto"}}
                onClick={() => {
                  router.push('/')
                }}
            />
        </Grid>
        <Grid 
          item 
          xs={10}
          justifyContent="right"
          alignContent="right"
          style={{display: 'flex'}}
        >
            {!user && authIsReady && (<Stack direction="row" spacing={2}>
              <Button onClick={() => {
                router.push('/login')
              }}>Sign In</Button>
              <Button variant="contained" onClick={() => {
                router.push('/register')
              }}>Sign Up</Button>
            </Stack>)}
            {user && authIsReady && (<Stack direction="row" spacing={2}>
              <Button onClick={logout}>Sign Out</Button>
              <Button variant="contained" onClick={() => {
                  router.push('/dashboard')
                }}>Dashboard</Button>
            </Stack>)}
        </Grid>
      </Grid>
    </Box>
  );
}