import React, { useState } from 'react'
import { TextField } from '@rmwc/textfield'
import '@rmwc/textfield/styles'
import { Button, Typography } from 'rmwc'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { actions } from '../store'
import { Link, useHistory } from 'react-router-dom'

const LoginForm = () => {
  const [user, setUser] = useState({ username: '', password: '' })
  const dispatch = useDispatch()
  const history = useHistory()

  const handleInput = event => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const loggedinUser = await loginService.login(user)
      window.localStorage.setItem(
        'loggedinUser', JSON.stringify(loggedinUser)
      )
      blogService.setToken(loggedinUser.token)
      dispatch(actions.user.load(loggedinUser))
      history.push('/')
      dispatch(actions.ui.announce(`Welcome back, ${loggedinUser.name}`))
      setUser({ username: '', password: '' })

    } catch (exception) {
      dispatch(actions.ui.announce('wrong credentials'))
    }
  }

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          name='username'
          value={user.username}
          onChange={handleInput}
          label="Username" />
        <TextField
          name="password"
          type="password"
          value={user.password}
          onChange={handleInput}
          label="Password" />

        <Button type="submit" label='Login' style={{ margin: 16 }}/>
        <div>
          <Typography use="subtitle2" tag="span" theme="textSecondaryOnBackground">Don't have account?</Typography>
          <Button tag={Link} to='/register' label='Register' style={{ margin: 16 }}/>
        </div>
      </form>
    </div>
  )
}

export default LoginForm