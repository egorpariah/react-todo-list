import React, { useState } from 'react';
import Button from '../UI/Button/Button';
import DateInput from '../UI/DateInput/DateInput';
import FileInput from '../UI/FileInput/FileInput';
import File from '../UI/File/File';
import FilesList from '../FilesList/FilesList';
import Headline2 from '../UI/Headline2/Headline2';
import Input from '../UI/Input/Input';
import TextArea from '../UI/TextArea/TextArea';
import style from './AddEditForm.module.less';
import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

/**
 * Add/Edit task form component
 * @param {Object} props Component props
 * @param {Object} props.taskForEdit Task component values to edit
 * @param {boolean} props.isEdit Sets "Editing" or "Adding" mode of form
 * @param {function(Object): void} props.addTask Adds task to ToDo List
 * @param {function(Object): void} props.editTask Edits task in ToDo List
 * @returns {JSX.Element} Add/Edit form element
 * @example
 * return (
 *   <AddEditForm
 *     className='List__form'
 *     addTask={addTask}
 *     editTask={editTask}
 *     taskForEdit={taskForEdit}
 *     isEdit={isEdit}
 *   />
 * )
 */
function AddEditForm({ taskForEdit, isEdit, addTask, editTask }) {
  const [task, setTask] = useState({
    id: isEdit ? taskForEdit.id : Date.now(),
    completed: isEdit ? taskForEdit.completed : false,
    expire: taskForEdit.expire,
    name: taskForEdit.name,
    description: taskForEdit.description,
    files: [...taskForEdit.files],
  });
  const [newFiles, setNewFiles] = useState([]);
  const [oldFiles, setOldFiles] = useState([]);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [valid, setValid] = useState({ name: true, expire: true });

  const uploadFiles = isEdit => {
    let formData = new FormData();
    formData.append('id', task.id);
    formData.append('completed', task.completed);
    formData.append('expire', task.expire);
    formData.append('name', task.name);
    formData.append('description', task.description);
    if (task.files.length) {
      for (const file of task.files) {
        formData.append('files', file);
      }
    } else {
      formData.append('files', []);
    }
    for (const newFile of newFiles) {
      formData.append('newFiles', newFile);
    }

    if (isEdit) {
      axios.post('/update', formData, {
        headers: {
          'X-HTTP-Method-Override': 'PUT',
        },
      });
    } else {
      axios.post('/create', formData);
    }
  };

  const clearFileInput = e => {
    e.preventDefault();
    const filesNotToClear = task.files.filter(
      file => oldFiles.indexOf(file) !== -1
    );
    setTask({ ...task, files: filesNotToClear });
    setNewFiles([]);
    setOldFiles([]);
    setFileInputKey(Date.now());
  };

  const deleteFile = filename => {
    const filteredFiles = task.files.filter(file => file !== filename);
    setTask({ ...task, files: filteredFiles });

    const dt = new DataTransfer();
    for (const file of newFiles) {
      if (file.name !== filename) {
        dt.items.add(file);
      }
    }
    setNewFiles(dt.files);
  };

  const handleSubmit = e => {
    e.preventDefault();

    let validity = true;
    const newValid = { name: true, expire: true };
    for (const key in valid) {
      if (task[key] === '') {
        newValid[key] = false;
        validity = false;
      }
    }
    setValid(newValid);
    if (validity === false) return;

    isEdit ? editTask(task) : addTask(task);

    uploadFiles(isEdit);

    setTask({
      expire: '',
      name: '',
      description: '',
      files: [],
    });
    setNewFiles([]);
  };

  const handleDateChange = e => {
    setValid({ ...valid, expire: true });
    let expire = '';
    if (e.target.value !== '') {
      expire = dayjs(e.target.value).utc().format();
    }
    setTask({ ...task, expire });
  };

  const handleFilesChange = e => {
    const oldFiles = [];
    const changedFiles = [...task.files];
    for (const file of Object.values(e.target.files)) {
      if (task.files.indexOf(file.name) === -1) {
        changedFiles.push(file.name);
      } else {
        oldFiles.push(file.name);
      }
    }
    setTask({ ...task, files: changedFiles });
    setNewFiles(e.target.files);
    setOldFiles(oldFiles);
  };

  return (
    <form
      className={style.AddEditForm}
      onSubmit={handleSubmit}
    >
      <Headline2 className={style.AddEditForm__headline}>
        {isEdit ? 'Edit' : 'Add'} Task
      </Headline2>
      <div className={style.AddEditForm__content}>
        <div className={style.AddEditForm__col}>
          <Input
            className={style.AddEditForm__item}
            type='text'
            placeholder='Task'
            value={task.name}
            onChange={e => {
              setTask({ ...task, name: e.target.value });
              setValid({ ...valid, name: true });
            }}
            valid={valid.name}
          />
          <TextArea
            className={style.AddEditForm__textarea}
            placeholder='Description'
            value={task.description}
            onChange={e => setTask({ ...task, description: e.target.value })}
          />
        </div>
        <div className={style.AddEditForm__col}>
          <DateInput
            className={`${style.AddEditForm__datetime} ${style.AddEditForm__item}`}
            value={dayjs.utc(task.expire).local().format('YYYY-MM-DDTHH:mm')}
            onChange={handleDateChange}
            valid={valid.expire}
          />
          <FileInput
            key={fileInputKey}
            newFiles={newFiles}
            className={style.AddEditForm__item}
            onChange={handleFilesChange}
            clearFileInput={clearFileInput}
          />
          {task.files.length > 0 && (
            <FilesList className={style.AddEditForm__files}>
              {task.files.map((file, i) => (
                <File
                  deleteFile={deleteFile}
                  isCanBeDeleted={true}
                  className={style.AddEditForm__file}
                  key={i}
                >
                  {file}
                </File>
              ))}
            </FilesList>
          )}
          <Button className={style.AddEditForm__button}>
            {isEdit ? 'Done' : 'Add'}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default AddEditForm;
