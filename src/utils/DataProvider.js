import React from 'react'
import { useAuthSystem } from './AuthSystem';
import axios from 'axios'

const dataContext = React.createContext()

export function useData() {
    return React.useContext(dataContext)
}

const reducer = (state, action) => {
    switch (action.type) {
      case "INIT_USERS": return [...action.payload]
      case "ADD_USER": return [...state,action.payload] 
      case "DELETE_USER": return state.filter((item)=> item.id !== action.payload)
      case "EDIT_USER": {
        const index = state.findIndex((row) => row.id.toString() === action.payload.id);
        state[index] = action.payload.newUser
        return [...state]
      }
      default:
        return state;
    }
};

function DataProvider({children}) {

    const [users, dispatch] = React.useReducer(reducer, []);

    const [fetch,setFetch] = React.useState(true)

    const {token} = useAuthSystem()

    const loadData = async () => {
        
        const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
        };

        try {

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/data`,config)

        dispatch({type:'INIT_USERS',payload:res.data})

        }catch(err) {

        console.log(err);

        }

    }
    
    const theData = {
        loadData,
        dispatch,
        users,
        fetch,
        setFetch
    }

  return (
    <dataContext.Provider value={theData}>
        {children}
    </dataContext.Provider>
  )
}

export default DataProvider

