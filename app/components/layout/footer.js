'use client'
import * as React from 'react';
import './footer.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


export default function footer() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
       container 
       spacing={0} 
       columns={12}
       justifyContent="center"
       alignContent="center"
       className="footer"
       mt={10}
      >
        <Grid 
          item 
          xs={10}
          justifyContent="center"
          alignContent="center"
          style={{display: 'flex'}}
          className="footer-content"
          pt={4}
          mb={5}
          color="gray"
        >
            <Typography variant="body1">© 2021 Malaysia Red Crescent Society. All rights reserved.</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}