import Home from "./screens/home/Home";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div className="main">
        <Home />
      </div>
    </Router>
  );
}
