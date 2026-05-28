import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import AddTask from "@/components/AddTask";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskListPagination from "@/components/TaskListPagination";
import DateTimeFilter from "@/components/DateTimeFilter";
import TaskList from "@/components/TaskList";
import Footer from "@/components/Footer";

import api from "@/lib/axios";

const HomePage = () => {

  // state
  const [taskBuffer, setTaskBuffer] = useState([])

  const [activeTasksCount, setActiveTasksCount] = useState(0);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);

  const [filter, setFilter] = useState("all");


  // call api
  useEffect(() => {
    fethTasks();
  }, [])

  const fethTasks = async () => {
    try {
      const res = await api.get("/tasks");
      const tasks = res.data;

      console.log("Fetched tasks:", tasks);
      setTaskBuffer(tasks.tasks);
      setActiveTasksCount(tasks.activeCount);
      setCompletedTasksCount(tasks.completedCount);

    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  // kiểm tra fillter xem tiêu trí lọc là gì
  // nếu là all thì trả về tất cả còn lại thì trả về theo tiêu trí
  const filterTasks = taskBuffer.filter((tasks) => {
    switch(filter) {
      case "active":
        return tasks.status === "active"
      case "completed":
        return tasks.status === "completed"
      default:
        return true
    }
  });

// re render khi task có sự thay đổi
  const handleTaskChange = () => {
    fethTasks();
  }

  // component
  return (
    <div className="min-h-screen w-full relative">
      {/* Peachy Mint Dream Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(135deg, #FFB5A7 0%, #F8D7DA 25%, #E8F5E8 75%, #B8F2D0 100%)`,
        }}
      />
      <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          <Header />

          <AddTask handleAddTask = {handleTaskChange} />

          <StatsAndFilters
            activeTasksCount={activeTasksCount}
            completedTasksCount={completedTasksCount}
            setFilter={setFilter}
            filter={filter}
          />

          <TaskList filteredTasks={filterTasks} filter={filter} />

          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination />
            <DateTimeFilter />
          </div>

          <Footer
            completedTaskCount={completedTasksCount}
            activeTaskCount={activeTasksCount}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
