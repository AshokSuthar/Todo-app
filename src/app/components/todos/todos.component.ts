import { Component, OnInit } from '@angular/core';
import { Todo } from './../../models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];

  inputTodo: string = '';
  currentId: number = 0;
  currentTodo: Todo = { content: '', completed: false };

  constructor() {
    this.todos = [];
  }

  ngOnInit(): void {
    this.todos = JSON.parse(localStorage.getItem('todos') || '[]');
  }

  toggleDone(id: number) {
    this.todos.map((v, i) => {
      if (i == id) v.completed = !v.completed;
      return v;
    });
    this.saveLocalStorage();
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((v, i) => i !== id);
    this.saveLocalStorage();
  }

  addTodo() {
    this.todos.push({
      content: this.inputTodo,
      completed: false,
    });
    this.inputTodo = '';
    this.toggleAddTodo();
    this.saveLocalStorage();
  }

  toggleAddTodo() {
    const addForm = document.querySelector('.add-form');
    const addFormButton = document.querySelector('.add-form-submit');
    addForm?.classList.toggle('hidden');
    addFormButton?.classList.toggle('hidden');
  }

  toggleEditTodo(id: number) {
    this.currentTodo = this.todos.find((v, i) => i == id) || this.currentTodo;
    this.showEditForm();
    this.inputTodo = this.currentTodo.content;
  }

  editTodo() {
    this.currentId = this.todos.findIndex((v, i) => v == this.currentTodo);
    this.todos[this.currentId] = {
      content: this.inputTodo,
      completed: false,
    };
    this.inputTodo = '';
    this.removeForms();
    this.saveLocalStorage();
  }

  removeForms() {
    const addForm = document.querySelector('.add-form');
    const editForm = document.querySelector('.edit-form');
    const addFormButton = document.querySelector('.add-form-submit');
    editForm?.classList.add('hidden');
    addForm?.classList.add('hidden');
    addFormButton?.classList.remove('hidden');
  }

  showEditForm() {
    const editForm = document.querySelector('.edit-form');
    const addFormButton = document.querySelector('.add-form-submit');
    const addForm = document.querySelector('.add-form');
    editForm?.classList.remove('hidden');
    addFormButton?.classList.add('hidden');
    addForm?.classList.add('hidden');
  }

  toggleClearList() {
    localStorage.removeItem('todos');
    this.todos = [];
  }

  saveLocalStorage() {
    console.log(JSON.stringify(this.todos));

    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
