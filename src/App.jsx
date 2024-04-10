import React from 'react';
import Navbar from './components/navbar/Navbar'
import Home from './page/home/Home'
import Layer0 from './page/layer0/layer0'
import Login from './components/auth/Login'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import { ThemeContextProvider } from './context/ThemeContext'
import ThemeProvider from './providers/ThemeProvider'

const App = () => {
  return (
    <ThemeContextProvider>
      <ThemeProvider>

        <div className="container">
          <Navbar />
          <Home />
          <Layer0 />

          

        </div>

      </ThemeProvider>
    </ThemeContextProvider>
  )
}

export default App



