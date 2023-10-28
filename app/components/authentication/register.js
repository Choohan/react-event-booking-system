import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useSignup } from '../../hooks/useSignup';
import Alert from '@mui/material/Alert';

export default function signUp() {
    const { error, signup } = useSignup()
    const [errorMsg, setErrorMsg] = React.useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault();
        var title = e.target.title.value
        var fullname = e.target.fullname.value
        var gender = e.target.gender.value
        var age = e.target.age.value
        var state = e.target.state.value
        var email = e.target.email.value
        var password = e.target.password.value
        var cpassword = e.target.cpassword.value
        var userType = e.target.userType.value
        var organization = e.target.organization.value

        if(age < 16){
            setErrorMsg('Error: You must be at least 16 years old to join as our volunteer!')
            return
        }else if(password !== cpassword){
            setErrorMsg('Error: Password unmatched! Please try again.')
            return
        }

        var userData = {
            title: title,
            fullname: fullname,
            gender: gender,
            age: age,
            state: state,
            userType: userType,
            organization: organization
          }
        signup(email, password, userData)
    }

    const userTypeChange = (e) => {
        var userType = e.target.value
        if(userType == 1){
            document.getElementById('organization').disabled = true
            document.getElementById('organization').value = ''
            document.getElementById('organization').classList.add('Mui-disabled')
            alert()
            document.getElementById('organization').parentElement.classList.add('Mui-disabled')
        }else{
            document.getElementById('organization').disabled = false
            document.getElementById('organization').classList.remove('Mui-disabled')
            document.getElementById('organization').parentElement.classList.remove('Mui-disabled')
        }
    }
  return (
    < >
        <Image
            src="/logo.png"
            width="300"
            height="100"
            alt="logo"
            style={{margin: "auto", marginBottom: "10px"}}
        />
        <Typography variant="h5" gutterBottom fontWeight="Bold">
            Join us as a Volunteer!
        </Typography>
        
        {error && 
        <Alert severity="error">{error}</Alert>
        }
        {errorMsg && 
        <Alert severity="error">{errorMsg}</Alert>
        }
        <form id="form" onSubmit={handleSubmit}>
        <Grid 
                container 
                spacing={2} 
                columns={5}>
            <Grid item xs={1}>
            <TextField 
                select 
                label="Title" 
                variant="outlined" 
                required 
                fullWidth 
                margin="normal"
                defaultValue="Mr."
                name="title"
                >
                <MenuItem value="Mr.">Mr.</MenuItem>
                <MenuItem value="Mrs.">Mrs.</MenuItem>
                <MenuItem value="Ms.">Ms.</MenuItem>
                <MenuItem value="Dr.">Dr.</MenuItem>
                <MenuItem value="Dato'">Dato'</MenuItem>
                <MenuItem value="Datin">Datin</MenuItem>
                <MenuItem value="Prof.">Prof</MenuItem>
            </TextField>
            </Grid>
            <Grid item xs={4}>
                <TextField label="Full Name" variant="outlined" required fullWidth margin="normal" name="fullname" />
            </Grid>
        </Grid>
        <Grid
            container
            spacing={2}
            columns={2}>
                <Grid item xs={1}>
                    <TextField 
                        select
                        label="Gender"
                        variant="outlined"
                        required 
                        fullWidth 
                        margin="normal"
                        defaultValue="Male"
                        name="gender"
                    >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={1}>
                    <TextField label="Age" type="number" variant="outlined" required fullWidth margin='normal' name="age" />
                </Grid>
        </Grid>
        <Grid
            container
            spacing={2}
            columns={2}>
            <Grid item xs={1}>
                <TextField 
                    select
                    label="State"
                    variant="outlined"
                    required 
                    fullWidth 
                    margin="normal"
                    defaultValue="Pulau Pinang"
                    name="state"
                >
                    <MenuItem value="Pulau Pinang">Pulau Pinang</MenuItem>
                </TextField>
            </Grid>
                <Grid item xs={1}>
                    <TextField label="Email" type="email" variant="outlined" required fullWidth margin="normal" name="email" />
                </Grid>
        </Grid>
        <Grid 
            container
            spacing={2}
            columns={2}>
            <Grid item xs={1}>
                <TextField 
                    select
                    label="Who are you?"
                    variant="outlined"
                    required 
                    fullWidth 
                    margin="normal"
                    defaultValue="1"
                    name="userType"
                    onChange={userTypeChange}
                >
                    <MenuItem value="1">Volunteer</MenuItem>
                    <MenuItem value="2">NGO</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={1}>
                <TextField label="Organization Name" variant="outlined" required fullWidth margin="normal" name="organization" id="organization" disabled />
            </Grid>
        </Grid>
        <Grid
            container
            spacing={2}
            columns={2}>
            <Grid item xs={1}>
                <TextField label="Password" type="password" variant="outlined" required fullWidth margin="normal" name="password" />
            </Grid>
                <Grid item xs={1}>
                    <TextField label="Confirm Password" type="password" variant="outlined" required fullWidth margin="normal" name="cpassword" />
                </Grid>
        </Grid>
        <Button type="submit" variant="outlined" endIcon={<LockOpenIcon />} size="large" sx={{mt: 3}}>Sign Up</Button>
        </form>
    </>
  );
}