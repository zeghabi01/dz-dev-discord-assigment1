import React from 'react'
import { useData } from '../utils/DataProvider';
import {useNavigate,useParams} from 'react-router-dom'

function Edit() {

  const {id} = useParams()


  const handleEdit = () =>  {
      console.log('edit');
  }

  return (
    <>
    <div>Edit</div>
    <input  type={'text'} name='name' placeholder='name'></input>
    <input  type={'text'} name='username' placeholder='username'></input>
    <input  type={'email'} name='email' placeholder='email'></input>
    <button onClick={handleEdit}>edit user</button>
  </>
  )
}

export default Edit