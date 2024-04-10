// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './page/home/Home';
import Layer0 from './page/layer0/layer0';
import Layer1 from './page/layer1/layer1'; // Import the Layer1 component
import Layer2 from './page/layer2/layer2'; // Import the Layer1 component
import { ThemeContextProvider } from './context/ThemeContext';
import ThemeProvider from './providers/ThemeProvider';
import './App.css';

const App = () => {
  return (
      <ThemeContextProvider>
        <ThemeProvider>
          <div className="container">
            <Navbar />
            <Routes>
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/" element={<Layer0 />} />
              <Route path="/layer1" element={<Layer1 />} /> {/* Add route for Layer1 */}
              <Route path="/layer2" element={<Layer2 />} /> {/* Add route for Layer1 */}
            </Routes>
          </div>
        </ThemeProvider>
      </ThemeContextProvider>
  );
};

export default App;
