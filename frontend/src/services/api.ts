import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3000",
})

export interface Column {
  id: string
  name: string
  tasks?: Task[]
}

export interface Task {
  id: string
  title: string
  description?: string
  columnId: string
  position?: number
}

export const getColumns = () => api.get<Column[]>("/columns")
export const getTasks = () => api.get<Task[]>("/tasks")

export const createColumn = (name: string) => api.post<Column>("/columns", { name })

export const createTask = (title: string, columnId: string) =>
  api.post<Task>("/tasks", { title, columnId })

export const updateTaskPosition = (taskId: string, columnId: string, position: number) =>
  api.patch(`/tasks/${taskId}/move`, { columnId, position })

export const exportBoard = (email: string) =>
  api.post('/export/board', { email })
