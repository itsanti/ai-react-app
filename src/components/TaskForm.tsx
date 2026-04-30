import { useState } from 'react';
import { Task } from '../types/task';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Task['status']>('pending');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [estimatedTime, setEstimatedTime] = useState<number | undefined>();
  const [actualTime, setActualTime] = useState<number | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'> = {
      title,
      description: description || undefined,
      status,
      priority,
      createdAt: new Date(),
      updatedAt: new Date(),
      dueDate: dueDate ? new Date(dueDate) : undefined,
      tags: tags.length > 0 ? tags : undefined,
      estimatedTime,
      actualTime,
    };

    onSubmit(taskData);
    
    setTitle('');
    setDescription('');
    setStatus('pending');
    setPriority('medium');
    setDueDate('');
    setTags([]);
    setTagInput('');
    setEstimatedTime(undefined);
    setActualTime(undefined);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="title">Название задачи *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Введите название задачи"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Описание</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Описание задачи (необязательно)"
          rows={3}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="status">Статус</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as Task['status'])}
          >
            <option value="pending">Ожидает</option>
            <option value="in_progress">В работе</option>
            <option value="completed">Завершена</option>
            <option value="cancelled">Отменена</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="priority">Приоритет</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Task['priority'])}
          >
            <option value="low">Низкий</option>
            <option value="medium">Средний</option>
            <option value="high">Высокий</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="dueDate">Срок выполнения</label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="tags">Теги</label>
        <div className="tags-input">
          <input
            id="tags"
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Введите тег и нажмите Добавить"
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
          />
          <button type="button" onClick={handleAddTag}>
            Добавить
          </button>
        </div>
        {tags.length > 0 && (
          <div className="tags-list">
            {tags.map(tag => (
              <span key={tag} className="tag">
                {tag}
                <button type="button" onClick={() => handleRemoveTag(tag)}>
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="estimatedTime">Оценка времени (часы)</label>
          <input
            id="estimatedTime"
            type="number"
            min="0"
            step="0.5"
            value={estimatedTime || ''}
            onChange={(e) => setEstimatedTime(e.target.value ? parseFloat(e.target.value) : undefined)}
            placeholder="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="actualTime">Фактическое время (часы)</label>
          <input
            id="actualTime"
            type="number"
            min="0"
            step="0.5"
            value={actualTime || ''}
            onChange={(e) => setActualTime(e.target.value ? parseFloat(e.target.value) : undefined)}
            placeholder="0"
          />
        </div>
      </div>

      <button type="submit" className="submit-btn">
        Создать задачу
      </button>
    </form>
  );
}