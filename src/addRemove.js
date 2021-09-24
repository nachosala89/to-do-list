import { Task, showTask } from './index.js';

export const addTask = (tasksList, addIn) => {
  if (addIn.value !== '') {
    let lastIndex = 0;
    if (tasksList.length > 0) {
      lastIndex = tasksList[tasksList.length - 1].index;
    }
    const description = addIn.value;
    const task = new Task(lastIndex + 1, description);
    tasksList.push(task);
    addIn.value = '';
    localStorage.setItem('tasks', JSON.stringify(tasksList));
    const listContainer = document.querySelector('ul');
    showTask(listContainer, tasksList, task, tasksList.length - 1);
  }
}

export const updateDescription = (tasksList, index, textIn) => {
  tasksList[index].description = textIn.value;
  localStorage.setItem('tasks', JSON.stringify(tasksList));
}