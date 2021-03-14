import { ITask } from '../interfaces/task.interface';

export const tasksMock: ITask[] = [
  {
    id: 0,
    title: 'item 1',
    content: 'Some content from list',
    done: true,
  },
  {
    id: 1,
    title: 'item 2',
    content: 'Some content from list 2',
    done: true,
  },
  {
    id: 2,
    title: 'item 3',
    content: 'Some content from list 3',
    done: false,
  }
];
