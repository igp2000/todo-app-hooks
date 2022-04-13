import React from 'react';
import PropTypes from 'prop-types';

import { Task } from '../Task';
import './TaskList.scss';

const TaskList = ({ taskData, filterCompleted, onDelete, onCompleted, onEditing, onTaskNewValue }) => {
  const tasks = taskData.map((task) => {
    const { id, className, description = '', time = 0, created, completed } = task;

    let classNone = '';
    if (filterCompleted !== null && task.completed !== filterCompleted) {
      classNone = ' none';
    }
    return (
      <Task
        id={id}
        className={`${className}${classNone}`}
        description={description}
        time={time}
        created={created}
        completed={completed}
        key={id}
        onDelete={() => onDelete(id)}
        onCompleted={() => onCompleted(id)}
        onEditing={() => onEditing(id)}
        onTaskNewValue={(desc) => onTaskNewValue(id, desc)}
      />
    );
  });

  return <ul className="todo-list">{tasks}</ul>;
};

TaskList.defaultProps = {
  taskData: [],
  filterCompleted: null,
  onDelete: () => {},
  onCompleted: () => {},
  onEditing: () => {},
  onTaskNewValue: () => {},
};

TaskList.propTypes = {
  taskData: PropTypes.array,
  filterCompleted: PropTypes.bool,
  onDelete: PropTypes.func,
  onCompleted: PropTypes.func,
  onEditing: PropTypes.func,
  onTaskNewValue: PropTypes.func,
};

export default TaskList;
