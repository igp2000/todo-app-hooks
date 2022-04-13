import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { format, formatDistanceToNow } from 'date-fns';

import './Task.scss';

const Task = ({
  id,
  className,
  description,
  time,
  completed,
  created,
  onDelete,
  onCompleted,
  onEditing,
  onTaskNewValue,
}) => {
  const [taskDesc, setTaskDesc] = useState('');
  const [timeActiv, setTimeActiv] = useState(0);
  const timerId = useRef();

  useEffect(() => {
    setTaskDesc(description);
    setTimeActiv(time);
    timerId.current = null;
    return () => {
      if (timerId.current) {
        clearInterval(timerId.current);
      }
    };
  }, []);

  const onChange = (event) => {
    setTaskDesc(event.target.value);
  };

  const formSubmit = (event) => {
    event.preventDefault();
    onTaskNewValue(taskDesc);
  };

  const setPlayPause = (id, target) => {
    const btnId = target.id;
    const button =
      btnId === `btn-play-${id}`
        ? document.getElementById(`btn-pause-${id}`)
        : document.getElementById(`btn-play-${id}`);
    target.classList.add('none');
    button.classList.remove('none');
  };

  const onClickTimer = (id, target) => {
    setPlayPause(id, target);
    timerId.current = timerInterval();
  };

  const onCompletedTask = (func) => {
    func();
    if (timerId.current) {
      const button = document.getElementById(`btn-pause-${id}`);
      onClickTimer(id, button);
    }
  };

  const timerInterval = () => {
    if (timerId.current) {
      clearInterval(timerId.current);
      return null;
    } else {
      return setInterval(() => {
        let time = 0;
        setTimeActiv((timeActiv) => {
          time = timeActiv > 0 ? timeActiv - 1 : 0;
          return time;
        });
        if (time === 0) {
          onCompletedTask(onCompleted);
        }
      }, 1000);
    }
  };

  const tm = formatDistanceToNow(created, { includeSeconds: true });

  return (
    <li className={className}>
      <div className="view">
        <input
          id={`chb${id}`}
          className="toggle"
          type="checkbox"
          onChange={() => onCompletedTask(onCompleted)}
          checked={completed}
        />
        <label htmlFor={`chb${id}`}>
          <span className="title">{taskDesc}</span>
          <span className="description">
            <button
              id={`btn-play-${id}`}
              className="icon icon-play"
              onClick={(event) => onClickTimer(id, event.target)}
              disabled={completed}
            >
              ⏵︎
            </button>
            <button
              id={`btn-pause-${id}`}
              className="icon icon-pause none"
              onClick={(event) => onClickTimer(id, event.target)}
              disabled={completed}
            >
              ⏸︎
            </button>
            {format(timeActiv * 1000, 'm:s')}
          </span>
          <span className="created">{`created ${tm} ago`}</span>
        </label>
        <button className="icon icon-edit" onClick={onEditing} title="Edit" />
        <button className="icon icon-destroy" onClick={onDelete} title="Delete" />
      </div>
      {className === 'editing' && (
        <form className="form-edit" onSubmit={formSubmit} style={{ margin: 0 }}>
          <label style={{ padding: 0 }}>
            <input type="text" className="edit" value={taskDesc} onChange={onChange} autoFocus />
          </label>
        </form>
      )}
    </li>
  );
};

Task.defaultProps = {
  id: null,
  className: null,
  description: '',
  time: 0,
  completed: false,
  created: Date.now(),
  onDelete: () => {},
  onCompleted: () => {},
  onEditing: () => {},
  onTaskNewValue: () => {},
};

Task.propTypes = {
  id: PropTypes.number,
  className: PropTypes.string,
  description: PropTypes.string,
  time: PropTypes.number,
  completed: PropTypes.bool,
  created: PropTypes.number,
  onDelete: PropTypes.func,
  onCompleted: PropTypes.func,
  onEditing: PropTypes.func,
  onTaskNewValue: PropTypes.func,
};

export default Task;
