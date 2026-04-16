export type Priority = 'high' | 'medium' | 'low';

export type Category = 'work' | 'personal' | 'shopping' | 'other';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  createdAt: number;
  dueDate?: string;
}

export type FilterStatus = 'all' | 'active' | 'completed';
export type SortKey = 'createdAt' | 'priority' | 'dueDate';
