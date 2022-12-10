import React, { useState, ChangeEvent } from "react";
import "./App.css";
import TodoTask from "./components/TodoTask";
import { ITask } from "./Interfaces";

const App: React.FC = () => {
  const [isTask, setIsTask] = useState<string>("");
  const [isDeadline, setIsDeadLine] = useState<number>(0);
  const [isTodoList, setIsTodoList] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setIsTask(event.target.value);
    } else {
      setIsDeadLine(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = { taskName: isTask, deadLine: isDeadline };
    setIsTodoList([...isTodoList, newTask]);
    setIsTask("");
    setIsDeadLine(0);
  };

  const completeTask = (taskNameToDelete: string): void => {
    setIsTodoList(
      isTodoList.filter((isTask) => {
        return isTask.taskName !== taskNameToDelete;
      })
    );
  };

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Task..."
            onChange={handleChange}
            name="task"
            value={isTask}
          />
          <input
            type="number"
            placeholder="Deadlines (in days...)"
            onChange={handleChange}
            name="deadline"
            className="input-align"
            value={isDeadline}
          />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="todoList">
        {isTodoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} />;
        })}
      </div>
    </div>
  );
};

export default App;
