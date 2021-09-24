import './style.css';
import { updateStatus, markTasksList } from './updateStatus.js';
import { addTask, updateDescription, removeTask, removeMarked } from './addRemove.js';


export class Task {
  constructor(index, description) {
    this.index = index;
    this.description = description;
    this.completed = false;
  }
}

const listContainer = document.querySelector('ul');

export const setTaskListeners = (tasksList, index) => {
  let text = document.querySelector(`#item-${index} textarea`);

  text.addEventListener('change', () => {
    updateDescription(tasksList, index, text); 
  });

  text.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      updateDescription(tasksList, index, text);
      document.activeElement.blur();
    }
  });
  text.addEventListener('focus', () => {
    const icon = text.nextElementSibling;
    icon.classList.remove('fa-ellipsis-v');
    icon.classList.add('fa-trash-alt');
  });

  text.addEventListener('blur', () => {
    const icon = text.nextElementSibling;
    icon.classList.add('fa-ellipsis-v');
    icon.classList.remove('fa-trash-alt');
  });

  const check = document.querySelector(`#item-${index} input`); 
  check.addEventListener('change', () => { updateStatus(tasksList, index); });
  const rmBtn = document.querySelector(`#item-${index} i`);
  rmBtn.addEventListener('click', () => { removeTask(tasksList, index); });
}

export const showTask = (container, tasksList, item, index) => {
  const li = document.createElement('li');
  li.setAttribute('id', `item-${index}`);
  li.classList.add('task-item');
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  li.appendChild(checkbox);
  const text = document.createElement('textarea');
  text.textContent = item.description;
  li.appendChild(text);
  const icon = document.createElement('i');
  icon.classList.add('fas', 'fa-ellipsis-v');
  li.appendChild(icon);
  container.appendChild(li);
  setTaskListeners(tasksList, index);
}

export const showList = (tasksList) => {
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

  const clearBtn = document.querySelector('#clear button');
  clearBtn.addEventListener('click', () => { removeMarked(tasksList); });
});