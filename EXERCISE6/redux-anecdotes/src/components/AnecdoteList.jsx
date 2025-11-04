import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {  voteAn } from '../reducers/anecdoteReducer'
import { notificationWithTimeout } from '../reducers/notificationReducer'



function AnecdoteList() {
    const dispatch = useDispatch()





    const anecdotes = useSelector(({anecdotes, filter}) =>{
      return anecdotes.filter ( a=> a.content.toLowerCase().includes(filter.toLowerCase()))
      .sort((a,b) => b.votes-a.votes)
    }
  
    )
  
    const vote = (anecdote) => {
      console.log('vote', anecdote.id)
      dispatch(voteAn(anecdote))
      dispatch(notificationWithTimeout(`You voted: "${anecdote.content}"`,5))
    }
  return (
    <div>


      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => 
            vote(anecdote)
            }>vote</button>
          </div>
        </div>
      ))}
      
    </div>
  )
}

export default AnecdoteList
