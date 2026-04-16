import { useState, useEffect, useCallback } from 'react';
import type { Todo, Priority, Category, FilterStatus, SortKey } from '../types';

const STORAGE_KEY = 'todos-app-data';

const PRIORITY_ORDER: Record<Priority, number> = { high: 0, medium: 1, low: 2 };

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function loadFromStorage(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Todo[]) : [];
  } catch {
    return [];
  }
}

function saveToStorage(todos: Todo[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadFromStorage);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [filterCategory, setFilterCategory] = useState<Category | 'all'>('all');
  const [sortKey, setSortKey] = useState<SortKey>('createdAt');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    saveToStorage(todos);
  }, [todos]);

  const addTodo = useCallback(
    (text: string, priority: Priority, category: Category, dueDate?: string) => {
      const todo: Todo = {
        id: generateId(),
        text: text.trim(),
        completed: false,
        priority,
        category,
        createdAt: Date.now(),
        dueDate,
      };
      setTodos((prev) => [todo, ...prev]);
    },
    []
  );

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const updateTodo = useCallback((id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }, []);

  const filteredAndSorted = (() => {
    let result = todos;

    // フィルター（ステータス）
    if (filterStatus === 'active') result = result.filter((t) => !t.completed);
    else if (filterStatus === 'completed') result = result.filter((t) => t.completed);

    // フィルター（カテゴリ）
    if (filterCategory !== 'all') result = result.filter((t) => t.category === filterCategory);

    // 検索
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((t) => t.text.toLowerCase().includes(q));
    }

    // ソート
    result = [...result].sort((a, b) => {
      if (sortKey === 'priority') return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      if (sortKey === 'dueDate') {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
      }
      return b.createdAt - a.createdAt;
    });

    return result;
  })();

  const stats = {
    total: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  return {
    todos: filteredAndSorted,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    clearCompleted,
    filterStatus,
    setFilterStatus,
    filterCategory,
    setFilterCategory,
    sortKey,
    setSortKey,
    searchQuery,
    setSearchQuery,
    stats,
  };
}
