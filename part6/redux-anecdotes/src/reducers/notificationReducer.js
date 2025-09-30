import { createSlice } from "@reduxjs/toolkit";


const notificationSlice = createSlice({
    name:"notification",
    initialState:"welcome bini",
    reducers:{
        setNotification(state,action){
            return action.payload
        },
        clearNotification(){
            return ""
        }
    }
})

export const{setNotification,clearNotification} = notificationSlice.actions

let timeout
export const showNotification  = (message,seconds=5)=>{
    return async (dispatch)=>{
        if(timeout){
            clearTimeout(timeout)
        }
        dispatch(setNotification(message))

        timeout = setTimeout(()=>{
            dispatch(clearNotification())
        },seconds * 1000)
    }
  
}
export default notificationSlice.reducer