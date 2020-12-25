import React, { useState, useImperativeHandle } from 'react'

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

export default Collapsible