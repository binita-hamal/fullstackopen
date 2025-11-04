import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient} from "@tanstack/react-query"

import { createAnecdote, getAnecdotes, voteAnecdote } from './services/requests'
import { useNotification } from './NotificationContext'


const App = () => {
  
  const queryClient = useQueryClient()
  const { dispatch } = useNotification()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn:getAnecdotes,
    retry : false
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote)=>{
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote)
      )

      dispatch({ type:'SET_NOTIFICATION', payload:`Anecdote ${newAnecdote.content} created!`})

      setTimeout(()=>{
        dispatch({type:"CLEAR_NOTIFICATION"})
      }, 5000)
    },

    onError:(error)=>{

      dispatch({ type:'SET_NOTIFICATION', payload:'too short anecdote, must have length 5 or more'})

      setTimeout(()=>{
        dispatch({type:"CLEAR_NOTIFICATION"})
      }, 5000)
      
    }
  })

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess:(updatedAn)=>{
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(a=>
        a.id !== updatedAn.id ? a : updatedAn
      ))

      dispatch({ type:'SET_NOTIFICATION', payload:`You voted for ${updatedAn.content}`})

      setTimeout(()=>{
        dispatch({type:"CLEAR_NOTIFICATION"})
      }, 5000)

      
    }
  })



  if(result.isLoading){
    return <div>Loading anecdotes...</div>
  }

  if(result.isError){
    return <div>anecdote service not available due to problems in server</div>
  }


  const handleVote = (anecdote) => {
    console.log('vote')
    voteAnecdoteMutation.mutate(anecdote)
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation}/>

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
