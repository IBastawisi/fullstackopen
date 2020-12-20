import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good - bad) / all;
  const positive = good / all * 100;

  if (all > 0) return (
    <table>
      <tbody>
        <Statistic text="Good" value ={good} />
        <Statistic text="Neutral" value ={neutral} />
        <Statistic text="Bad" value ={bad} />
        <Statistic text="All" value ={all} />
        <Statistic text="Average" value ={average.toFixed(2)} />
        <Statistic text="Positive" value ={positive.toFixed() + "%"} />  
      </tbody>
    </table>
  )
  return <p>No Feedback Given</p>
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)
const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="Good" />
      <Button onClick={() => setNeutral(neutral + 1)}  text="Neutral" />
      <Button onClick={() => setBad(bad + 1)}  text="Bad" />
      <h2>Statistics</h2>
      <Statistics {...{good, neutral, bad}} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)