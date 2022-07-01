import React from 'react'
import { useData } from '../utils/DataProvider';
import {useNavigate,useParams} from 'react-router-dom'

function Edit() {

  const [user,setUser] = React.useState({
    name : '',
    username : '',
    email : ''
  })

  const {id} = useParams()

  const navigate = useNavigate()

  const {dispatch,users} = useData()

  React.useEffect(()=>{
    users.filter((item) => {

      if(item.id === id) {
        console.log(item.id,id);
        setUser({
          name : item.name,
          username : item.username,
          email : item.email
        })
      }
    })
  },[id])

  const handleChange = (e) => {
    setUser({...user,[e.target.name] : e.target.value})
  }

  const handleEdit = () =>  {
      dispatch({type:'EDIT_USER',payload:{
      id : id,
      newUser : {
          id : id,
          name : user.name,
          username : user.username,
          email : user.email
      }
      }})
      navigate('/')
  }

  return (
    <>
    <div>Edit</div>
    <input onChange={handleChange} value={user.name} type={'text'} name='name' placeholder='name'></input>
    <input onChange={handleChange} value={user.username} type={'text'} name='username' placeholder='username'></input>
    <input onChange={handleChange} value={user.email} type={'email'} name='email' placeholder='email'></input>
    <button onClick={handleEdit}>edit user</button>
  </>
  )
}

export default Edit