import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
});

export const getTodos = () => api.get('/todos');
export const addTodo = (title) => api.post('/todos', { title });
export const deleteTodo = (id) => api.delete(`/todos/${id}`);
export const summarizeTodos = () => api.post('/summarize');
export const updateTodo = (id, completed, title) => {
  const body = {};
  if (completed !== undefined) body.completed = completed;
  if (title !== undefined) body.title = title;

  return api.patch(`/todos/${id}`, body);
};


export default api;