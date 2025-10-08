import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task as TaskType } from "../services/api";

interface TaskProps {
  task: TaskType;
  isOverlay?: boolean;
}

const Task = ({ task, isOverlay = false }: TaskProps) => {
  const taskId = `task-${task.id}`;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: taskId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: isOverlay ? 'grabbing' : 'grab',
    ...(isOverlay ? { boxShadow: '0 4px 16px rgba(0,0,0,0.15)', background: 'white', color: '#222', width: 240, zIndex: 50} : {})
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
  className={`bg-white p-2 mb-2 rounded shadow`}
    >
      {task.title}
    </div>
  );
};

export default Task;
