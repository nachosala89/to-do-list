import { Task, showTask, showList } from './index.js';

export const addTask = (tasksList, addIn) => {
  if (addIn.value !== '') {
    const description = addIn.value;
    const task = new Task(tasksList.length, description);
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

const updateIndexes = (tasksList) => {
  tasksList.forEach((task, index) => { task.index = index; });
  const liSet = document.querySelectorAll('.task-item');
  liSet.forEach((li) => { li.remove(); });
  showList(tasksList);
}

export const removeTask = (tasksList, index) => {
  const li = document.querySelector(`#item-${index}`);
  li.remove();
  tasksList.splice(index, 1);
  updateIndexes(tasksList);
  console.log(tasksList);
  localStorage.setItem('tasks', JSON.stringify(tasksList));
}

export const removeMarked = (tasksList) => {
  let i = 0;
  while (i < tasksList.length) {
    console.log(tasksList[i].completed);
    if (tasksList[i].completed) {
      removeTask(tasksList, i);
    } else {
      i += 1;
    }
  }
}