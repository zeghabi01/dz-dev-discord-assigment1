import React from 'react'
import { useData } from '../utils/DataProvider';
import {useNavigate,useParams} from 'react-router-dom'

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
    <h1>EDIT</h1>
    <div>Edit</div>
    <input  type={'text'}  value={user.name} onChange={handleChange} name='name' placeholder='name'></input>
    <input  type={'text'} value={user.username} onChange={handleChange} name='username' placeholder='username'></input>
    <input  type={'email'} value={user.email} onChange={handleChange} name='email' placeholder='email'></input>
    <button onClick={handleEdit}>edit user</button>
  </>
  )
}

export default Edit