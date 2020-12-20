import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => <h1>{props.course}</h1>

const Content = props => {
  const [part1, part2, part3] = props.parts;
  return <>
    <Part {...part1} />
    <Part {...part2} />
    <Part {...part3} />
  </>
}

const Part = props => <p>{props.name} {props.exercises}</p>

const Total = props => <p>Number of exercises {props.total}</p>

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))