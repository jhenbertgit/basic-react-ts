import { useReducer } from "react";
import AddTask from "./components/AddTask";
import TasksList, { TaskType } from "./components/TasksList";

let nexId = 3;
const initialTasks: TaskType[] = [
  { id: 0, text: "Going to church", done: true },
  { id: 1, text: "Wash dishes", done: false },
  { id: 2, text: "Wash clothes", done: false },
];

type AddTaskType = {
  type: "added";
  id: number;
  text: string;
};

type ChangedTaskType = {
  type: "changed";
  task: TaskType;
};

type DeleteTaskType = {
  type: "deleted";
  id: number;
};

type TaskAction = AddTaskType | ChangedTaskType | DeleteTaskType;

function App() {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks as TaskType[]);

  const handleAddTask = (text: string) => {
    dispatch({ type: "added", id: nexId++, text: text });
  };

  const handleChangeTask = (task: TaskType) => {
    dispatch({ type: "changed", task: task });
  };

  const handleDeleteTask = (taskId: number) => {
    dispatch({ type: "deleted", id: taskId });
  };

  return (
    <>
      <h1>Sample Tasks</h1>
      <AddTask onAddTask={handleAddTask} />
      <TasksList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

function taskReducer(tasks: TaskType[], action: TaskAction): TaskType[] {
  switch (action.type) {
    case "added": {
      return [...tasks, { id: action.id, text: action.text, done: false }];
    }

    case "changed": {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return { ...t, ...action.task };
        } else {
          return t;
        }
      });
    }

    case "deleted": {
      return tasks.filter((t) => t.id !== action.id);
    }

    default: {
      throw Error("Unknown Error");
    }
  }
}

export default App;
