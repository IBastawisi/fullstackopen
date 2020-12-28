import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


const register = async user => {
  const response = await axios.post(baseUrl, user)
  return response.data
}

export default { getAll, register }