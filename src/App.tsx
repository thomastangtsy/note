import { ChangeEventHandler, FC, useCallback, useState } from "react";
import TodoList from "./components/TodoList";
import TodoItem from "./models/todo";

const defaultTodoItems: Readonly<Array<string>> = [
  "Buy groceries",
  "Clean the house",
  "Walk the dog",
];

const App: FC = () => {
  const [todoList, setTodoList] = useState<Array<TodoItem>>(
    defaultTodoItems.map((name) => ({ name, status: "TODO" })),
  );

  const [taskInput, setTaskInput] = useState("");

  const onTaskInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setTaskInput(event.currentTarget.value);
    },
    [setTaskInput],
  );

  const addTodoItem = useCallback(() => {
    setTodoList((prev) => prev.concat([{ name: taskInput.trim(), status: "TODO" }]));
    setTaskInput("");
  }, [taskInput, setTaskInput, setTodoList]);

  const removeTodoItem = useCallback(
    (index: number) => {
      setTodoList((prev) => {
        const newTodo = prev.slice();
        newTodo.splice(index, 1);
        return newTodo;
      });
    },
    [setTodoList],
  );

  const finishTodoItem = useCallback(
    (index: number) => {
      setTodoList((prev) => {
        const newTodo = prev.slice();
        newTodo[index].status = "DONE";
        return newTodo;
      });
    },
    [setTodoList],
  );

  return (
    <div className="container justify-content-center">
      <h1 className="text-center mb-4">Simple To-Do</h1>
      <div className="row">
        <div className="col col-md-auto d-flex align-items-center justify-content-end">
          <p className="m-0 text-end">Add a new task:</p>
        </div>
        <div className="col d-flex align-items-center">
          <input
            className="form-control"
            type="text"
            onChange={onTaskInputChange}
            value={taskInput}
          />
        </div>
        <div className="col col-md-auto d-flex align-items-center justify-content-center my-1">
          <button
            className="btn btn-primary"
            disabled={taskInput.trim().length === 0}
            onClick={addTodoItem}
          >
            Add
          </button>
        </div>
      </div>
      <div className="row text-center">
        <div className="col">
          <h3 className="mt-5">Task list:</h3>
        </div>
      </div>
      <TodoList
        todoList={todoList}
        removeItem={removeTodoItem}
        finishItem={finishTodoItem}
      />
    </div>
  );
};

export default App;
