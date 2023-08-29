import { FC, useCallback, useState } from "react";
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

  const removeItem = useCallback(
    (index: number) => {
      setTodoList((prev) => {
        const newTodo = prev.slice();
        newTodo.splice(index, 1);
        return newTodo;
      });
    },
    [setTodoList],
  );

  const finishItem = useCallback(
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
      <TodoList
        todoList={todoList}
        removeItem={removeItem}
        finishItem={finishItem}
      />
    </div>
  );
};

export default App;
