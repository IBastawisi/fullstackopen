import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useHistory } from "react-router-dom"
import { Announcer } from './Announcer'
import './index.css'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to="/">anecdotes</Link>
      <Link style={padding} to="/create">create</Link>
      <Link style={padding} to="/about">about</Link>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
    Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
    such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>FULL STACK WEB APPLICATION DEVELOPMENT</a>.
  </div>
)

const Anecdote = ({ anecdote, vote }) => <>
  <h2>{anecdote.content} by {anecdote.author}</h2>
  <p>has {anecdote.votes} votes</p>
  <p>for more info, see <a href={anecdote.info} target='_blank'>{anecdote.info}</a> votes</p>
  <button onClick={() => vote(anecdote.id)}>vote</button>
</>

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
  </div>
)

const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    history.push('/')
    props.announce({
      message: 'Anecdote was added successfully',
      style: 'success'
    })
    setTimeout(() => {
      props.announce(null)
    }, 5000)

  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}


const App = props => {

  const [anecdotes, setAnecdotes] = useState(props.anecdotes)
  const [announcement, setAnnouncement] = useState(null)


  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
    setAnnouncement({
      message: 'voted successfully',
      style: 'success'
    })
    setTimeout(() => {
      setAnnouncement(null)
    }, 3000)
  }

  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = anecdoteById(match?.params.id)

  return (
    <div>
      <div style={{ minHeight: 'calc(100vh - 50px)' }}>
        <Announcer announcement={announcement} />
        <h1>Software anecdotes</h1>
        <Menu />
        <Switch>
          <Route path="/anecdotes/:id">
            {anecdote ?<Anecdote anecdote={anecdote} vote={vote} />: <p>NOT FOUND!</p>}
          </Route>
          <Route path="/create">
            <CreateNew addNew={addNew} announce={setAnnouncement} />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  )

}

const anecdotes = [
  {
    content: 'If it hurts, do it more often',
    author: 'Jez Humble',
    info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
    votes: 0,
    id: '1'
  },
  {
    content: 'Premature optimization is the root of all evil',
    author: 'Donald Knuth',
    info: 'http://wiki.c2.com/?PrematureOptimization',
    votes: 0,
    id: '2'
  }
]

ReactDOM.render(
  <Router><App anecdotes={anecdotes} /></Router>,
  document.getElementById('root')
)