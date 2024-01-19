import { useState } from 'react'
import './App.css'

function App() {
  return (
    <>
      <h1>A react app with Appwrite</h1>
      {console.log(import.meta.env.VITE_APPWRITE_URL)}
    </>
  )
}

export default App
