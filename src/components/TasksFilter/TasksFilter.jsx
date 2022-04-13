import React, { useState } from 'react';
import './TasksFilter.scss';
import PropTypes from 'prop-types';

const TasksFilter = ({ setFilter }) => {
  const [flagFilter, setFlagFilter] = useState(null);

  const dataFilter = (flag) => {
    setFlagFilter(flag);
    setFilter(flag);
  };

  return (
    <ul className="filters">
      <li>
        <button className={flagFilter === null ? 'selected' : undefined} onClick={() => dataFilter(null)}>
          All
        </button>
      </li>
      <li>
        <button className={flagFilter === false ? 'selected' : undefined} onClick={() => dataFilter(false)}>
          Active
        </button>
      </li>
      <li>
        <button className={flagFilter === true ? 'selected' : undefined} onClick={() => dataFilter(true)}>
          Completed
        </button>
      </li>
    </ul>
  );
};

TasksFilter.propTypes = {
  setFilter: PropTypes.func,
};

TasksFilter.defaultProps = {
  setFilter: () => {},
};

export default TasksFilter;
