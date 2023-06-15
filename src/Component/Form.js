import React, { useState } from "react";

const TaskForm = ({ onSubmit, onCancel, taskToEdit }) => {
  const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : "");
  const [description, setDescription] = useState(
    taskToEdit ? taskToEdit.description : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      // Check if title is empty
      alert("Title is required");
      return;
    }
    const updatedTask = {
      id: taskToEdit ? taskToEdit.id : Date.now(),
      title: title.trim(),
      description: description.trim(),
    };
    onSubmit(updatedTask);
    setTitle("");
    setDescription("");
  };

  const handleCancel = () => {
    onCancel();
    setTitle("");
    setDescription("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="form-buttons">
        <button type="submit">{taskToEdit ? "Update" : "Add"}</button>
        {taskToEdit && <button onClick={handleCancel}>Cancel</button>}
      </div>
    </form>
  );
};

export default TaskForm;
