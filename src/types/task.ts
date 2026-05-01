export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  tags?: string[];
  assigneeId?: string;
  projectId?: string;
  estimatedTime?: number;
  actualTime?: number;
}