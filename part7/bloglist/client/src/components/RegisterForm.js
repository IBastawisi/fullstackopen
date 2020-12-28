import React, { useState } from 'react'
import { TextField } from '@rmwc/textfield'
import '@rmwc/textfield/styles'
import { Button } from 'rmwc'
import userService from '../services/users'
import { actions } from '../store'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'


const RegisterForm = () => {
  const [user, setUser] = useState({ username: '', name: '', password: '' })
  const dispatch = useDispatch()
  const history = useHistory()

  const handleInput = event => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await userService.register(user)
      dispatch(actions.ui.announce('Account created! please login to continue'))
      setUser({ username: '', name: '', password: '' })
      history.push('/login')

    } catch (exception) {
      dispatch(actions.ui.announce(exception.response.data.error))
    }
  }

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          name='username'
          value={user.username}
          onChange={handleInput}
          label="Username" />
        <TextField
          name='name'
          value={user.name}
          onChange={handleInput}
          label="Name" />
        <TextField
          name="password"
          type="password"
          value={user.password}
          onChange={handleInput}
          label="Password" />

        <Button type="submit" label='Register' style={{ margin: 16 }} />
      </form>
    </div>
  )
}

export default RegisterForm