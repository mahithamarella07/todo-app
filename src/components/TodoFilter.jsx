const FILTERS = ["all", "active", "completed"];

export default function TodoFilter({ filter, onChange, remaining, onClearDone, hasDone }) {
  return (
    <div className="todo-footer">
      <span>{remaining} left</span>
      <div className="filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => onChange(f)}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <button onClick={onClearDone} disabled={!hasDone}>
        Clear completed
      </button>
    </div>
  );
}