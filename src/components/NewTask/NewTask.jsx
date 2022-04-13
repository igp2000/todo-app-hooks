import React, { useState } from 'react';
import './NewTask.scss';
import PropTypes from 'prop-types';

const NewTask = ({ taskAdd }) => {
  const [newTask, setNewTask] = useState({
    description: '',
    minutes: '',
    seconds: '',
  });

  const formSubmit = (event) => {
    if (event.keyCode !== 13 || !newTask.description) {
      return;
    }
    event.preventDefault();
    taskAdd(newTask);
    setNewTask({ description: '', minutes: '', seconds: '' });
  };

  const onChange = (event) => {
    let task = { ...newTask };
    let value = event.target.value.trim();
    if (event.target.name !== 'description' && Number(value) < 0) {
      value = '';
    }
    task[event.target.name] = value;
    setNewTask(task);
  };

  return (
    <form className="form-new-task" onKeyDown={formSubmit}>
      <label>
        <input
          name="description"
          className="new-todo"
          placeholder="What needs to be done?"
          value={newTask.description}
          onChange={onChange}
          autoFocus
        />
      </label>
      <label>
        <input
          name="minutes"
          className="new-todo-time"
          value={newTask.minutes}
          onChange={onChange}
          placeholder="Min"
          type="number"
          min="0"
        />
      </label>
      <label>
        <input
          name="seconds"
          className="new-todo-time"
          value={newTask.seconds}
          onChange={onChange}
          placeholder="Sec"
          type="number"
          min="0"
        />
      </label>
    </form>
  );
};

NewTask.defaultProps = {
  taskAdd: () => {},
};

NewTask.propTypes = {
  taskAdd: PropTypes.func,
};

export default NewTask;
