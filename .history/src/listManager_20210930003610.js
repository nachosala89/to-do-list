import Task from './taskClass.js';

export const listAddTask = (tasksList, description) => {
  const task = new Task(tasksList.length + 1, description);
  tasksList.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasksList));
  return tasksList;
};

export const listUpdateIndexes = (tasksList) => {
  let i = 1;
  for (let j = 0; j < tasksList.length; j += 1) {
    if (!tasksList[j].deleted) {
      tasksList[j].index = i;
      i += 1;
    } else {
      tasksList[j].index = 0;
    }
  }
  localStorage.setItem('tasks', JSON.stringify(tasksList));
};

export const updateDescription = (tasksList, index, textIn) => {
  tasksList[index].description = textIn.value;
  localStorage.setItem('tasks', JSON.stringify(tasksList));
};

export const listRemoveTask = (tasksList, index) => {
  
  tasksList[index].deleted = true;
  console.log(tasksList);
  localStorage.setItem('tasks', JSON.stringify(tasksList));
};

export const cleanList = (oldList) => oldList.filter((task) => !task.deleted);