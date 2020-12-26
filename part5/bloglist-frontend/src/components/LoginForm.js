import React, { useState } from 'react'

const LoginForm = ({ login }) => {
  const [user, setUser] = useState({ username: '', password: '' })
  const handleInput = event => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    login(user)
    setUser({ username: '', password: '' })
  }
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            name='username'
            value={user.username}
            onChange={handleInput}
          />
        </div>
        <div>
          password
          <input
            name="password"
            type="password"
            value={user.password}
            onChange={handleInput}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm