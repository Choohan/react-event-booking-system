'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useAuthContext } from '../../../hooks/useAuthContext'
import { db } from '../../../firebase/config'
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import Typography from '@mui/material/Typography';
import './details.css'
import Stack from '@mui/material/Stack';
import { format } from 'date-fns';
import Button from '@mui/material/Button';
import { redirect } from 'next/navigation'
import Alert from '@mui/material/Alert'
import { useRouter } from 'next/navigation';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


export default function projectDetails({ params }) {
  const router = useRouter()
    const { user, authIsReady } = useAuthContext()
    const [ projectDetails, setProjectDetails ] = React.useState([])
    const [ startDate, setStartDate ] = React.useState(null)
    const [ endDate, setEndDate ] = React.useState(null)
    const [userType, setUserType] = React.useState(null)

    const [ successMsg, setSuccessMsg ] = React.useState(null)
    const [ errorMsg, setErrorMsg ] = React.useState(null)

    const [ vCount, setVCount ] = React.useState(0)


    React.useEffect(() => {
        async function getProjectDetails(projectID){
            const userRef = doc(db, 'projects', projectID);
            const docSnap = await getDoc(userRef)
            if (docSnap.exists()) {
                setProjectDetails(docSnap.data());
                setStartDate(format(docSnap.data()['start-time'].toDate(), 'dd MMM yy hh:mm a'))
                setEndDate(format(docSnap.data()['end-time'].toDate(), 'dd MMM yy hh:mm a'))

                var currentVolunteers = 0
                if(docSnap.data()['volunteers'] != null){
                  currentVolunteers = docSnap.data()['volunteers'].length
                  console.log(currentVolunteers)
                }

                setVCount(currentVolunteers)
            } else {
                console.log('Error occured! No such document.')
            }
        }

        if(user){
            getProjectDetails(params.id)
        }
    }, [user])
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

    const handlePledge = async () => {
      var registeredVolunteers = []
      if(projectDetails['volunteers']){
        registeredVolunteers = projectDetails['volunteers']
      }

      if(registeredVolunteers.includes(user.uid)){

        setErrorMsg('You had already pledge in this project.')
        return
      }

      registeredVolunteers.push(user.uid)

      const targetRef = doc(db, 'projects', params.id)

      // Set the "capital" field of the city 'DC'
      await updateDoc(targetRef, {
        volunteers: registeredVolunteers
      });

      setVCount(registeredVolunteers.length)

      setSuccessMsg('Pledge Successfully!')
    }

    const [deleteConf, setDeleteConf] = React.useState(false)
    const [warningMsg, setWarningMsg] = React.useState(null)
    const handleDelete = async () => {
      if(!deleteConf){
        setWarningMsg('Please click again to confirm the deletion.')
        setDeleteConf(true)
      }else{
        await deleteDoc(doc(db, 'projects', params.id ))
        router.push('/dashboard')
        
      }
    }
  return (
    <Box sx={{ flexGrow: 1 }}>
      {!user && redirect('/')}
      <Grid
       container 
       spacing={2} 
       columns={12}
       justifyContent="flex-start"
       alignContent="flex-start"
       className="details"
       mt={10}
      >
        <Grid item xs={6}
            className="details-photo"
        >
            <img src={projectDetails['image-url']} />
        </Grid>

        <Grid item xs={6} className='details-box'>
          <Item>
            {successMsg && (
              <Alert severity="success">{successMsg}</Alert>
            )}
            {errorMsg && (
              <Alert severity="error">{errorMsg}</Alert>
            )}
            {warningMsg && (
              <Alert severity="warning">{warningMsg}</Alert>
            )}
            <Typography className="project-title" mb={2}>{projectDetails['project-title']}</Typography>
            <Stack direction="column" sx={{mb:1}}>
              <Typography className="details-title">Project Description</Typography>
              <Typography className="details-description">{projectDetails['project-description']}</Typography>
            </Stack>
            <Stack direction="column" sx={{mb:1}}>
              <Typography className="details-title">Project Category</Typography>
              <Typography className="details-description">{projectDetails['project-cat']}</Typography>
            </Stack>
            <Stack direction="column" sx={{mb:1}}>
              <Typography className="details-title">Project Beneficiary</Typography>
              <Typography className="details-description">{projectDetails['project-beneficiary']}</Typography>
            </Stack>
            <Stack direction="column" sx={{mb:1}}>
              <Typography className="details-title">Project Duration</Typography>
              <Typography className="details-description">{startDate} - {endDate}</Typography>
            </Stack>
            <Stack direction="column" sx={{mb:1}}>
              <Typography className="details-title">Donation Required</Typography>
              <Typography className="details-description">RM{projectDetails['donations-required']}</Typography>
            </Stack>
            <Stack direction="column" sx={{mb:2}}>
              <Typography className="details-title">Volunteers Required</Typography>
              <Typography className="details-description">{vCount} / {projectDetails['volunteer-required']}</Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              {userType == 1 && vCount < projectDetails['volunteer-required'] && (
                <Button variant="contained" onClick={handlePledge}>Pledge</Button>
              )}
              {userType == 2 && projectDetails['owner'] == user.uid && (
                <>
                  <Button variant='contained' onClick={() => {
                  router.push('/edit-project/' + params.id)
                }}>Edit</Button>
                  <Button onClick={handleDelete}>Delete</Button>
                </>
              )}
            </Stack>
          </Item>
        </Grid>
        
      </Grid>
    </Box>
  );
}