import React from 'react'

export const Course = ({ course }) => {
    const total = course.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)
    return <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total total={total} />
    </div>
}

const Header = props => <h1>{props.course}</h1>

const Content = props => <>{props.parts.map(part => <Part key={part.id} {...part} />)} </>

const Part = props => <p>{props.name} {props.exercises}</p>

const Total = props => <p><b>Number of exercises {props.total}</b></p>
