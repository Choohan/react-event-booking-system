'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useCollection } from '../../hooks/useCollection'
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import './member.css'
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation'


const columns = [
    { field: 'project-cat', headerName: 'Category', width: 150 },
    { field: 'project-beneficiary', headerName: 'Beneficiary', width: 150 },
    { field: 'project-title', headerName: 'Title', width: 300 },
    { field: 'date', headerName: 'Date', width: 200,
        valueGetter: (params) =>
            `${format(params.row['end-time'].toDate(), 'dd MMM yy')} - ${format(params.row['start-time'].toDate(), 'dd MMM yy')}`,
    },
]

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function memberProjectListing({ userid }) {
    const { documents: projects } = useCollection(
        'projects',
        ['volunteers', 'array-contains', userid]
    )
    const router = useRouter()
    const handleRowClick = (
        params, event, details
    ) => {
        router.push('/project/' + params.id)
    }
  return (
    <>
        {projects && (
            <Box sx={{ flexGrow: 1 }}>
        
            <Grid
             container 
             spacing={2} 
             columns={12}
             justifyContent="flex-start"
             alignContent="flex-start"
             className="project-listing"
            >
              <Grid item xs={12}
                  mt={10}
                  mb={1}
                  className=""
              >
                  <Item>
                    <Typography variant="h3" sx={{textAlign: 'left'}} p={3} color="primary">Projects that you had pledged</Typography>
                    <DataGrid
                        rows={projects}
                        columns={columns}
                        initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                        }}
                        pageSizeOptions={[5, 10]}
                        onRowClick={handleRowClick}
                        disableRowSelectionOnClick={true}
                    />
                  </Item>
              </Grid>
              
            </Grid>
          </Box>
        )}
    </>
  );
}