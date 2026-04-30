import { useState } from 'react';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { Task } from './types/task';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleCreateTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setTasks([...tasks, newTask]);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id 
        ? { ...updatedTask, updatedAt: new Date() }
        : task
    ));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Менеджер задач</h1>
        <p>Создавайте и управляйте задачами</p>
      </header>

      <main className="app-main">
        <div className="form-section">
          <h2>Создать новую задачу</h2>
          <TaskForm onSubmit={handleCreateTask} />
        </div>

        <div className="list-section">
          <TaskList 
            tasks={tasks} 
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </main>

      <footer className="app-footer">
        <p>Всего задач: {tasks.length}</p>
        <p>Завершено: {tasks.filter(t => t.status === 'completed').length}</p>
        <p>В работе: {tasks.filter(t => t.status === 'in_progress').length}</p>
      </footer>
    </div>
  );
}

export default App;