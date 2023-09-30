import { useState } from "react";

type Props = {
  onAddTask(task: string): void;
};

function AddTask(props: Props) {
  const [text, setText] = useState("");
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          setText("");
          props.onAddTask(text);
        }}
      >
        Add
      </button>
    </>
  );
}

export default AddTask;
