import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ITask } from '../interfaces/task.interface';
import { tasksMock } from '../mock/tasks.mock';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly lsKey = '__tasks';
  private tasksList$ = new BehaviorSubject([]);
  tasks$: Observable<ITask[]>;
  constructor() {
    this.tasks$ = this.tasksList$.asObservable();
  }

  getTasks(): Observable<ITask[]> {
    let tasks = JSON.parse(localStorage.getItem(this.lsKey));
    if (!tasks) { // no saved tasks in storage, save and return mock
      tasks = tasksMock;
      this.saveTasksInStorage(tasks);
    }
    return of(tasks).pipe(
      tap(res => this.tasksList$.next(res))
    );
  }

  addTask(title: string, content: string): Observable<ITask> {
    const currentTasks = this.getCurrentTasks();
    const newTask: ITask = {
      title,
      content,
      done: false,
      id: this.generateNewId(currentTasks)
    };
    currentTasks.push(newTask);
    this.saveTasksInStorage(currentTasks);
    this.tasksList$.next(currentTasks);
    return of(newTask);
  }

  finishTask(taskId: number): Observable<boolean> {
    const currentTasks = this.getCurrentTasks();
    currentTasks.map(task => {
      if (task.id === taskId) {
        task.done = true;
      }
      return task;
    });
    this.saveTasksInStorage(currentTasks);
    return of(true);
  }

  deleteTask(taskId: number): Observable<boolean> {
    const currentTasks = this.getCurrentTasks().filter(task => task.id !== taskId);
    this.saveTasksInStorage(currentTasks);
    this.tasksList$.next(currentTasks);
    return of(true);
  }

  private saveTasksInStorage(tasks: ITask[]): void {
    localStorage.setItem(this.lsKey, JSON.stringify(tasks));
  }

  private getCurrentTasks(): ITask[] {
    return this.tasksList$.getValue();
  }

  private generateNewId(currentTasks: ITask[]): number {
    return currentTasks.length ? currentTasks[currentTasks.length - 1].id + 1 : 1;
  }
}
