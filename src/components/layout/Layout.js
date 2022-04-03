import React from 'react'

const Layout = ({ children }) => {
  return (
    <div>
      This Is Layout Component
      { /* header will be here */ }
      { children }
    </div>
  )
}

export default Layout
