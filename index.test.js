import { listAddTask } from './src/listManager.js';
import Task from './src/taskClass.js';
import LocalStorageMock from './tests/localStorage.js';

global.localStorage = new LocalStorageMock();

test('Add item to empty list', () => {
  const tasksList = [];
  const expectedTask = new Task(1, 'Wash dishes');
  expect(listAddTask(tasksList, 'Wash dishes')).toStrictEqual([expectedTask]);
});