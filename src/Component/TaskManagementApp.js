import React, { useState, useEffect } from "react";
import Task from "./Task";
import TaskForm from "./Form";

const TaskManagementApp = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const editTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditingTask(taskToEdit);
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    setEditingTask(null);
  };

  return (
    <div className="task-management-app">
      <h2>Task Management Tool</h2>
      <h4>Enter Your Daily Tasks!</h4>
      <TaskForm
        onSubmit={editingTask ? updateTask : addTask}
        onCancel={() => setEditingTask(null)}
        taskToEdit={editingTask}
      />
      <div className="task-list">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onEdit={() => editTask(task.id)}
            onDelete={() => deleteTask(task.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskManagementApp;
