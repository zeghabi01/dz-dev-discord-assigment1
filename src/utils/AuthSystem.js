import axios from 'axios'
import React from 'react'

const authContext = React.createContext()

export function useAuthSystem() {
    return React.useContext(authContext)
}

function AuthSystem({children}) {

  const [token,setToken] = React.useState(localStorage.getItem('token'))
  const [loading,setLoading] = React.useState(false)

  const login = async (email,password) => {

    const config = {
      headers: {
          'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({email,password})

    try {

      const res = await axios.post(`https://dz-dev-discord-assigment1-api.herokuapp.com/login`,body,config)

      setToken(res.data.token)

      localStorage.setItem('token',res.data.token)

    }catch(err) {

      console.log(err);

    }

  }

  

  const logout = () => {
    setToken(null)
    localStorage.removeItem('token')
  }

  const theData = {
    login,
    logout,
    loading,
    token,
  }

  return (
    <authContext.Provider value={theData}>
        {children}
    </authContext.Provider>
  )
}

export default AuthSystem