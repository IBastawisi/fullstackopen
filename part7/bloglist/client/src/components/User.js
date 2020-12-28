import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { CircularProgress, List, ListItem } from 'rmwc'

const User = () => {
  const { username } = useParams()
  const user = useSelector(state => state.users.find(u => u.username === username))
  if (!user) {
    return <CircularProgress />
  }
  return <div>
    <h2>User {username}</h2>
    <h3>Blogs added by {user.name}</h3>
    <List>
      {user.blogs.map(b => <ListItem key={b.id} tag={Link} to={`/blogs/${b.id}`}>{b.title}</ListItem>)}
    </List>

  </div>
}

export default User