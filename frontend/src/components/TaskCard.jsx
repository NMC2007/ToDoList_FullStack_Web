import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Circle,
  CheckCircle2,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import api from "@/lib/axios";

const TaskCard = ({ task, index, handleTaskChange = () => {} }) => {
  const [isEditing, setIsEditing] = useState(false)

  const [updateTagTitle, setUpdateTagTitle] = useState(task.title || "")

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`)
      
      toast.success(`Nhiệm vụ được xoá thành công`)

      handleTaskChange()
    } catch (error) {
      console.error(error)
      toast.error("Lỗi sảy ra khi xoá nhiệm vụ")
    }
  }


  const updateTag = async () => {
    try {
      setIsEditing(false)

      await api.put(`/tasks/${task._id}`, {
        title: updateTagTitle
      })

      toast.success(`Nhiệm vụ được sửa thành công`)

      handleTaskChange()
    } catch (error) {
      console.error(error)
      toast.error("Lỗi sảy ra khi sửa nhiệm vụ")
    }
  }


  const toggleTaskCompleteBtn = async () => {
    try {
      if (task.status === 'active') {
        await api.put(`/tasks/${task._id}`, {
          status: 'completed',
          completeAt: new Date().toISOString()
        })
        toast.success(`Nhiệm vụ được đã hoàn thành`)

      } else {
        await api.put(`/tasks/${task._id}`, {
          status: 'active',
          completeAt: null
        })
        toast.success(`Nhiệm vụ được chưa hoàn thành`)
      }
      handleTaskChange()
    } catch (error) {
      console.error(error)
      toast.error("Lỗi sảy ra khi sửa nhiệm vụ")
    }
  }


  const handleEnter = (e) => {
    if (e.key === "Enter") {
      updateTag()
    }
  }

  return (
    <Card
      className={cn(
        "p-4 border-0 bg-gradient-card shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === "completed" && "opacity-75",
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "flex-shrink-0 size-8 rounded-full transition-all duration-200 bg-white",
            task.status === "completed"
              ? "text-success hover:text-success/80"
              : "text-muted-foreground hover:text-primary",
          )}

          onClick = {toggleTaskCompleteBtn}
        >
          {task.status === "completed" ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <Input
              placeholder="cần phải làm gì?"
              className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
              type="text"
              value = {updateTagTitle}
              onChange = {e => setUpdateTagTitle(e.target.value)}
              onKeyPress = {handleEnter}
              onBlur = {() => {
                setIsEditing(false)
                setUpdateTagTitle(task.title || "")
              }}
            />
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200",
                task.status === "completed"
                  ? "line-through text-muted-foreground"
                  : "text-foreground",
              )}
            >
              {task.title}
            </p>
          )}

          <div className="flex items-center gap-2 mt-1">
            <Calendar className="size-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleString()}
            </span>
            {task.completeAt && (
              <>
                <span className="text-xs text-muted-foreground"> - </span>
                <Calendar className="size-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {new Date(task.completeAt).toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
            onClick={() => {
              setIsEditing(true)
              setUpdateTagTitle(task.title || "")
            }}
          >
            <SquarePen className="size-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
            onClick = {() => deleteTask(task._id)}
          >
            <Trash2 />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
