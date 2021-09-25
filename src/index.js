import './style.css';
import { markTasksList } from './updateStatus.js';
import { showList, addTask, removeMarked } from './showItems.js';

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