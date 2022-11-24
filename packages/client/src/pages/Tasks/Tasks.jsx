import React, { useState, useEffect } from 'react';
import Container from '../../components/UI/Container/Container';
import Headline1 from '../../components/UI/Headline1/Headline1';
import ToDoList from '../../components/ToDoList/ToDoList';
import RoundButton from '../../components/UI/RoundButton/RoundButton';
import style from './Tasks.module.less';
import { ReactComponent as Plus } from '../../assets/svg/plus.svg';
import Modal from '../../components/UI/Modal/Modal';
import AddEditForm from '../../components/AddEditForm/AddEditForm';
import axios from 'axios';
import Loader from '../../components/UI/Loader/Loader';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [taskForEdit, setTaskForEdit] = useState({
    id: 0,
    completed: false,
    expire: '',
    name: '',
    description: '',
    files: [],
  });
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTasks = async () => {
    setIsLoading(true);
    const response = await axios.get('/read');
    setTasks(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const setCompleted = (completed, completedTask) => {
    setTasks(
      tasks.map(task => {
        if (task.id === completedTask.id) {
          task.completed = completed;
          return task;
        }

        return task;
      })
    );

    let formData = new FormData();

    formData.append('id', completedTask.id);
    formData.append('completed', completedTask.completed);
    formData.append('expire', completedTask.expire);
    formData.append('name', completedTask.name);
    formData.append('description', completedTask.description);
    if (completedTask.files.length) {
      for (const file of completedTask.files) {
        formData.append('files', file);
      }
    } else {
      formData.append('files', []);
    }

    axios.post('/update', formData, {
      headers: {
        'X-HTTP-Method-Override': 'PUT',
      },
    });
  };

  const openEditForm = task => {
    setIsEdit(true);
    setTaskForEdit(task);
    setModal(true);
  };

  const openAddForm = () => {
    setIsEdit(false);
    setTaskForEdit({
      id: 0,
      completed: false,
      expire: dayjs.utc().format('YYYY-MM-DDTHH:mm'),
      name: '',
      description: '',
      files: [],
    });
    setModal(true);
  };

  const addTask = newTask => {
    setTasks([...tasks, newTask]);
    setModal(false);
  };

  const editTask = editedTask => {
    setTasks(
      tasks.map(task => {
        if (task.id === editedTask.id) {
          return editedTask;
        }

        return task;
      })
    );

    setModal(false);
  };

  const removeTask = taskId => {
    setTasks(tasks.filter(task => task.id !== taskId));
    axios.delete(`/delete/${taskId}`);
  };

  return (
    <Container className={style.Tasks}>
      {modal && (
        <Modal
          className={style.Tasks__modal}
          setVisible={setModal}
        >
          <AddEditForm
            className={style.Tasks__form}
            addTask={addTask}
            editTask={editTask}
            taskForEdit={taskForEdit}
            isEdit={isEdit}
          />
        </Modal>
      )}
      <Headline1 className={style.Tasks__headline}>ToDo List</Headline1>
      {isLoading ? (
        <Loader className={style.Tasks__loader} />
      ) : (
        <ToDoList
          className={style.Tasks__list}
          tasks={tasks}
          openEditForm={openEditForm}
          removeTask={removeTask}
          setCompleted={setCompleted}
        ></ToDoList>
      )}
      <RoundButton
        className={style.Tasks__add}
        onClick={openAddForm}
      >
        <Plus />
      </RoundButton>
    </Container>
  );
}
