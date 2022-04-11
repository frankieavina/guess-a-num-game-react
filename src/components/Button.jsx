import React from 'react'

function Button({children, onClick, disable}) {
  return (
        <button type='button' onClick={onClick} disabled={disable}>
            {children}
        </button>
  )
}

export default Button