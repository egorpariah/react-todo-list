import Tasks from './pages/Tasks/Tasks';
import Task from './pages/Task/Task';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Navigate to='/tasks' />}
        />
        <Route
          path='/tasks'
          element={<Tasks />}
        />
        <Route
          path='/tasks/:id'
          element={<Task />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
