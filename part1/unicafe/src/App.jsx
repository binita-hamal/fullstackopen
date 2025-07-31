import { useState } from "react";

function Statistics({good,neutral,bad}) {
  let total = good + neutral + bad;
  let average = (good*1 + neutral *0 + bad * -1)/total;
  let positiveFeedback = (good/total)*100;
  return (
    <>
    <table>
      <StatisticLine feedback="good" value={good}/>
      <StatisticLine feedback="neutral" value={neutral}/>
      <StatisticLine feedback="bad" value={bad}/>
      <StatisticLine feedback="all" value={total}/>
      <StatisticLine feedback="average" value={average}/>
      <StatisticLine feedback="positive" value={positiveFeedback + " %"}/>
      </table>
    </>
  );
}

function StatisticLine({feedback,value}) {
  return (
    <>
      <tr>
      <td>{feedback} </td>
      <td>{value}</td>
      </tr>
    </>
  );
}

function Button({ onClick, label }) {
  return (
    <>
      <button onClick={onClick}>{label}</button>
    </>
  );
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // const [isClicked,setIsClicked] = useState(false)

  return (
    <>
      <h2>Give feedback</h2>

      <Button onClick={() => setGood(good + 1)} label="good" />
      <Button onClick={() => setNeutral(neutral + 1)} label="neutral" />
      <Button onClick={() => setBad(bad + 1)} label="bad" />

      <h3>Statistics</h3>

      {good !== 0 || neutral !== 0 || bad !== 0 ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
}

export default App;
