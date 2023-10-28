
import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import Image from 'next/image';
import { useLogin } from '../../hooks/useSignin';
import Alert from '@mui/material/Alert';
import { redirect } from 'next/navigation'



export default function Login() {
  const { error, login } = useLogin()
  const handleSubmit = async (e) => {
      e.preventDefault();
      var email = e.target.email.value
      var password = e.target.password.value
      login(email, password)
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
        
        {error && 
        <Alert severity="error">{error}</Alert>
        }
        <Typography variant="h5" gutterBottom fontWeight="Bold">
            Welcome Back!
        </Typography>
        <form id="form" onSubmit={handleSubmit}>
        <TextField label="Email" type="email" variant="outlined" name="email" required fullWidth margin="normal" />
        <TextField label="Password" type="password" variant="outlined" name="password" required fullWidth margin="normal" />
        <Button type="submit" variant="outlined" endIcon={<LoginIcon />} size="large" sx={{mt: 3}} style={{maxWidth: '150px', marginLeft: 'auto', marginRight: 'auto'}}>Log In</Button>
        </form>
    </>
  );
}