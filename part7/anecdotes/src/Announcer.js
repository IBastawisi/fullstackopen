import React from 'react'

export const Announcer = ({announcement}) => {
  if (!announcement) {
    return null
  }
  return (
    <div className={`announcement ${announcement.style}`}>
      {announcement.message}
    </div>
  )
}