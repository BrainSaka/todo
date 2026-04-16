import type { FilterStatus, SortKey, Category } from '../types';

interface Props {
  filterStatus: FilterStatus;
  onFilterStatus: (f: FilterStatus) => void;
  filterCategory: Category | 'all';
  onFilterCategory: (c: Category | 'all') => void;
  sortKey: SortKey;
  onSort: (s: SortKey) => void;
  searchQuery: string;
  onSearch: (q: string) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

export function FilterBar({
  filterStatus, onFilterStatus,
  filterCategory, onFilterCategory,
  sortKey, onSort,
  searchQuery, onSearch,
  activeCount, completedCount,
  onClearCompleted,
}: Props) {
  return (
    <div className="filter-bar">
      <div className="filter-bar__search">
        <span className="filter-bar__search-icon">🔍</span>
        <input
          type="text"
          placeholder="検索..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className="filter-bar__search-input"
        />
        {searchQuery && (
          <button className="filter-bar__clear-search" onClick={() => onSearch('')}>✕</button>
        )}
      </div>

      <div className="filter-bar__row">
        <div className="filter-group">
          {(['all', 'active', 'completed'] as FilterStatus[]).map((s) => (
            <button
              key={s}
              className={`filter-btn ${filterStatus === s ? 'filter-btn--active' : ''}`}
              onClick={() => onFilterStatus(s)}
            >
              {s === 'all' ? `すべて (${activeCount + completedCount})` : s === 'active' ? `未完了 (${activeCount})` : `完了済み (${completedCount})`}
            </button>
          ))}
        </div>

        <div className="filter-group">
          {(['all', 'work', 'personal', 'shopping', 'other'] as (Category | 'all')[]).map((c) => (
            <button
              key={c}
              className={`filter-btn ${filterCategory === c ? 'filter-btn--active' : ''}`}
              onClick={() => onFilterCategory(c)}
            >
              {c === 'all' ? '📋 全て' : c === 'work' ? '💼' : c === 'personal' ? '👤' : c === 'shopping' ? '🛒' : '📌'}
            </button>
          ))}
        </div>

        <div className="filter-group">
          <span className="filter-label">並び替え:</span>
          <select
            className="form-select form-select--sm"
            value={sortKey}
            onChange={(e) => onSort(e.target.value as SortKey)}
          >
            <option value="createdAt">作成日</option>
            <option value="priority">優先度</option>
            <option value="dueDate">期日</option>
          </select>
        </div>

        {completedCount > 0 && (
          <button className="btn btn--ghost btn--sm" onClick={onClearCompleted}>
            完了済みを削除
          </button>
        )}
      </div>
    </div>
  );
}
