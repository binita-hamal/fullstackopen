const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async()=>{
    const response  = await fetch(baseUrl)

    if(!response.ok){
        throw new Error('Failed to fetch anecdotes')
      }
    
   
      return await response.json()
}


export const createAnecdote = async(newAnc)=>{

    const response = await fetch(baseUrl,{
        method:"POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAnc)
    })

    if(!response.ok){
        throw new Error('Failed to create anecdotes')
      }
    return await response.json()

}

export const voteAnecdote = async(anecdote)=>{
    const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
    }

    const response = await fetch(`${baseUrl}/${anecdote.id}`,{
        method:"PUT",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedAnecdote)
    })


    if(!response.ok){
        throw new Error('Failed to update anecdotes')
      }

      return await response.json()


}