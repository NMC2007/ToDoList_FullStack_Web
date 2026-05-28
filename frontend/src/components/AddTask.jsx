import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/axios";

const AddTask = ( {handleTaskChange = () => {}}) => {
  const [newTaskTitle, setTewTaskTitle] = useState("")

  // gửi request
  const addTask = async () => {
    if (newTaskTitle.trim()) {
      try {
        await api.post("/tasks", {
          title: newTaskTitle
        })

        toast.success(`Nhiệm vụ ${newTaskTitle} được thêm thành công`)

        // gọi đến hàm ở component cha yêu cầu re render để lấy dữ liệu mới
        // khi thêm task
        handleTaskChange()

      } catch (error) {
        console.error(error)
        toast.error("Lỗi sảy ra khi thêm nhiệm vụ")
      }

      setTewTaskTitle("")

    } else {
      toast.error("Nội dung nhiệm vụ chưa được nhập")
    }
  }

  // ấn enter để gửi request
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      addTask()
    }
  }

  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="text"
          placeholder="Việc cần làm là..."
          value = {newTaskTitle}
          onChange = {(e) => setTewTaskTitle(e.target.value)}
          onKeyPress = {handleEnter}
          className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/80 focus:ring-1 focus:ring-primary/80 focus:ring-primary/50"
        />

        <Button
          variant="gradient"
          size="xl"
          className="px-6 items-center justify-between"
          onClick = {addTask}
          disabled = {!newTaskTitle.trim()}
        >
          <Plus className="size-5" />
          Thêm
        </Button>
      </div>
    </Card>
  );
};

export default AddTask;
