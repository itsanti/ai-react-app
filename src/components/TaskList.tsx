import type { Task } from '../types/task';

interface TaskListProps {
  tasks: Task[];
  onUpdateTask?: (task: Task) => void;
  onDeleteTask?: (taskId: string) => void;
}

export function TaskList({ tasks, onUpdateTask, onDeleteTask }: TaskListProps) {
  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'pending': return 'gray';
      case 'in_progress': return 'blue';
      case 'completed': return 'green';
      case 'cancelled': return 'red';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'low': return 'green';
      case 'medium': return 'orange';
      case 'high': return 'red';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatDateTime = (date: Date) => {
    return new Date(date).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="task-list">
      <h2>Список задач ({tasks.length})</h2>
      
      {tasks.length === 0 ? (
        <p className="empty-message">Задачи отсутствуют</p>
      ) : (
        <div className="tasks-container">
          {tasks.map(task => (
            <div key={task.id} className="task-card">
              <div className="task-header">
                <h3 className="task-title">{task.title}</h3>
                <div className="task-actions">
                  {onUpdateTask && (
                    <button 
                      onClick={() => onUpdateTask(task)}
                      className="edit-btn"
                    >
                      Редактировать
                    </button>
                  )}
                  {onDeleteTask && (
                    <button 
                      onClick={() => onDeleteTask(task.id)}
                      className="delete-btn"
                    >
                      Удалить
                    </button>
                  )}
                </div>
              </div>

              {task.description && (
                <p className="task-description">{task.description}</p>
              )}

              <div className="task-meta">
                <div className="meta-row">
                  <span className={`status-badge status-${getStatusColor(task.status)}`}>
                    {task.status === 'pending' && 'Ожидает'}
                    {task.status === 'in_progress' && 'В работе'}
                    {task.status === 'completed' && 'Завершена'}
                    {task.status === 'cancelled' && 'Отменена'}
                  </span>
                  <span className={`priority-badge priority-${getPriorityColor(task.priority)}`}>
                    {task.priority === 'low' && 'Низкий'}
                    {task.priority === 'medium' && 'Средний'}
                    {task.priority === 'high' && 'Высокий'} приоритет
                  </span>
                </div>

                <div className="meta-row">
                  <div className="meta-item">
                    <strong>Создана:</strong> {formatDateTime(task.createdAt)}
                  </div>
                  <div className="meta-item">
                    <strong>Обновлена:</strong> {formatDateTime(task.updatedAt)}
                  </div>
                  {task.dueDate && (
                    <div className="meta-item">
                      <strong>Срок:</strong> {formatDate(task.dueDate)}
                    </div>
                  )}
                </div>

                {task.tags && task.tags.length > 0 && (
                  <div className="meta-row">
                    <div className="meta-item">
                      <strong>Теги:</strong>
                      <div className="tags">
                        {task.tags.map(tag => (
                          <span key={tag} className="tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {(task.estimatedTime || task.actualTime) && (
                  <div className="meta-row">
                    {task.estimatedTime && (
                      <div className="meta-item">
                        <strong>Оценка:</strong> {task.estimatedTime} ч
                      </div>
                    )}
                    {task.actualTime && (
                      <div className="meta-item">
                        <strong>Фактическое:</strong> {task.actualTime} ч
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}