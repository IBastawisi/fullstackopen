import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './reducer'

const Statistic = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({good, ok, bad}) => {
  const all = good + ok + bad
  const average = (good - bad) / all;
  const positive = good / all * 100;

  if (all > 0) return (
    <table>
      <tbody>
        <Statistic text="Good" value ={good} />
        <Statistic text="Ok" value ={ok} />
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

  const { good, ok, bad } = store.getState()

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={() => store.dispatch({ type: 'GOOD' })} text="Good" />
      <Button onClick={() => store.dispatch({ type: 'OK' })}  text="Ok" />
      <Button onClick={() => store.dispatch({ type: 'BAD' })}  text="Bad" />
      <h2>Statistics</h2>
      <Statistics {...{good, ok, bad}} />
    </div>
  )
}

const store = createStore(counterReducer)

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)