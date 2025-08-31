import React from "react"
import { Routes, Route } from "react-router-dom"
import Header from "./components/header/Header"
import Home from "./pages/home/Home"
import "./App.css"

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mars" element={<div>Mars Rovers Page</div>} />
        <Route path="/neo" element={<div>NEO Tracker Page</div>} />
        <Route path="/about" element={<div>About Page</div>} />
      </Routes>
    </>
  )
}

export default App
