import { useEffect, useState } from "react"
import Column from "./Column"
import {
  getColumns,
  getTasks,
  type Column as ColumnType,
  type Task as TaskType,
  updateTaskPosition,
} from "../services/api"
import { useSocket } from "../hooks/useSocket"
import {
  DndContext,
  closestCenter,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core"
import Task from "./Task"
import ExportBoardForm from "./ExportBoardForm"

const Board = () => {
  const [columns, setColumns] = useState<ColumnType[]>([])
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null)
  const [showExportForm, setShowExportForm] = useState(false)

  const { emit } = useSocket((data) => {
    console.log({ data })
    if (Array.isArray(data)) {
      setColumns(data)
      // Aplanar todas las tareas de todas las columnas
      const allTasks = data.flatMap((col) => (Array.isArray(col.tasks) ? col.tasks : []))
      setTasks(allTasks)
    }
  })

  useEffect(() => {
    getColumns().then((res) => setColumns(res.data))
    getTasks().then((res) => setTasks(res.data))
  }, [])

  const handleDragStart = (event: DragStartEvent) => {
    setActiveTaskId(String(event.active.id))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTaskId(null)
    const { active, over } = event
    if (!over) return

    const task = tasks.find((t) => `task-${t.id}` === active.id)
    if (!task) return

    let newColumnId: string | null = null

    if (typeof over.id === "string" && over.id.startsWith("column-")) {
      // Soltó en el espacio de una columna
      newColumnId = over.id.replace("column-", "")
    } else if (typeof over.id === "string" && over.id.startsWith("task-")) {
      // Soltó sobre otra tarea → usamos la columna de esa tarea
      const overTask = tasks.find((t) => `task-${t.id}` === over.id)
      newColumnId = overTask?.columnId ?? task.columnId
    }

    if (!newColumnId) return

    const newPosition = 0 // ajustar luego si querés soportar orden
    const updatedTask = { ...task, columnId: newColumnId, position: newPosition }

    // 🔹 WebSocket + API
    emit("moveTask", updatedTask)
    updateTaskPosition(task.id, newColumnId, newPosition)
  }

  const activeTask = activeTaskId ? tasks.find((t) => `task-${t.id}` === activeTaskId) : null

  // Estado para crear columna
  const [showColInput, setShowColInput] = useState(false)
  const [newColName, setNewColName] = useState("")
  const [colLoading, setColLoading] = useState(false)

  const handleAddColumn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newColName.trim()) return
    setColLoading(true)
    try {
      const { createColumn } = await import("../services/api")
      const res = await createColumn(newColName)
      setColumns((prev) => [...prev, res.data])
      setNewColName("")
      setShowColInput(false)
    } finally {
      setColLoading(false)
    }
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}>
      <div className="flex flex-col md:flex-row gap-4 overflow-x-auto p-4 w-full">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.columnId === col.id)
          return <Column key={col.id} column={col} tasks={colTasks} />
        })}
        <div className="min-w-[12rem] flex flex-col justify-start">
          {showColInput ? (
            <form
              onSubmit={handleAddColumn}
              className="bg-gray-100 rounded p-2 flex flex-col gap-2">
              <input
                className="rounded border px-2 py-1 text-sm"
                value={newColName}
                onChange={(e) => setNewColName(e.target.value)}
                placeholder="Nombre de columna"
                autoFocus
                disabled={colLoading}
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-2 rounded text-sm"
                  disabled={colLoading}>
                  {colLoading ? "..." : "Agregar"}
                </button>
                <button
                  type="button"
                  className="text-xs px-2 text-black"
                  onClick={() => setShowColInput(false)}
                  disabled={colLoading}>
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <button
              className="px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              onClick={() => setShowColInput(true)}>
              + Agregar columna
            </button>
          )}
          <button
            onClick={() => {
              setShowExportForm(true)
            }}
            className="px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-gray-900 w-full text-left">
            Exportar tablero
          </button>
          {showExportForm && <ExportBoardForm onClose={() => setShowExportForm(false)} />}
        </div>
      </div>
      <DragOverlay>{activeTask ? <Task task={activeTask} isOverlay /> : null}</DragOverlay>
    </DndContext>
  )
}

export default Board
