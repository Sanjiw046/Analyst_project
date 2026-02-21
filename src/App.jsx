import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { routing } from './routing/GlobalRoute'
import './global.css'

const App = () => {
  return (
    <RouterProvider router={routing}>

    </RouterProvider>
  )
}

export default App