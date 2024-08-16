import { useState } from 'react'
import{ BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import './App.css'

import BusinessProfile from './components/BusinessProfile/BusinessProfile'

function App() {

  return (
    <>
      <BrowserRouter >
      <Routes>
      <Route path="/" element={ <h1>Routeless Page</h1> } />
      <Route path="/profiles/business/:id" element={ <BusinessProfile /> } />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
