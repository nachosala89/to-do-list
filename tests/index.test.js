import { JSDOM } from 'jsdom';
import { listAddTask, listRemoveTask } from '../src/listManager.js';
import Task from '../src/taskClass.js';
import LocalStorageMock from './localStorage.js';
import { updateStatus } from '../src/updateStatus.js';

global.localStorage = new LocalStorageMock();

const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;

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

describe('Update items from list', () => {
  test('Mark Item as completed', () => {

    const tasksList = [new Task(0, 'Wash dishes'), new Task(1, 'Learn Jest')];

    document.body.innerHTML =
    '<ul>' +
      `<li class="task-item item-0"><input type="checkbox"><textarea>${tasksList[0].description}</textarea></li>` +
      `<li class="task-item item-1"><input type="checkbox"><textarea>${tasksList[1].description}</textarea></li>` +
    '</ul>';
    updateStatus(tasksList, 0);
    expect(tasksList[0].completed).toBe(true);
  });  
});