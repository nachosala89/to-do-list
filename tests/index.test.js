import { listAddTask, listRemoveTask } from '../src/listManager.js';
import Task from '../src/taskClass.js';
import LocalStorageMock from './localStorage.js';

global.localStorage = new LocalStorageMock();

describe('Add items', () => {
  test('Add item to empty list', () => {
    const tasksList = [];
    const expectedTask = new Task(1, 'Wash dishes');
    expect(listAddTask(tasksList, 'Wash dishes')).toStrictEqual([expectedTask]);
  });
});

describe('Remove items', () => {
  test('remove item from list', () => {
    const expectedTask = new Task(1, 'Wash dishes');
    const tasksList = [expectedTask];
    expect(listRemoveTask(tasksList, 0)).toStrictEqual([expectedTask]);
  });
});