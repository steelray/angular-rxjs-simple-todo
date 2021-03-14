import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITask } from '../../core/interfaces/task.interface';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  @Input() tasks: ITask[];
  @Output() delete = new EventEmitter<number>();
  @Output() finish = new EventEmitter<number>();

  onDelete(taskId: number): void {
    this.delete.emit(taskId);
  }

  onFinish(taskId: number): void {
    this.finish.emit(taskId);
  }

  trackByFn(index: number, task: ITask): number {
    return task.id;
  }
}
