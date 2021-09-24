import './style.css';
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';
import '@fortawesome/fontawesome-free/js/brands.js';
import { updateStatus, markTasksList } from './updateStatus.js';
import { addTask, updateDescription } from './addRemove.js';


export class Task {
  constructor(index, description) {
    this.index = index;
    this.description = description;
    this.completed = false;
  }
}

const sortList = (tasksList) => tasksList.sort((a, b) => a.index - b.index);

const listContainer = document.querySelector('ul');

export const showTask = (container, tasksList, item, index) => {
  const li = document.createElement('li');
  li.setAttribute('id', `item-${index}`);
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('id', `check-${index}`);
  li.appendChild(checkbox);
  const text = document.createElement('textarea');
  text.textContent = item.description;
  li.appendChild(text);
  li.innerHTML += '<i class="fas fa-ellipsis-v"></i>';
  container.appendChild(li);
  const check = document.querySelector(`#check-${index}`); 
  check.addEventListener('change', () => { updateStatus(tasksList, index); });
}

const showList = (tasksList) => {
  tasksList = sortList(tasksList);
  tasksList.forEach((item, index) => {
    showTask(listContainer, tasksList, item, index);
  });
};

let tasksList = [];

const pageLoaded = new Promise((resolve) => {
  window.addEventListener('load', () => {
    const storedList = JSON.parse(localStorage.getItem('tasks'));
    if (storedList !== null) {
      tasksList = [...storedList];
    } else {
      tasksList = [new Task(1, 'wash the dishes'), new Task(2, 'complete To Do list project')];
    }
    showList(tasksList);
    markTasksList(tasksList);
    resolve(1);
  });
});

pageLoaded.then(() => {
  const addIn = document.querySelector('#add-task input');
  addIn.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTask(tasksList, addIn);
    }
  });

  const addBtn = document.querySelector('.enter-icon');
  addBtn.addEventListener('click', () => { addTask(tasksList, addIn); });

  let textIns = document.querySelectorAll('textarea');
  textIns.forEach((item, index) => {
    item.addEventListener('change', () => { updateDescription(tasksList, index, item); });
    item.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        updateDescription(tasksList, index, item);
      }
    });
  });
});