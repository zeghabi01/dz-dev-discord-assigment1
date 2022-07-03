import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useData } from '../utils/DataProvider';
import {useNavigate} from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


function Add() {

  const [newUser,setNewUser] = React.useState({})

  const navigate = useNavigate()

  const {dispatch} = useData()

  const handleChange = (e) => {
    setNewUser({...newUser,[e.target.name] : e.target.value})
  }

  const handleAddition = () => {
    dispatch({type:'ADD_USER',payload:{
      id : uuidv4(),
      name :newUser.name,
      username : newUser.username,
      email : newUser.email
    }})
   navigate('/')
  }

  return (
      <Stack spacing={2}>
        <TextField  onChange={handleChange} type={'text'} name='name'   id="outlined-basic" label="Name" variant="outlined" />
        <TextField  onChange={handleChange} type={'text'} name='username'  id="outlined-basic" label="Username" variant="outlined" />
        <TextField  onChange={handleChange} type={'email'} name='email' id="outlined-basic" label="Email" variant="outlined" />
        <Button onClick={handleAddition} color='success' variant="contained">Add User</Button>
      </Stack>
  )
}

export default Add