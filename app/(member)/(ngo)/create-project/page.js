'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './create.css'
import { TextField, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {useDropzone} from 'react-dropzone';
import Button from '@mui/material/Button';
import { db, storage } from '../../../firebase/config'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 as uuid } from "uuid"
import { doc, setDoc, Timestamp } from 'firebase/firestore'
import { redirect } from 'next/navigation'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };
  
  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: '100%',
    height: 'auto',
    padding: 4,
    boxSizing: 'border-box'
  };
  
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };
  
  const img = {
    display: 'block',
    width: '100%',
    height: '100%'
  };

  let targetImage = null
  
function Previews(props) {
    const [files, setFiles] = React.useState([]);
    const {getRootProps, getInputProps} = useDropzone({
      accept: {
        'image/*': ['.png', '.jpg', '.jpeg', '.gif']
      },
      multiple: false,
      onDrop: acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })));
        targetImage = acceptedFiles[0]
      }
    });
    
    const thumbs = files.map(file => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
            // Revoke data uri after image is loaded
            onLoad={() => { URL.revokeObjectURL(file.preview) }}
          />
        </div>
      </div>
    ));
  
    React.useEffect(() => {
      // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
      return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);
  
    return (
      <section className="container">
        <div {...getRootProps({className: 'dropzone'})} style={{border: '2px dotted lightgrey', padding: '50px 20px'}}>
          <input {...getInputProps()} id="photo" name="photo" />
          <p><b>Upload a file or drag and drop</b></p>
          <p>PNG, JPG, GIF up to 10MB</p>
            <aside style={thumbsContainer}>
            {thumbs}
            </aside>
        </div>
      </section>
    );
  }
  

export default function RegisterPage() {
  
    const { user, authIsReady } = useAuthContext()
    const handleSubmit = async (e) => {
        e.preventDefault();
        var projectName = e.target.projectName.value
        var website = e.target.website.value
        var description = e.target.description.value
        var volunteer = e.target.volunteer.value
        var donation = e.target.donation.value
        var beneficiary = e.target.beneficiary.value
        var startDate = e.target.startDate.value
        var endDate = e.target.endDate.value
        var category = e.target.category.value
        const imageRef = ref(storage, 'image/' + uuid())

        uploadBytes(imageRef, targetImage).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            var projectData = {
              'project-title': projectName,
              'project-description': description,
              'volunteer-required': volunteer,
              'donations-required': donation,
              'project-beneficiary': beneficiary,
              'start-time': Timestamp.fromDate(new Date(startDate)),
              'end-time': Timestamp.fromDate(new Date(endDate)),
              'image-url': url,
              'project-cat': category,
              'owner': user.uid
            }
    
            setDoc(doc(db, "projects", website), projectData)
    
            console.log('success')
          }).catch((error) => {
            console.log(error.message)
          })
        }).catch((error) =>{
          console.log(error.message)
        })

        
    }
  return (
    <Box sx={{ flexGrow: 1 }}>
    <form id="form" onSubmit={handleSubmit}>
      <Grid
       container 
       spacing={2} 
       columns={12}
       justifyContent="center"
       alignContent="center"
       mt={10}
       className="create-form"
      >
        {!user && redirect('/')}
        <Grid item xs={12}>
          <Item>
            <Grid 
                container 
                spacing={1} 
                columns={12}
                justifyContent="center"
                alignContent="center"
                className="create-form">
                    <Grid item xs={12}>
                        <Typography className="section-title">Project</Typography>
                        <Typography className="section-description">Select project to maintain</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Project Name" variant="outlined" required fullWidth margin='normal' name='projectName' />
                        <TextField label="Website" name="website" variant="outlined" required fullWidth margin='normal' InputProps={{
                            startAdornment: <InputAdornment position='start'>https://{window.location.host}/project/</InputAdornment>
                        }} />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Typography className="section-title">Project information</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Description"
                            variant="outlined"
                            multiline
                            rows={4}
                            required
                            fullWidth
                            margin="normal"
                            name="description" />
                        <Stack direction="row" spacing={2} mt={2}>
                            <TextField label="Volunteer Required" varian="outlined" required fullWidth margin="normal" type="number" name="volunteer" />
                            <TextField label="Donation Required" varian="outlined" required fullWidth margin="normal" type="number" name="donation" />
                        </Stack>
                        <Stack direction="row" spacing={2} mt={2} mb={2}>
                            <TextField label="Target Beneficiary" varian="outlined" required fullWidth margin="normal" name="beneficiary" />
                            <TextField label="Category" varian="outlined" required fullWidth margin="normal" name="category" />
                        </Stack>
                        <Stack direction="row" spacing={2} mt={2} mb={2}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker label="Project Start Date Time" sx={{width: '100%'}}
                                slotProps={{
                                textField: {
                                    required: true,
                                    name: 'startDate',
                                },
                                }} />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker label="Project End Date Time" sx={{width: '100%'}}
                                slotProps={{
                                textField: {
                                    required: true,
                                    name: 'endDate',
                                },
                                }} />
                            </LocalizationProvider>
                        </Stack>
                        <Previews />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained">Submit</Button>
                    </Grid>
            </Grid>
          </Item>
        </Grid>
      </Grid>
      </form>
    </Box>
  );
}