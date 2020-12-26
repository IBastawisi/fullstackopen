import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    'likes': 9,
    'title': 'personal blog',
    'author': 'ibastawisi',
    'url': 'https://ibastawisi.ml/',
    'user': { 'username': 'ibastawisi', 'name': 'Ibrahim El-bastawisi', 'id': '5fe521262dd8b3277cc1a0d2' },
    'id': '5fe52ba9b719c625348c0b9d'
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'personal blog by ibastawisi'
  )
  expect(component.container).not.toHaveTextContent(
    'https://ibastawisi.ml/'
  )
})

test('clicking the view button shows details', async () => {
  const blog = {
    'likes': 9,
    'title': 'personal blog',
    'author': 'ibastawisi',
    'url': 'https://ibastawisi.ml/',
    'user': { 'username': 'ibastawisi', 'name': 'Ibrahim El-bastawisi', 'id': '5fe521262dd8b3277cc1a0d2' },
    'id': '5fe52ba9b719c625348c0b9d'
  }

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('View')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'https://ibastawisi.ml/'
  )
  expect(component.container).toHaveTextContent(
    'Likes: ' + blog.likes
  )
})

test('clicking the like button calls event handler', async () => {
  const blog = {
    'likes': 9,
    'title': 'personal blog',
    'author': 'ibastawisi',
    'url': 'https://ibastawisi.ml/',
    'user': { 'username': 'ibastawisi', 'name': 'Ibrahim El-bastawisi', 'id': '5fe521262dd8b3277cc1a0d2' },
    'id': '5fe52ba9b719c625348c0b9d'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} addLike={mockHandler} />
  )

  const viewButton = component.getByText('View')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('Add like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls.length).toBe(2)
})