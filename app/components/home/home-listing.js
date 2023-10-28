'use client'
import * as React from 'react';
import './home.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ProjectListing from '../project/listing'
import { useCollection } from '../../hooks/useCollection'
import { Typography } from '@mui/material';


export default function homeListing() {
    const { documents: projects } = useCollection(
        'projects',
        ['end-time', '>=', new Date()]
    )
  return (
    <Box sx={{ flexGrow: 1 }}>
        
      <Grid
       container 
       spacing={2} 
       columns={12}
       justifyContent="flex-start"
       alignContent="flex-start"
       className="homeListing"
      >
        <Grid item xs={12}
            mt={10}
            mb={1}
            className="homeListingTitle"
        >
            <Typography variant="h3">Upcoming Projects</Typography>
        </Grid>
        {projects && projects.map(project => (
            <ProjectListing key={project['id']} project={project} />
        ))}
        
      </Grid>
    </Box>
  );
}