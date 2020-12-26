import React from 'react'
import { useSelector } from 'react-redux'

export const Announcer = () => {
  const announcement = useSelector(state => state.announcement)
  if (!announcement) {
    return null
  }
  return (
    <div className={`announcement ${announcement.style}`}>
      {announcement.message}
    </div>
  )
}