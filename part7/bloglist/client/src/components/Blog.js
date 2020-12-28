import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { actions } from '../store'
import blogService from '../services/blogs'

import { Typography } from '@rmwc/typography'
import '@rmwc/typography/styles'
import { Card, CardPrimaryAction, CardActions, CardActionIcons, CardActionIcon } from '@rmwc/card'
import '@rmwc/card/styles'
import { List, ListItem } from '@rmwc/list'
import '@rmwc/list/styles'
import { Button, TextField } from 'rmwc'

const Blog = () => {
  const [newComment, setNewComment] = useState('')
  const dispatch = useDispatch()
  const { id } = useParams()
  const history = useHistory()
  const user = useSelector(state => state.user)
  const blog = useSelector(state => state.blogs.find(b => b.id === id))

  const addLike = async () => {
    try {
      const updated = await blogService.update(blog.id, { likes: blog.likes + 1 })
      dispatch(actions.blogs.update(updated))
    } catch (exception) {
      dispatch(actions.ui.announce(exception.response.data.error))

    }
  }

  const addComment = async () => {
    try {
      const updated = await blogService.update(blog.id, { comments: blog.comments.concat(newComment) })
      dispatch(actions.blogs.update(updated))
      dispatch(actions.ui.announce('Comment has been saved'))
      setNewComment('')
    } catch (exception) {
      dispatch(actions.ui.announce(exception.response.data.error))

    }
  }

  const deleteBlog = async () => {
    try {
      await blogService.remove(blog.id)
      dispatch(actions.blogs.delete(blog.id))
      dispatch(actions.ui.announce(`Blog ${blog.title} has been deleted`))

      history.push('/')

    } catch (exception) {
      dispatch(actions.ui.announce(exception.response.data.error))
    }
  }


  const handleDelete = async () => {
    const res = window.confirm(`Are you sure to permenantly delete ${blog.title}?`)
    if (res) {
      deleteBlog()
    }
  }

  if (!blog) {
    return null
  }

  return <>
    <Card style={{ width: '100%' }}>
      <CardPrimaryAction>
        <div style={{ padding: '0 1rem 1rem 1rem' }}>
          <Typography use="headline6" tag="h2">{blog.title}</Typography>
          <Typography use="subtitle2" tag="h3" theme="textSecondaryOnBackground" style={{ marginTop: '-1rem' }}>by {blog.author}</Typography>
          <Typography use="subtitle2" tag="h3" theme="textSecondaryOnBackground">Likes: {blog.likes}</Typography>
          <Typography use="body1" tag="div" theme="textSecondaryOnBackground">for more info visit: <a href={blog.url} target='_blank' rel="noreferrer">{blog.url}</a></Typography>
        </div>
      </CardPrimaryAction>
      <CardActions>
        <CardActionIcons>
          <CardActionIcon icon="thumb_up" onClick={addLike} />
          {user && blog.user.username === user.username && <CardActionIcon onClick={handleDelete} icon="delete" />}
        </CardActionIcons>
      </CardActions>
    </Card>

    <Typography use="headline6" tag="h2">Comments</Typography>
    <div style={{ display: 'flex' }}>
      <TextField textarea fullwidth rows={1}
        value={newComment}
        onChange={e => setNewComment(e.target.value)}
        label='Add comment' />

      <Button onClick={addComment} label='Save' style={{ margin: '0 1rem', alignSelf: 'flex-end' }} />
    </div>

    <List>
      {blog.comments && blog.comments.map((c, i) => <ListItem key={`${c.id}-${i}`} style={{ whiteSpace: 'pre-wrap' }}>{c}</ListItem>)}
    </List>
  </>
}

export default Blog