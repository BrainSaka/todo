import { useState, type FormEvent } from 'react';
import type { Priority, Category } from '../types';

interface Props {
  onAdd: (text: string, priority: Priority, category: Category, dueDate?: string) => void;
}

export function AddTodoForm({ onAdd }: Props) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState<Category>('personal');
  const today = new Date().toLocaleDateString('sv-SE');
  const [dueDate, setDueDate] = useState(today);
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, priority, category, dueDate || undefined);
    setText('');
    setDueDate(today);
    setPriority('medium');
    setCategory('personal');
    setExpanded(false);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="add-form__main">
        <input
          className="add-form__input"
          type="text"
          placeholder="新しいTODOを入力..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setExpanded(true)}
        />
        <button className="add-form__submit btn btn--primary" type="submit" disabled={!text.trim()}>
          追加
        </button>
      </div>

      {expanded && (
        <div className="add-form__options">
          <label className="form-label">
            優先度
            <select
              className="form-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
            >
              <option value="high">🔴 高</option>
              <option value="medium">🟡 中</option>
              <option value="low">🟢 低</option>
            </select>
          </label>

          <label className="form-label">
            カテゴリ
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
            >
              <option value="work">💼 仕事</option>
              <option value="personal">👤 個人</option>
              <option value="shopping">🛒 買い物</option>
              <option value="other">📌 その他</option>
            </select>
          </label>

          <label className="form-label">
            期日
            <input
              className="form-select"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </label>
        </div>
      )}
    </form>
  );
}
