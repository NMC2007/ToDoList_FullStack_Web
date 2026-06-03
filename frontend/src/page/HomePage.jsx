import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import AddTask from "@/components/AddTask";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskListPagination from "@/components/TaskListPagination";
import DateTimeFilter from "@/components/DateTimeFilter";
import TaskList from "@/components/TaskList";
import Footer from "@/components/Footer";

import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/data";

const HomePage = () => {

  // state
  const [taskBuffer, setTaskBuffer] = useState([])

  const [activeTasksCount, setActiveTasksCount] = useState(0);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);

  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("all");

  const [page, setPage] = useState(1);


  // call api
  useEffect(() => {
    setPage(1);
    fethTasks();
  }, [dateQuery])

  // reset page khi thay đổi filter status
  useEffect(() => {
    setPage(1);
  }, [filter])

  const fethTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
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

  // Tính toán phân trang
  const totalPages = Math.ceil(filterTasks.length / visibleTaskLimit);
  const paginatedTasks = filterTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );

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

          <AddTask handleTaskChange={handleTaskChange} />

          <StatsAndFilters
            activeTasksCount={activeTasksCount}
            completedTasksCount={completedTasksCount}
            setFilter={setFilter}
            filter={filter}
          />

          <TaskList
            filteredTasks={paginatedTasks}
            filter={filter}
            handleTaskChange={handleTaskChange}
          />

          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination 
              page={page}
              totalPages={totalPages}
              setPage={setPage}
            />
            <DateTimeFilter dateQuery = {dateQuery} setDateQuery = {setDateQuery} />
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
