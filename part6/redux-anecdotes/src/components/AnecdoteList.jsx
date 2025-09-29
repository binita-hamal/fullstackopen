import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

function AnecdoteList() {
  const dispatch = useDispatch();

  // const anecdotes = useSelector(state => state)
  const anecdotes = useSelector((state) =>
    [...state.anecdotes].sort((a, b) => b.votes - a.votes)
  );

  const filter = useSelector(state=> state.filter)
  const filteredAnecdotes = anecdotes.filter(a=>
    a.content.toLowerCase().includes(filter.toLowerCase())
  )

  const vote = (anecdote) => {
    console.log("vote", anecdote.id);
    dispatch(voteAnecdote(anecdote.id));
    dispatch(showNotification(`You voted for ${anecdote.content}`,5))
  };

  return (
    <div>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnecdoteList;
