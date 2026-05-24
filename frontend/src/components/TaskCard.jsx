import React from "react";
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

const TaskCard = ({ task, index }) => {
  console.log(task.status);
  let isEditing = false;
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
          >
            <SquarePen className="size-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
          >
            <Trash2 />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
