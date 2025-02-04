import '../css/app.css'
import React from 'react'
import { createRoot } from 'react-dom/client'

function App(): React.ReactElement {
  return (
    <div>
      <h1>Hello, React!</h1>
      <p>Let's build something cool.</p>
    </div>
  )
}

createRoot(document.getElementById('root') as HTMLElement).render(<App />)
