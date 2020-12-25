import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Collapsible = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      {!visible && <button onClick={toggleVisibility}>{props.label}</button>}
      {visible && <>
        {props.children}
        <button onClick={toggleVisibility}>{props.onLabel}</button>
      </>}
    </div>
  )
})

Collapsible.propTypes = {
  label: PropTypes.string.isRequired,
  onLabel: PropTypes.string.isRequired
}

Collapsible.displayName = 'Collapsible'

export default Collapsible