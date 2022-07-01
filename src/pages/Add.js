import React from 'react'
import { useAuthSystem } from '../utils/AuthSystem'
import { v4 as uuidv4 } from 'uuid';
import { useData } from '../utils/DataProvider';
import {useNavigate} from 'react-router-dom'


function Add() {

  const [newUser,setNewUser] = React.useState({})

  const navigate = useNavigate()

  const {dispatch} = useData()

  const handleChange = (e) => {
    setNewUser({...newUser,[e.target.name] : e.target.value})
  }

  const handleAddition = () => {
    console.log(newUser);
    dispatch({type:'ADD_USER',payload:{
      id : uuidv4(),
      name :newUser.name,
      username : newUser.username,
      email : newUser.email
    }})
   navigate('/')
  }

  return (
    <>
      <div>Add</div>
      <input onChange={handleChange} type={'text'} name='name' placeholder='name'></input>
      <input onChange={handleChange} type={'text'} name='username' placeholder='username'></input>
      <input onChange={handleChange} type={'email'} name='email' placeholder='email'></input>
      <button onClick={handleAddition}>add user</button>
    </>
  )
}

export default Add