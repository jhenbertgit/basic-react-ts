import { useState } from "react";

export type TaskType = {
  id: number;
  text: string;
  done: boolean;
};

type Props = {
  tasks: TaskType[];
  onChangeTask(task: TaskType): void;
  onDeleteTask(id: number): void;
};

function TasksList(props: Props) {
  return (
    <div>
      <ul>
        {props.tasks.map((task) => (
          <li key={task.id}>
            <Task
              task={task}
              onChange={props.onChangeTask}
              onDelete={props.onDeleteTask}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

type TaskProps = {
  task: TaskType;
  onChange(task: TaskType): void;
  onDelete(id: number): void;
};

function Task(props: TaskProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  let taskContent;

  if (isEditing) {
    taskContent = (
      <>
        <input
          value={props.task.text}
          onChange={(event) => {
            props.onChange({ ...props.task, text: event.target.value });
          }}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    taskContent = (
      <>
        {props.task.text}{" "}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={props.task.done}
        onChange={(event) => {
          props.onChange({ ...props.task, done: event.target.checked });
        }}
      />
      {taskContent}
      <button onClick={() => props.onDelete(props.task.id)}>Delete</button>
    </label>
  );
}

export default TasksList;
