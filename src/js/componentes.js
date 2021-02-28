import { Todo } from '../classes/todo.class';
import { todoList } from '../index';

// Referencias en el HTML
const divTodoList = document.querySelector('.todo-list');
const inputText = document.querySelector('.new-todo');
const btnCleanCompletados = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');
const countTodosPendientes = document.querySelector('.todo-count');

export const crearTodoHTML = (todo) => {
  const htmlTodo = `
  <li class="${todo.completado ? 'completed' : ''}" data-id="${todo.id}">
    <div class="view">
      <input class="toggle" type="checkbox" ${todo.completado ? 'checked' : ''}>
      <label>${todo.tarea}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
  </li>`;

  const div = document.createElement('div');
  div.innerHTML = htmlTodo;

  divTodoList.append(div.firstElementChild);

  return div;
};

export const countTodoPendientes = () => {
  countTodosPendientes.getElementsByTagName('strong')[0].innerText = todoList.todosPendientesCount();
};

// Eventos

inputText.addEventListener('keyup', (event) => {
  if (event.keyCode === 13 && inputText.value.length > 0) {
    const nuevoTodo = new Todo(inputText.value);
    todoList.nuevoTodo(nuevoTodo);

    crearTodoHTML(nuevoTodo);
    inputText.value = '';
    countTodoPendientes();
  }
});

divTodoList.addEventListener('click', (event) => {
  const nombreElemento = event.target.localName; // input, label, button...
  const todoElemento = event.target.parentElement.parentElement;
  const todoId = todoElemento.getAttribute('data-id');

  if (nombreElemento.includes('input')) {
    todoList.marcarCompletado(todoId);
    todoElemento.classList.toggle('completed');
    countTodoPendientes();
  } else if (nombreElemento.includes('button')) {
    todoList.eliminarTodo(todoId);
    divTodoList.removeChild(todoElemento);
    countTodoPendientes();
  }
});

btnCleanCompletados.addEventListener('click', () => {
  todoList.eliminarTodoCompletados();

  for (let i = divTodoList.children.length - 1; i >= 0; i--) {
    const elemento = divTodoList.children[i];

    if (elemento.classList.contains('completed')) {
      divTodoList.removeChild(elemento);
    }
  }
});

ulFiltros.addEventListener('click', (event) => {
  const filtro = event.target.text;
  if (!filtro) return;

  anchorFiltros.forEach(elem => elem.classList.remove('selected'));
  event.target.classList.add('selected');

  for (const element of divTodoList.children) {
    element.classList.remove('hidden');
    const completado = element.classList.contains('completed');

    switch (filtro) {
      case 'Pendientes':
        if (completado) {
          element.classList.add('hidden');
        }
        break;
      case 'Completados':
        if (!completado) {
          element.classList.add('hidden');
        }
        break;
      default:
        break;
    }
  }
});
