const markTask = (task, i) => {
  const text = document.querySelector(`.item-${i} textarea`);
  const checkbox = document.querySelector(`.item-${i} input`);
  if (task.completed) {
    text.classList.add('marked');
    checkbox.checked = true;
  } else {
    text.classList.remove('marked');
    checkbox.checked = false;
  }
};

export const markTasksList = (tasksList) => {
  tasksList.forEach((item, index) => {
    markTask(item, index);
  });
};

export const updateStatus = (tasksList, i) => {
  tasksList[i].completed = !tasksList[i].completed;
  localStorage.setItem('tasks', JSON.stringify(tasksList));
  markTask(tasksList[i], i);
};