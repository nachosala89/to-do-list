import Task from './taskClass.js';

export const listAddTask = (tasksList, description) => {
  const task = new Task(tasksList.length, description);
  tasksList.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasksList));
};

export const listUpdateIndexes = (tasksList) => {
  tasksList.forEach((task, index) => { task.index = index; });
  localStorage.setItem('tasks', JSON.stringify(tasksList));
};

export const updateDescription = (tasksList, index, textIn) => {
  tasksList[index].description = textIn.value;
  localStorage.setItem('tasks', JSON.stringify(tasksList));
};

export const listRemoveTask = (tasksList, index) => {
  tasksList.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasksList));
};