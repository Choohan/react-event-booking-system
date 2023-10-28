'use client'
import * as React from 'react';
import './home.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../../hooks/useAuthContext'


export default function heroBanner() {
  const router = useRouter()
  const { user, authIsReady } = useAuthContext()
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: 'white' }} className="hero-banner-container">
      <Grid
       container 
       spacing={0} 
       columns={12}
       justifyContent="center"
       alignContent="center"
       className="hero-banner"
      >
        <Grid item xs={10}>
            <Typography variant="h1" >
            Volunteering As <Typography component="span" color="primary" >A New Norm</Typography>
            </Typography>
            <Typography variant="body1">
            MySukarela serves as a platform that connects volunteers with non-profit organizations (NGO) to conduct humanitarian tasks. Find volunteering projects nearby you and get started volunteering now!
            </Typography> 

            {!user && authIsReady && (<Button variant="contained" fontWeight="Bold" onClick={() => {
                router.push('/register')
              }}>Sign Up</Button>)}

              {user && authIsReady && (<Button variant="contained" fontWeight="Bold" onClick={() => {
                  router.push('/dashboard')
                }}>Go to Dashboard</Button>)}
        </Grid>
      </Grid>
    </Box>
  );
}