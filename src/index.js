import './style.css';
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';
import '@fortawesome/fontawesome-free/js/brands.js';
import { updateStatus, markTasksList } from './updateStatus.js';

class Task {
  constructor(index, description) {
    this.index = index;
    this.description = description;
    this.completed = false;
  }
}

const sortList = (tasksList) => tasksList.sort((a, b) => a.index - b.index);

const listContainer = document.querySelector('ul');

const showList = (tasksList) => {
  tasksList = sortList(tasksList);
  tasksList.forEach((item, index) => {
    const li = document.createElement('li');
    li.setAttribute('id', `item-${index}`);
    li.innerHTML = `<input type="checkbox"><textarea>${item.description}</textarea><i class="fas fa-ellipsis-v"></i>`;
    listContainer.appendChild(li);
  });
};

let tasksList = [];
let checkboxes;

window.addEventListener('load', () => {
  const storedList = JSON.parse(localStorage.getItem('tasks'));
  if (storedList !== null) {
    tasksList = [...storedList];
  } else {
    tasksList = [new Task(1, 'wash the dishes'), new Task(2, 'complete To Do list project')];
  }
  showList(tasksList);
  checkboxes = document.querySelectorAll('[type="checkbox"]');
  for (let i = 0; i < checkboxes.length; i += 1) {
    checkboxes[i].addEventListener('change', () => { updateStatus(tasksList, i) });
  }
  markTasksList(tasksList);
});