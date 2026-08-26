import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";

function App() {
  return (
    <BrowserRouter>
      <h1>TaskMatrix</h1>

      <nav>
        <Link to="/login">Login</Link>{" "}
        <Link to="/register">Register</Link>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;