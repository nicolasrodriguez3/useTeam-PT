import type { Column as ColumnType, Task as TaskType } from "../services/api"
import Task from "./Task"
import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { AddTaskButton } from "./AddTaskButton"
import { HiOutlineDotsVertical } from "react-icons/hi"
import { useState } from "react"


interface ColumnProps {
  column: ColumnType
  tasks: TaskType[]
}

const Column = ({ column, tasks }: ColumnProps) => {
  const columnId = `column-${column.id}`
  const { setNodeRef, isOver } = useDroppable({ id: columnId })
  const [menuOpen, setMenuOpen] = useState(false)
  

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-100 text-gray-950 rounded p-2 w-full md:w-64 min-h-[300px] flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold">{column.name}</h2>
        <div className="relative">
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1 hover:bg-gray-200 rounded"
          >
            <HiOutlineDotsVertical className="w-5 h-5" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-1 bg-white shadow-lg rounded-md py-1 z-10">
              
            </div>
          )}
        </div>
      </div>
      <SortableContext
        items={tasks.map((t) => `task-${t.id}`)}
        strategy={verticalListSortingStrategy}>
        <div className={`flex-1  ${isOver ? "ring-2 ring-blue-300" : ""}`}>
          {tasks.map((t) => (
            <Task key={t.id} task={t} />
          ))}
        </div>
      </SortableContext>
      <AddTaskButton columnId={column.id} />
      
    </div>
  )
}

export default Column
