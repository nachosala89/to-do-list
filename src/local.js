// eslint-disable-next-line import/prefer-default-export
export function localStorage(tasksList) {
  localStorage.setItem('tasks', JSON.stringify(tasksList));
}