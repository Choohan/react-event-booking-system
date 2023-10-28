'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Login from '../../components/authentication/login'
import { useAuthContext } from '../../hooks/useAuthContext'
import { redirect } from 'next/navigation'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function LoginPage() {
  
  const { user, authIsReady } = useAuthContext()

  return (
    <>
      {authIsReady && (
        <Box sx={{ flexGrow: 1 }}>
          {user && redirect('/')}
          <Grid
          container 
          spacing={2} 
          columns={12}
          justifyContent="center"
          alignContent="center"
          height="100vh"
          >
            <Grid item xs={4}>
              <Item>
                <Login />
              </Item>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
    
  );
}