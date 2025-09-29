import {configureStore} from "@reduxjs/toolkit"
import filterReducer from './reducers/filterReducer'
import anecdoteReducer,{appendAnecdotes} from './reducers/anecdoteReducer'
import notificationReducer from "./reducers/notificationReducer"
import anecdoteService from "./services/anecdote"

const store = configureStore({
  reducer:{
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
  }
})

anecdoteService.getAll().then(anecdotes=>
    anecdotes.forEach(anec =>{
        store.dispatch(appendAnecdotes(anec))
    })
)


export default store