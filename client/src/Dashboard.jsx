import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const getProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        setMessage(data.message);
        setUser(data.user);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    getProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h2>TaskMatrix Dashboard</h2>

      <p>{message}</p>

      {user && (
        <p>
          Logged in as: {user.email}
        </p>
      )}

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;