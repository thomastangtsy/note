import { FC } from "react";
import TodoItem from "../models/todo";

interface TodoListProps {
  todoList: Array<TodoItem>;
  removeItem: (index: number) => void;
  finishItem: (index: number) => void;
}

const TodoList: FC<TodoListProps> = ({ todoList, removeItem, finishItem }) => {
  return todoList.length === 0 ? (
    <div className="col text-center">
      <p>You've done all the task!🎉</p>
    </div>
  ) : (
    todoList.map(({ name, status }, index) => {
      return (
        <div key={`${index}${name}`} className="row">
          <div className="col d-flex col-md-6 text-center align-items-center justify-content-center">
            <p className="m-0">
              {status === "DONE" && <span>✅ </span>}
              {name}
            </p>
          </div>
          <div className="col-md-auto my-1 justify-content-center d-flex">
            <button
              className="btn btn-success"
              onClick={() => {
                finishItem(index);
              }}
              disabled={status === "DONE"}
            >
              Done!
            </button>
          </div>
          <div className="col-md-auto my-1 justify-content-center d-flex">
            <button
              className="btn btn-warning"
              onClick={() => {
                removeItem(index);
              }}
            >
              Remove
            </button>
          </div>
          <hr className="px-4 my-2" />
        </div>
      );
    })
  );
};

export default TodoList;
