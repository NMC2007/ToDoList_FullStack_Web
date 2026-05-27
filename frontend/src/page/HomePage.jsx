import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import AddTask from "@/components/AddTask";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskListPagination from "@/components/TaskListPagination";
import DateTimeFilter from "@/components/DateTimeFilter";
import TaskList from "@/components/TaskList";
import Footer from "@/components/Footer";

import axios from "axios";

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([])

  useEffect(() => {
    fethTasks();
  }, [])


  const fethTasks = async () => {
    try {
      const res = await axios.get("http://localhost:4321/api/tasks");
      const tasks = res.data;

      console.log("Fetched tasks:", tasks);
      setTaskBuffer(tasks);

    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }


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

          <AddTask />

          <StatsAndFilters />

          <TaskList filteredTasks={taskBuffer} />

          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination />
            <DateTimeFilter />
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
