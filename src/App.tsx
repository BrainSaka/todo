import { useTodos } from './hooks/useTodos';

import { AddTodoForm } from './components/AddTodoForm';
import { TodoItem } from './components/TodoItem';
import { FilterBar } from './components/FilterBar';
import { StatsBar } from './components/StatsBar';
import './App.css';

export default function App() {
  const {
    todos,
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
  } = useTodos();

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">
          <span className="app__title-icon">✅</span>
          TODO App
        </h1>
        <p className="app__subtitle">タスクを管理して、一つひとつ達成しよう</p>
      </header>

      <main className="app__main">
        <StatsBar {...stats} />
        <AddTodoForm onAdd={addTodo} />
        <FilterBar
          filterStatus={filterStatus}
          onFilterStatus={setFilterStatus}
          filterCategory={filterCategory}
          onFilterCategory={setFilterCategory}
          sortKey={sortKey}
          onSort={setSortKey}
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          activeCount={stats.active}
          completedCount={stats.completed}
          onClearCompleted={clearCompleted}
        />

        {todos.length === 0 ? (
          <div className="empty-state">
            <span className="empty-state__icon">🎉</span>
            <p className="empty-state__text">
              {stats.total === 0
                ? 'TODOはまだありません。上のフォームから追加しましょう！'
                : '条件に一致するTODOが見つかりません。'}
            </p>
          </div>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onUpdate={updateTodo}
              />
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
