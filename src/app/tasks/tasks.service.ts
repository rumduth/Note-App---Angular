import { Injectable } from '@angular/core';
import { dummyTasks } from '../dummy-tasks';
import { NewTask } from '../models/new-task.model';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks: Task[];
  constructor() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) this.tasks = JSON.parse(tasks);
    else this.tasks = [];
  }
  getUserTasks(userId: string) {
    return this.tasks.filter((task) => task.userId === userId);
  }

  addTask(task: NewTask, userId: string) {
    this.tasks.unshift({ ...task, userId: userId });
    this.saveTasks();
  }

  removeTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
