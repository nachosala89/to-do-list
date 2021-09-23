import './style.css';
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';
import '@fortawesome/fontawesome-free/js/brands.js';

class Task {
  constructor(index, description) {
    this.index = index;
    this.description = description;
    this.completed = false;
  }
}

const sortList = (tasksList) => tasksList.sort((a, b) => a.index - b.index);

let tasksList = [new Task(1, 'wash the dishes'), new Task(2, 'complete To Do list project')];

const listContainer = document.querySelector('ul');

const showList = () => {
  tasksList = sortList(tasksList);
  tasksList.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `<input type="checkbox" id="check-${item.index}"><textarea>${item.description}</textarea><i class="fas fa-ellipsis-v"></i>`;
    listContainer.appendChild(li);
  });
};

showList();
