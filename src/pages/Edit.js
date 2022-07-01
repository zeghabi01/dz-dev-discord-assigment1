import React from 'react'
import { useData } from '../utils/DataProvider';
import {useNavigate,useParams} from 'react-router-dom'

function Edit() {

  const {id} = useParams()

  const [user,setUser] = React.useState({})

  const navigate = useNavigate()

  const {dispatch} = useData()

  // const handleEdit = () =>  {

  //   dispatch({type:'EDIT_USER',payload:{
  //     id : id,
  //     newUser : {
  //       id : id,
  //       name :user.name,
  //       username : user.username,
  //       email : user.email
  //     }
  //   }})

  //  navigate('/')

  // }

  const handleChange = (e) => {
    setUser({...user,[e.target.name] : e.target.value})
  }


  return (
    <>
    <h1>EDIT</h1>
    {/* <div>Edit</div>
    <input  type={'text'} onChange={handleChange} name='name' placeholder='name'></input>
    <input  type={'text'} onChange={handleChange} name='username' placeholder='username'></input>
    <input  type={'email'} onChange={handleChange} name='email' placeholder='email'></input>
    <button onClick={handleEdit}>edit user</button> */}
  </>
  )
}

export default Edit