import React from 'react'
import { useData } from '../utils/DataProvider';
import {useNavigate,useParams} from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function Edit() {

  const {id} = useParams()

  const [user,setUser] = React.useState({
    name : '',
    username : '',
    email : ''
  })

  const {users} = useData()

  const navigate = useNavigate()

  const {dispatch} = useData()

  React.useEffect(()=> {

    const targetUser = users.find((item) => item.id.toString() === id)


    console.log(targetUser);

    if(targetUser) {
      setUser({
        name : targetUser.name,
        username : targetUser.username,
        email : targetUser.email
      })
    }

  
  },[users,id])

  React.useEffect(()=> {
    console.log(user);
  },[user])

 

  const handleEdit = () =>  {
    dispatch({type:'EDIT_USER',payload:{
      id : id,
      newUser : {
        id : id,
        name :user.name,
        username : user.username,
        email : user.email
      }
    }})
    navigate('/')
  }

  const handleChange = (e) => {
    setUser({...user,[e.target.name] : e.target.value})
  }


  return (
    <>
    <Stack spacing={2}>
        <TextField value={user.name} onChange={handleChange} type={'text'} name='name'   id="outlined-basic" label="Name" variant="outlined" />
        <TextField value={user.username}  onChange={handleChange} type={'text'} name='username'  id="outlined-basic" label="Username" variant="outlined" />
        <TextField value={user.email}  onChange={handleChange} type={'email'} name='email' id="outlined-basic" label="Email" variant="outlined" />
        <Button onClick={handleEdit} color='success' variant="contained">Edit User</Button>
    </Stack>
  </>
  )
}

export default Edit