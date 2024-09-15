import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function TodoListApp() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(null); // For tracking which task is being edited
  const [editedTask, setEditedTask] = useState(''); // For holding the text of the task being edited

  // Function to handle adding a new task
  const handleAddTask = () => {
    if (task) {
      const newTask = {
        text: task,
        isCompleted: false,
      };
      setTasks([...tasks, newTask]);
      setTask(''); // Clear the input field after adding
    }
  };

  // Function to handle deleting a task
  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(newTasks);
  };

  // Function to handle marking task as complete
  const handleTaskComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].isCompleted = !newTasks[index].isCompleted;
    setTasks(newTasks);
  };

  // Function to handle editing a task
  const handleEditTask = (index) => {
    setIsEditing(index);
    setEditedTask(tasks[index].text); // Set the current task text for editing
  };

  // Function to handle saving the edited task
  const handleUpdateTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].text = editedTask;
    setTasks(newTasks);
    setIsEditing(null); // Exit edit mode
  };

  return (
    <div className="container mt-5">
      {/* Bootstrap Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">TodoList App</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Todo Input and Button */}
      <div className="row mt-4">
        <div className="col-md-8 offset-md-2">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter a new task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleAddTask}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <ul className="list-group">
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={task.isCompleted}
                      onChange={() => handleTaskComplete(index)}
                    />
                    
                    {/* Render task text or input field if editing */}
                    {isEditing === index ? (
                      <input
                        type="text"
                        value={editedTask}
                        onChange={(e) => setEditedTask(e.target.value)}
                        className="form-control d-inline"
                        style={{ width: 'auto', display: 'inline-block' }}
                      />
                    ) : (
                      <span
                        style={{
                          textDecoration: task.isCompleted
                            ? 'line-through'
                            : 'none',
                        }}
                      >
                        {task.text}
                      </span>
                    )}
                  </div>

                  <div>
                    {/* Show Edit or Update Button based on edit mode */}
                    {isEditing === index ? (
                      <button
                        className="btn btn-success btn-sm mr-2"
                        onClick={() => handleUpdateTask(index)}
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        className="btn btn-info btn-sm mr-2"
                        onClick={() => handleEditTask(index)}
                      >
                        Edit
                      </button>
                    )}

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteTask(index)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="list-group-item text-center">No tasks added yet</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TodoListApp;