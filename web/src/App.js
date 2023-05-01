import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import "./App.css";
import Login from "./components/Login";
import Notes from "./components/Notes";
import Register from './components/Register';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/notes" element={<Notes />} />
          <Route path='/register' element={<Register/>}/>
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
