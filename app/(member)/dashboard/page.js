'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useAuthContext } from '../../hooks/useAuthContext'
import ProjectListing from '../../components/ngo/project-listing'
import ProjectListingUser from '../../components/member/project-listing'
import { db } from '../../firebase/config'
import { doc, getDoc } from "firebase/firestore";
import { redirect } from 'next/navigation'


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function dashboard() {
    const { user, authIsReady } = useAuthContext()
    const [userType, setUserType] = React.useState(null)
    React.useEffect(() => {
        async function getUserType(){
            const userRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(userRef)
            if (docSnap.exists()) {
                setUserType(docSnap.data()['userType']);
            } else {
                console.log('Error occured! No such document.')
            }
        }

        if(user){
            getUserType()
        }
    }, [user])
  return (
    <>
    {authIsReady && (
        <Box sx={{ flexGrow: 1 }}>
            {!user && redirect('/')}
            <Grid
            container 
            spacing={2} 
            columns={12}
            justifyContent="center"
            alignContent="center"
            >
                <Grid item xs={12}>
                    {userType == 2 && user && (
                        <ProjectListing owner={user.uid} />
                    )}
                    {userType == 1 && user && (
                        <ProjectListingUser userid={user.uid} />
                    )}
                </Grid>
            </Grid>
            </Box>
    )}
    </>
  );
}