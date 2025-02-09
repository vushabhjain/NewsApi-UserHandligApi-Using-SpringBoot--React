import React, { useState } from "react";
import './TodoApp.css' // Import the CSS file

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);  // List of tasks
  const [task, setTask] = useState("");    // Input task text
  const [editIndex, setEditIndex] = useState(null);  // For updating a task

  // Add Task
  const addTask = () => {
    if (task.trim() === "") return;  // Ignore empty tasks
    if (editIndex !== null) {
      const updatedTasks = tasks.map((t, index) => 
        index === editIndex ? task : t
      );
      setTasks(updatedTasks);
      setEditIndex(null);  // Reset edit mode
    } else {
      setTasks([...tasks, task]);  // Add new task
    }
    setTask("");  // Clear input field
  };

  // Delete Task
  const deleteTask = (index) => {
    const filteredTasks = tasks.filter((_, i) => i !== index);
    setTasks(filteredTasks);
  };

  // Edit Task
  const editTask = (index) => {
    setTask(tasks[index]);
    setEditIndex(index);  // Set the task index to edit
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto todo-card">
        <div className="card-body">
          <h2 className="card-title text-center">To-Do App</h2>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter a task"
            />
            <button
              className="btn btn-primary"
              onClick={addTask}
            >
              {editIndex !== null ? "Update Task" : "Add Task"}
            </button>
          </div>

          <ul className="list-group mt-3">
            {tasks.length === 0 ? (
              <li className="list-group-item text-center">No tasks available</li>
            ) : (
              tasks.map((t, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  {t}
                  <div>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => editTask(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteTask(index)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
