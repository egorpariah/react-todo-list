import React from 'react';
import ToDoItem from '../ToDoItem/ToDoItem';
import style from './ToDoList.module.less';

/**
 * ToDo list
 * @param {Object} props Component props
 * @param {string} [props.className] External CSS classes
 * @param {array} props.tasks Tasks array of objects from database
 * @param {function(Object): void} props.openEditForm Opens AddEditForm in "Edit" mode
 * @param {function(boolean, Object): void} props.setCompleted Sets taks completed
 * @param {function(number): void} props.removeTask Removes task from ToDo List
 * @returns {JSX.Element} ToDo list element
 * @example
 * return (
 *   <ToDoItem
 *     className='ToDoList__item'
 *     tasks={tasks}
 *     openEditForm={openEditForm}
 *     setCompleted={setCompleted}
 *     removeTask={removeTask}
 *   />
 * )
 */
function ToDoList({
  className,
  tasks,
  openEditForm,
  removeTask,
  setCompleted,
}) {
  return (
    tasks.length > 0 && (
      <ul
        className={
          className ? `${style.ToDoList} ${className}` : style.ToDoList
        }
      >
        {tasks.map(task => (
          <ToDoItem
            className={style.ToDoList__item}
            task={task}
            key={task.id}
            openEditForm={openEditForm}
            removeTask={removeTask}
            setCompleted={setCompleted}
          />
        ))}
      </ul>
    )
  );
}

export default ToDoList;
