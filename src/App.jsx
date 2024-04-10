import Home from "./page/home/Home";
import Layer0 from "./page/layer0/layer0";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layer1 from "./page/layer1/Layer1";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/layer0" element={<Layer0 />} />
          <Route path="/layer1" element={<Layer1 />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
