import { createContext, useReducer, useContext } from 'react'

//reducer function
const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

//create context object
const NotificationContext = createContext()

//provider component

export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={{ notification, dispatch }}>
      {children}
    </NotificationContext.Provider>
  )
}


//custom hook for easier access
export const useNotification = ()=>{
    return useContext(NotificationContext)
}
