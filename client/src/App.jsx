import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

function App() {
  const [page, setPage] = useState("login");

  return (
    <div>
      <h1>TaskMatrix</h1>

      <button onClick={() => setPage("login")}>
        Login
      </button>

      <button onClick={() => setPage("register")}>
        Register
      </button>

      {page === "login" ? <Login /> : <Register />}
    </div>
  );
}

export default App;