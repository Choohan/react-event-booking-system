'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Register from '../../components/authentication/register'
import { useAuthContext } from '../../hooks/useAuthContext'
import { redirect } from 'next/navigation'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function RegisterPage() {
  
  const { user, authIsReady } = useAuthContext()
  return (
    <>

    {authIsReady && <Box sx={{ flexGrow: 1 }}>
      <Grid
       container 
       spacing={2} 
       columns={12}
       justifyContent="center"
       alignContent="center"
       height="100vh"
      >
        {user && redirect('/')}
        <Grid item xs={6}>
          <Item>
            <Register />
          </Item>
        </Grid>
      </Grid>
    </Box>}
    </>
  );
}