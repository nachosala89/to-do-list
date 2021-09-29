import { listAddTask, listRemoveTask } from './src/listManager.js';
import Task from './src/taskClass.js';
import LocalStorageMock from './tests/localStorage.js';

global.localStorage = new LocalStorageMock();

test('Add item to empty list', () => {
  const tasksList = [];
  const expectedTask = new Task(1, 'Wash dishes');
  expect(listAddTask(tasksList, 'Wash dishes')).toStrictEqual([expectedTask]);
});

test('remove item from list', () => {
  const expectedTask = new Task(1, 'Wash dishes');
  const tasksList = [expectedTask];
  expect(listRemoveTask(tasksList, 'Wash dishes')).toStrictEqual([expectedTask]);
});