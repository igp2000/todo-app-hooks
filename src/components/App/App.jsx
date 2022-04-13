import React, { useState, useEffect, useRef } from 'react';

import { NewTask } from '../NewTask';
import { TaskList } from '../TaskList';
import { Footer } from '../Footer';

import './App.scss';

const App = () => {
  const [taskData, setTaskData] = useState([]);
  const [filterCompleted, setFilterCompleted] = useState(null);
  const [countCompleted, setCountCompleted] = useState(0);
  const taskID = useRef();

  useEffect(() => {
    taskID.current = 0;
    const arr = [
      taskCreate({ description: 'Completed task' }),
      taskCreate({ description: 'Editing task' }),
      taskCreate({ description: 'Active task' }),
    ];
    setTaskData(arr);
  }, []);

  // создает задачу
  let taskCreate = ({ description, minutes = 0, seconds = 0 }) => {
    const time = Number(minutes) * 60 + Number(seconds);
    let className = null;
    let completed = false;
    if (time === 0) {
      className = 'completed';
      completed = true;
      setCountCompleted((countCompleted) => countCompleted + 1);
    }

    taskID.current = taskID.current + 1;

    return {
      className: className,
      completed: completed,
      description: description,
      time: time,
      created: Date.now(),
      id: taskID.current,
    };
  };

  // добавляет задачу в state
  const taskAdd = (task) => {
    setTaskData([...taskData, taskCreate(task)]);
  };

  // удаляет задачу по id
  const onDelete = (id) => {
    const ind = taskData.findIndex((item) => item.id === id);
    if (ind > -1) {
      setTaskData([...taskData.slice(0, ind), ...taskData.slice(ind + 1)]);
      if (taskData[ind].completed) {
        setCountCompleted((countCompleted) => countCompleted - 1);
      }
    }
  };

  // изменяет данные задачи и счетчик выполненных
  const taskChange = (arr, id, flag, newDesc = '') => {
    const index = arr.findIndex((el) => el.id === id);

    if (index > -1) {
      let data = {};
      if (flag === 'completed') {
        data['completed'] = !arr[index].completed;
        data['className'] = arr[index].completed ? null : 'completed';
        setCountCompleted((countCompleted) => (data['completed'] ? countCompleted + 1 : countCompleted - 1));
      } else if (flag === 'editing') {
        data['className'] = arr[index].className !== 'editing' ? 'editing' : arr[index].completed ? null : 'completed';
      } else {
        data['className'] = arr[index].completed ? 'completed' : null;
        data['description'] = newDesc ? newDesc : arr[index].description;
      }
      const newItem = {
        ...arr[index],
        ...data,
      };

      setTaskData([...arr.slice(0, index), newItem, ...arr.slice(index + 1)]);
    }
  };

  // устанвливает состояние - задача выполнена
  const onCompleted = (id) => {
    taskChange(taskData, id, 'completed');
  };

  // устанавливает состояние - описание задачи редактируется
  const onEditing = (id) => {
    taskChange(taskData, id, 'editing');
  };

  // сохраняет в state новое описание после редактирования
  const taskNewValue = (id, newDesc = '') => {
    taskChange(taskData, id, '', newDesc);
  };

  // устанавливает фильтр
  const setFilter = (flag) => {
    setFilterCompleted(flag);
  };

  // удаляет все задачи в статусе - выполнена
  const onClearCompleted = () => {
    const tasksActive = taskData.filter((task) => !task.completed);
    setTaskData(tasksActive);
    setCountCompleted(0);
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTask taskAdd={taskAdd} />
      </header>

      <section className="main">
        <TaskList
          taskData={taskData}
          filterCompleted={filterCompleted}
          onDelete={onDelete}
          onCompleted={onCompleted}
          onEditing={onEditing}
          onTaskNewValue={taskNewValue}
        />
        <Footer setFilter={setFilter} countCompleted={countCompleted} onClearCompleted={onClearCompleted} />
      </section>
    </section>
  );
};

export default App;
