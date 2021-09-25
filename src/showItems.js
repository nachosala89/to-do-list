import { updateStatus } from './updateStatus.js';
import {
  listAddTask, updateDescription, listUpdateIndexes, listRemoveTask,
} from './listManager.js';

export const removeTask = (tasksList, index) => {
  const li = document.querySelector(`.item-${index}`);
  li.remove();
  listRemoveTask(tasksList, index);
  listUpdateIndexes(tasksList);
};

export const setTaskListeners = (tasksList, index) => {
  const text = document.querySelector(`.item-${index} textarea`);

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

  const check = document.querySelector(`.item-${index} input`);
  check.addEventListener('change', () => { updateStatus(tasksList, index); });

  const rmBtn = document.querySelector(`.item-${index} i`);
  rmBtn.addEventListener('click', () => { removeTask(tasksList, index); });
};

export const showTask = (container, tasksList, index) => {
  const li = document.createElement('li');
  li.classList.add('task-item', `item-${index}`);
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  li.appendChild(checkbox);
  const text = document.createElement('textarea');
  text.textContent = tasksList[index].description;
  li.appendChild(text);
  const icon = document.createElement('i');
  icon.classList.add('fas', 'fa-ellipsis-v');
  li.appendChild(icon);
  container.appendChild(li);
  setTaskListeners(tasksList, index);
};

export const showList = (tasksList) => {
  const listContainer = document.querySelector('ul');
  tasksList.forEach((item, index) => {
    showTask(listContainer, tasksList, index);
  });
};

export const removeMarked = (tasksList) => {
  tasksList.forEach((task, index) => {
    if (task.completed && !task.deleted) {
      removeTask(tasksList, index);
    }
  });
};

export const addTask = (tasksList, addIn) => {
  if (addIn.value !== '') {
    const description = addIn.value;
    listAddTask(tasksList, description);
    addIn.value = '';
    const listContainer = document.querySelector('ul');
    showTask(listContainer, tasksList, tasksList.length - 1);
  }
};
