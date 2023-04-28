import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import "./App.css";
import Login from "./components/Login";
import Notes from "./components/Notes";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
