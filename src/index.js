import './styles.css';
import { TodoList } from './classes';
import { crearTodoHTML, countTodoPendientes } from './js/componentes';

export const todoList = new TodoList();

todoList.todos.forEach(crearTodoHTML);
countTodoPendientes();
