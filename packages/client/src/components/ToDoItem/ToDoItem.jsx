import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import FilesList from '../FilesList/FilesList';
import Checkbox from '../UI/Checkbox/Checkbox';
import Label from '../UI/Label/Label';
import File from '../UI/File/File';
import Headline3 from '../UI/Headline3/Headline3';
import IconButton from '../UI/IconButton/IconButton';
import Paragraph from '../UI/Paragraph/Paragraph';
import style from './ToDoItem.module.less';
import { ReactComponent as Edit } from '../../assets/svg/edit.svg';
import { ReactComponent as Trash } from '../../assets/svg/trash.svg';
import '../../assets/less/_variables.less';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

/**
 * ToDo list item
 * @param {Object} props Component props
 * @param {string} [props.className] External CSS classes
 * @param {Object} props.task Task object with data
 * @param {function(Object): void} props.openEditForm Opens AddEditForm in "Edit" mode
 * @param {function(boolean, Object): void} props.setCompleted Sets taks completed
 * @param {function(number): void} props.removeTask Removes task from ToDo List
 * @returns {JSX.Element} ToDo list item element
 * @example
 * return (
 *   <ToDoItem
 *     className='ToDoList__item'
 *     task={task}
 *     openEditForm={openEditForm}
 *     setCompleted={setCompleted}
 *     removeTask={removeTask}
 *   />
 * )
 */
function ToDoItem({ task, className, openEditForm, setCompleted, removeTask }) {
  const expired = useMemo(
    () => dayjs().isAfter(dayjs.utc(task.expire).local()),
    [task.expire]
  );

  const navigate = useNavigate();

  return (
    <li
      className={className ? `${style.ToDoItem} ${className}` : style.ToDoItem}
    >
      <Checkbox
        className={style.ToDoItem__checkbox}
        id={`task-${task.id}`}
        checked={task.completed}
        onChange={e => setCompleted(e.target.checked, task)}
      />
      <div
        className={
          task.completed || expired
            ? `${style.ToDoItem__wrapper} ${style['ToDoItem__wrapper--completed']}`
            : style.ToDoItem__wrapper
        }
      >
        <div className={style.ToDoItem__content}>
          <Label className={style.ToDoItem__date}>
            {dayjs.utc(task.expire).local().format('dddd, D MMM YYYY HH:mm')}
          </Label>
          <Headline3
            className={style.ToDoItem__headline}
            onClick={() =>
              navigate(`/tasks/${task.id}`, {
                state: { task },
              })
            }
          >
            {task.name}
          </Headline3>
          {task.description.length > 0 && (
            <Paragraph className={style.ToDoItem__description}>
              {task.description}
            </Paragraph>
          )}
          {task.files.length > 0 && (
            <FilesList>
              {task.files.map((file, i) => (
                <File
                  taskId={task.id}
                  className={style.ToDoItem__file}
                  completed={task.completed}
                  expired={expired}
                  key={i}
                >
                  {file}
                </File>
              ))}
            </FilesList>
          )}
        </div>
        <div className={style.ToDoItem__buttons}>
          <IconButton
            className={style.ToDoItem__button}
            modifier='edit'
            onClick={() => openEditForm(task)}
          >
            <Edit className={style.ToDoItem__edit} />
          </IconButton>
          <IconButton
            className={style.ToDoItem__button}
            modifier='trash'
            onClick={() => removeTask(task.id)}
          >
            <Trash className={style.ToDoItem__trash} />
          </IconButton>
        </div>
      </div>
    </li>
  );
}

export default ToDoItem;
