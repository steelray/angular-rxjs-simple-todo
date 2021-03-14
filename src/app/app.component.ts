import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { ITask } from './core/interfaces/task.interface';
import { TaskService } from './core/services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  addDialogIsActive = false;
  allTasks: ITask[];
  filteredTasks: ITask[];
  searchControl = new FormControl();
  private destroy$ = new Subject();

  constructor(
    private taskService: TaskService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.taskService.getTasks().pipe(
      switchMap(() => this.taskService.tasks$)
    ).subscribe(tasks => {
      this.allTasks = tasks;
      this.filteredTasks = this.filterTasks(this.searchControl.value);
      this.cdRef.detectChanges();
    });

    this.searchControl.valueChanges.pipe(
      debounceTime(200),
      takeUntil(this.destroy$)
    ).subscribe(value => this.filteredTasks = this.filterTasks(value));
  }

  onDelete(taskId: number): void {
    if (window.confirm('Do you realy want to delete this task?')) {
      this.taskService.deleteTask(taskId);
    }
  }

  onFinish(taskId: number): void {
    this.taskService.finishTask(taskId);
  }

  onAdd(): void {
    this.addDialogIsActive = true;
  }

  addNewTask(newTask: ITask): void {
    this.taskService.addTask(newTask.title, newTask.content).pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      this.addDialogIsActive = false;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  private filterTasks(searchString = ''): ITask[] {
    if (!searchString) {
      return this.allTasks;
    }
    return this.allTasks.filter(task => task.title.includes(searchString) || task.content.includes(searchString));
  }

}
