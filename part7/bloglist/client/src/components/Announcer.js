import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '../store'
import { Snackbar } from 'rmwc'
import '@rmwc/snackbar/styles'

export const Announcer = () => {
  const announcement = useSelector(state => state.ui.announcement)
  const [timeoutId, setTimeoutId] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (announcement) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      setTimeoutId(setTimeout(() => dispatch(actions.ui.clearAnnouncement()), 3000))
    }
    return () => {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
  }, [announcement])

  if (!announcement) {
    return null
  }
  return <Snackbar open={true} message={announcement} />

}
