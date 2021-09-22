// eslint-disable-next-line max-classes-per-file
import _ from 'lodash';
import './style.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import Icon from './left-arrow.svg';

class Task {
  constructor(index, description) {
    this.index = index;
    this.description = description;
    this.completed = false;
  }
}

class Tasks {
  constructor() {
    this.list = [];
    this.lastIndex = 0;
  }

  addTask(description) {
    this.lastIndex++;
    const task = new Task(this.lastIndex, description);
    this.list = [...this.list, task];
  }

  copyList(list) {
    this.list = [...list];
  }

  removeTask(task) {
    const oldList = this.list;
    const index = this.list.indexOf(task);
    this.list = [...oldList.slice(0, index), ...oldList.slice(index + 1)];
  }

  sortList() {
    this.list.sort((a, b) => a.index - b.index);
  }
}

const taskList = new Tasks();
taskList.copyList([new Task(1, 'wash the dishes'), new Task(2, 'complete To Do list project')]);

const listContainer = document.querySelector('ul');

function showList() {
  taskList.sortList();
  for (let item of taskList.list) {
    const li = document.createElement('li');
    li.innerHTML= `<input type="checkbox" id="check-${item.index}"><textarea>${item.description}</textarea><i class="fas fa-ellipsis-v"></i>`;
    listContainer.appendChild(li);
  }
}

showList();
