import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTask } from '../../models/new-task.model';
import { TasksService } from '../tasks.service';
@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @Input({ required: true }) userId!: string;
  @Output() cancel = new EventEmitter<void>();
  @Output() add = new EventEmitter<NewTask>();
  constructor(private tasksService: TasksService) {}
  enteredTitle = '';
  enteredSummary = '';
  enteredDate = '';
  onCancelAddTask() {
    this.cancel.emit();
  }
  onSubmit() {
    if (!this.enteredDate || !this.enteredSummary || !this.enteredDate) return;

    this.tasksService.addTask(
      {
        title: this.enteredTitle,
        summary: this.enteredSummary,
        dueDate: this.enteredDate,
        id: new Date().toISOString(),
      },
      this.userId
    );
    this.cancel.emit();
  }
}
