import { useState } from 'react';
import type { Todo, Priority, Category } from '../types';

const PRIORITY_LABELS: Record<Priority, string> = {
  high: '🔴 高',
  medium: '🟡 中',
  low: '🟢 低',
};

const CATEGORY_LABELS: Record<Category, string> = {
  work: '💼 仕事',
  personal: '👤 個人',
  shopping: '🛒 買い物',
  other: '📌 その他',
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' });
}

function isOverdue(dueDate?: string): boolean {
  if (!dueDate) return false;
  return new Date(dueDate + 'T00:00:00') < new Date(new Date().toDateString());
}

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onUpdate }: Props) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEditSave = () => {
    if (editText.trim() && editText.trim() !== todo.text) {
      onUpdate(todo.id, { text: editText.trim() });
    } else {
      setEditText(todo.text);
    }
    setEditing(false);
  };

  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleEditSave();
    if (e.key === 'Escape') { setEditText(todo.text); setEditing(false); }
  };

  const overdue = !todo.completed && isOverdue(todo.dueDate);

  return (
    <li className={`todo-item todo-item--${todo.priority} ${todo.completed ? 'todo-item--done' : ''} ${overdue ? 'todo-item--overdue' : ''}`}>
      <button
        className={`todo-item__check ${todo.completed ? 'todo-item__check--checked' : ''}`}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? '未完了に戻す' : '完了にする'}
      >
        {todo.completed ? '✓' : ''}
      </button>

      <div className="todo-item__body">
        {editing ? (
          <input
            className="todo-item__edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEditSave}
            onKeyDown={handleEditKeyDown}
            autoFocus
          />
        ) : (
          <span
            className="todo-item__text"
            onDoubleClick={() => !todo.completed && setEditing(true)}
          >
            {todo.text}
          </span>
        )}

        <div className="todo-item__meta">
          <span className="badge badge--priority">{PRIORITY_LABELS[todo.priority]}</span>
          <span className="badge badge--category">{CATEGORY_LABELS[todo.category]}</span>
          {todo.dueDate && (
            <span className={`badge ${overdue ? 'badge--overdue' : 'badge--due'}`}>
              📅 {formatDate(todo.dueDate)}{overdue ? ' 期限切れ' : ''}
            </span>
          )}
        </div>
      </div>

      <div className="todo-item__actions">
        {!todo.completed && (
          <button
            className="icon-btn"
            onClick={() => setEditing(true)}
            aria-label="編集"
            title="編集"
          >
            ✏️
          </button>
        )}
        <button
          className="icon-btn icon-btn--danger"
          onClick={() => onDelete(todo.id)}
          aria-label="削除"
          title="削除"
        >
          🗑️
        </button>
      </div>
    </li>
  );
}
