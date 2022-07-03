import React from 'react'
import { useAuthSystem } from '../utils/AuthSystem'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';



function Login() {

  const [user,setUser] = React.useState({email:'johndoe66@gmail.com',password:'somePassword'})


  const {login} = useAuthSystem()

  const handleSubmit = () => {
    login(user.email,user.password)
  }

  const handleChange = (e) => {
    setUser({...user,[e.target.name]:e.target.value})
  }
  
  return (
    <>
      <Stack spacing={2}>
        <TextField  onChange={handleChange} name='email' type={'email'}  value={user.email} id="outlined-basic" label="Email" variant="outlined" />
        <TextField  onChange={handleChange} name='password' type={'password'} value={user.password} id="outlined-basic" label="Password" variant="outlined" />
        <Button onClick={handleSubmit} color='success' variant="contained">Login</Button>
      </Stack>
   </>
  )
}

export default Login