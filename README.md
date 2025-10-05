                 ┌─────────────┐
                 │    User     │
                 └─────┬───────┘
                       │
    ┌──────────────────┼───────────────────┐
    │                  │                   │
    ▼                  ▼                   ▼
┌─────────────┐   ┌─────────────┐    ┌─────────────┐
│ TodoInput   │   │ TodoSearch  │    │ Pagination  │
└─────┬───────┘   └─────┬───────┘    └─────┬───────┘
      │ onAddTodo()       │ setSearchQuery()       │ onPageChange()
      ▼                   ▼                       ▼
               ┌─────────────────────────────┐
               │          useTodos            │
               │ State: todos, searchQuery, │
               │ currentPage, todosPerPage  │
               │ Methods: add, update,      │
               │ delete, setPage            │
               └─────────┬───────────────────┘
                         │
                         │ filteredTodos + paginatedTodos
                         ▼
                   ┌─────────────┐
                   │ TodoList    │
                   └─────┬───────┘
                         │
        ┌────────────────┴───────────────┐
        ▼                                ▼
  ┌─────────────┐                  ┌─────────────┐
  │  TodoItem   │                  │  TodoItem   │
  │  (todo)     │                  │  (todo)     │
  └─────┬───────┘                  └─────┬───────┘
        │ onUpdate()/onDelete()           │ onUpdate()/onDelete()
        ▼                                  ▼
               ┌─────────────┐
               │   useTodos  │
               │ State Update│
               └─────┬───────┘
                     │
                     ▼
               ┌─────────────┐
               │ UI Re-render│
               └─────────────┘
