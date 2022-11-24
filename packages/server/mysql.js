import mysql from 'mysql2/promise';
import bluebird from 'bluebird';

const setConnection = async () => {
  const connection = await mysql.createConnection({
    host: 'remotemysql.com',
    user: 'xtTzQRuo0U',
    password: 'Mb1OdsFWZg',
    database: 'xtTzQRuo0U',
    Promise: bluebird,
  });
  console.log('> Connection to MySQL server has been established');
  return connection;
};

export async function createTaskInDatabase(task) {
  let connection;
  try {
    connection = await setConnection();
    await connection.query(
      `INSERT INTO todolist(id, completed, expire, name, description, files) VALUES (${
        task.id
      }, ${task.completed}, '${task.expire}', '${task.name}', '${
        task.description
      }', '${task.files.join(', ')}')`
    );
    await connection.end();
  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    console.log('> Connection has been closed');
  }
}

export async function readTasksFromDatabase() {
  let connection;
  try {
    connection = await setConnection();
    const [result] = await connection.query('SELECT * FROM todolist');
    result.map(task => {
      task.completed ? (task.completed = true) : (task.completed = false);
      task.files = task.files.split(', ');
      if (task.files[0] === '') {
        task.files = [];
      }
      return task;
    });
    await connection.end();
    return result;
  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    console.log('> Connection has been closed');
  }
}

export async function updateTaskInDatabase(editedTask) {
  let connection;
  try {
    connection = await setConnection();
    await connection.query(
      `UPDATE todolist SET completed = ${editedTask.completed}, expire = '${
        editedTask.expire
      }', name = '${editedTask.name}', description = '${
        editedTask.description
      }', files = '${
        Array.isArray(editedTask.files)
          ? editedTask.files.join(', ')
          : editedTask.files
      }' WHERE id = ${editedTask.id}`
    );
    await connection.end();
  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    console.log('> Connection has been closed');
  }
}

export async function deleteTaskFromDatabase(taskId) {
  let connection;
  try {
    connection = await setConnection();
    await connection.query(`DELETE FROM todolist WHERE id = ${taskId}`);
    await connection.end();
  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    console.log('> Connection has been closed');
  }
}
