import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TaskService, TaskData }  from './task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: 'task-detail.component.html',
  styleUrls: ['task-detail.component.css']
})
export class TaskDetailComponent implements OnInit{
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private location: Location
  ) {}

  task = new TaskData();

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    var ref = this.taskService.getTasks();
    ref.snapshotChanges().subscribe(tasks => {
      // Called for every change in database  
      tasks.forEach(task => {
        var item = task.payload.toJSON();
        if(item['id'] === id) {
          item['$key'] = task.key;
          this.task = item as TaskData;
        }
      });
    });
  }

  onEditClick() {
    this.taskService.updateTask(this.task, false);
  }

  onDeleteClick() {
    this.taskService.deleteTask(this.task, () => {
      this.location.back();
    })
  }
}