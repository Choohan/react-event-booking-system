'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function project({ project }) {
  const router = useRouter()
  return (
    <Grid item xs={4}>
      <Item>
        <img src={project['image-url']} />
        <Box p={2}>
          <Stack direction="row" spacing={1} sx={{
            mb: 1,
          }}>
            <Button variant="contained" size="small" sx={{
              fontSize: 8,
              p: 0.5,
            }}>{project['project-cat']}</Button>
            <Button variant="contained" size="small" sx={{
              fontSize: 8,
              p: 0.5,
            }}>{project['project-beneficiary']}</Button>
            <Button variant="contained" size="small" sx={{
              fontSize: 8,
              p: 0.5,
            }}>{format(project['start-time'].toDate(), 'dd MMM yy')} - {format(project['end-time'].toDate(), 'dd MMM yy')}</Button>
          </Stack>
          <Typography className="project-title" color="primary" sx={{textAlign: 'left', mb: 1, fontWeight: 'bold'}}>{project['project-title']}</Typography>
          <Typography className="project-description" sx={{textAlign: 'left'}}>{project['project-description']}</Typography>
          <Stack direction="row" spacing={1} sx={{
            mt: 2
          }} justifyContent="flex-end">
            <Button variant="contained" size="small" onClick={() => {
                  router.push('/project/' + project['id'])
                }}>Pledge</Button>
          </Stack>
        </Box>
      </Item>
    </Grid>
  );
}