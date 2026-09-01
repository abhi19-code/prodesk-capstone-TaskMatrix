import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const API_URL = "http://localhost:5000/api/tasks";

function Dashboard() {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("To Do");
  const [dueDate, setDueDate] = useState("");

  const [editingTask, setEditingTask] = useState(null);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const loadDashboard = async () => {
      try {
        const profileResponse = await fetch(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const profileData = await profileResponse.json();

        if (!profileResponse.ok) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        setMessage(profileData.message);
        setUser(profileData.user);

        await getTasks(token);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    loadDashboard();
  }, [navigate]);

  const getTasks = async (token) => {
    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        setTasks(data.tasks);
      }
    } catch (error) {
      setMessage("Failed to load tasks");
    }
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setStatus("To Do");
    setDueDate("");
    setEditingTask(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!title || !description) {
      setMessage("Please enter title and description");
      return;
    }

    setLoading(true);

    try {
      if (editingTask) {
        const oldTasks = [...tasks];

        const updatedTask = {
          ...editingTask,
          title,
          description,
          priority,
          status,
          dueDate
        };

        // Optimistic update
        setTasks((currentTasks) =>
          currentTasks.map((task) =>
            task._id === editingTask._id ? updatedTask : task
          )
        );

        const response = await fetch(
          `${API_URL}/${editingTask._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              title,
              description,
              priority,
              status,
              dueDate
            })
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setTasks(oldTasks);
          setMessage(data.message || "Failed to update task");
          return;
        }

        setMessage("Task updated successfully");
        clearForm();
      } else {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            title,
            description,
            priority,
            status,
            dueDate
          })
        });

        const data = await response.json();

        if (!response.ok) {
          setMessage(data.message || "Failed to create task");
          return;
        }

        setTasks((currentTasks) => [
          ...currentTasks,
          data.task
        ]);

        setMessage("Task created successfully");
        clearForm();
      }
    } catch (error) {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);

    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
    setStatus(task.status);
    setDueDate(task.dueDate);
  };

  const handleDelete = async (taskId) => {
    const token = localStorage.getItem("token");

    const oldTasks = [...tasks];

    // Optimistic delete
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task._id !== taskId)
    );

    try {
      const response = await fetch(
        `${API_URL}/${taskId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // Restore task if API request fails
        setTasks(oldTasks);
        setMessage(data.message || "Failed to delete task");
        return;
      }

      setMessage("Task deleted successfully");
    } catch (error) {
      // Restore task if network request fails
      setTasks(oldTasks);
      setMessage("Failed to delete task");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h2>TaskMatrix Dashboard</h2>

          {user && (
            <p>
              Logged in as: {user.email}
            </p>
          )}
        </div>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>

      <p className="message">
        {message}
      </p>

      <div className="task-form">
        <h3>
          {editingTask ? "Edit Task" : "Create Task"}
        </h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <div className="form-buttons">
            <button type="submit" disabled={loading}>
              {loading
                ? "Saving..."
                : editingTask
                ? "Update Task"
                : "Create Task"}
            </button>

            {editingTask && (
              <button
                type="button"
                onClick={clearForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="tasks-section">
        <h3>My Tasks</h3>

        {tasks.length === 0 ? (
          <p>No tasks yet.</p>
        ) : (
          <div className="task-list">
            {tasks.map((task) => (
              <div
                className="task-card"
                key={task._id}
              >
                <h4>{task.title}</h4>

                <p>{task.description}</p>

                <p>
                  <strong>Status:</strong>{" "}
                  {task.status}
                </p>

                <p>
                  <strong>Priority:</strong>{" "}
                  {task.priority}
                </p>

                {task.dueDate && (
                  <p>
                    <strong>Due:</strong>{" "}
                    {task.dueDate}
                  </p>
                )}

                <div className="task-buttons">
                  <button
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;