import React from 'react'
import { useAuthSystem } from '../utils/AuthSystem'
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
      <input onChange={handleChange} type={'email'} name='email' placeholder='email' defaultValue={'johndoe66@gmail.com'}/>
      <input onChange={handleChange} type={'password'} name='password' placeholder='password' defaultValue={'somePassword'}/>
      <button onClick={handleSubmit}>Login</button>
    </>
  )
}

export default Login