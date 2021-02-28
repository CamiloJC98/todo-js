import { Todo } from './todo.class';

export class TodoList {

  constructor() {
    // this.todos = [];
    this.cargarLocalStorage();
  }

  nuevoTodo(todo) {
    this.todos.push(todo);
    this.guardarLocalStorage();
  }

  eliminarTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== Number(id));
    this.guardarLocalStorage();
  }

  eliminarTodoCompletados() {
    this.todos = this.todos.filter((todo) => !todo.completado);
    this.guardarLocalStorage();
  }

  marcarCompletado(id) {
    this.todos.forEach((todo) => {
      if (todo.id === Number(id)) {
        todo.completado = !todo.completado;
        this.guardarLocalStorage();
      }
    });
  }

  guardarLocalStorage() {
    localStorage.setItem('todo', JSON.stringify(this.todos));
  }

  cargarLocalStorage() {
    this.todos = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : [];
    this.todos = this.todos.map(Todo.fromJson);
  }

  todosPendientesCount() {
    return this.todos.length > 0 ? this.todos.filter(todo => !todo.completado).length : 0;
  }
}
