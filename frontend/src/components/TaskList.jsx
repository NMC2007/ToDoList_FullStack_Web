import React from "react";
import TaskEmptyState from "./TaskEmptyState";
import TaskCard from "./TaskCard";

const TaskList = () => {
  let filter = "all";
  const filteredTasks = [
    {
      _id: 1,
      title: "Task 1",
      status: "active",
      completeAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: 2,
      title: "Task 2",
      status: "completed",
      completeAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  if (filteredTasks.length === 0 || !filteredTasks) {
    return <TaskEmptyState filter={filter} />;
  }

  return (
    <div className="space-y-3">
      {filteredTasks.map((task, index) => (
        <TaskCard key={task._id ?? index} task={task} index={index} />
      ))}
    </div>
  );
};

export default TaskList;
