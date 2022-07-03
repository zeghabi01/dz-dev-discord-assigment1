import React from 'react'
import { useAuthSystem } from '../utils/AuthSystem'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';



function Login() {

  const [x,setX] = React.useState({email:'johndoe66@gmail.com',password:'somePassword'})
  const {login} = useAuthSystem()

  const handleSubmit = () => {
    login(x.email,x.password)
  }

  const handleChange = (e) => {
    setX({...x,[e.target.name]:e.target.value})
  }
  
  return (
    <>
      <Stack spacing={2}>
        <TextField  onChange={handleChange} type={'email'}  defaultValue={'johndoe66@gmail.com'} id="outlined-basic" label="Email" variant="outlined" />
        <TextField  onChange={handleChange} type={'password'} defaultValue={'somePassword'} id="outlined-basic" label="Password" variant="outlined" />
        <Button onClick={handleSubmit} color='success' variant="contained">Login</Button>
      </Stack>
   </>
  )
}

export default Login