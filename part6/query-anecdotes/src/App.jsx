import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import { getAnecdotes, voteAnecdote } from './requests'
import { useMutation,useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

   const result = useQuery({
    queryKey:['anecdotes'],
    queryFn:getAnecdotes,
    retry:1
   })




   const voteMutation = useMutation({
    mutationFn:voteAnecdote,
    onSuccess:(updatedAnecdotes)=>{
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(a => a.id === updatedAnecdotes.id ? updatedAnecdotes : a))

      dispatch({type:'SET_NOTIFICATION',payload: `anecdote ${updatedAnecdotes.content} voted `})
      setTimeout(()=> dispatch({type:"CLEAR_NOTIFICATION"}),5000)

    
    }
   })


   if(result.isLoading){
    return <div>loading data...</div>
   }

   if(result.isError){
    return (
      <div>
        anecdote service not available due to problems in server
      </div>
    )
   }

   const anecdotes = result.data

  const handleVote = (anecdote) => {
    console.log('vote')
    voteMutation.mutate(anecdote)
  }

  // const anecdotes = [
  //   {
  //     "content": "If it hurts, do it more often",
  //     "id": "47145",
  //     "votes": 0
  //   },
  // ]

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
