import { useState } from "react"

interface Props {
  columnId: string
}
export const AddTaskButton = ({ columnId }: Props) => {
  const [showInput, setShowInput] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [loading, setLoading] = useState(false)

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return
    setLoading(true)
    try {
      const { createTask } = await import("../services/api")

      await createTask(newTitle, columnId)
      setNewTitle("")
      setShowInput(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {showInput ? (
        <form
          onSubmit={handleAddTask}
          onBlur={() => setShowInput(false)}
          className="mt-2 flex gap-1">
          <input
            className="flex-1 rounded border px-2 py-1 text-sm"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Nueva tarea"
            autoFocus
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-2 rounded text-sm"
            disabled={loading}>
            {loading ? "..." : "Agregar"}
          </button>
          {/* <button
            type="button"
            className="text-xs px-2"
            onClick={() => setShowInput(false)}
            disabled={loading}>
            Cancelar
          </button> */}
        </form>
      ) : (
        <button
          className="mt-2 text-xs text-blue-600 hover:underline"
          onClick={() => setShowInput(true)}>
          + Agregar tarea
        </button>
      )}
    </>
  )
}
