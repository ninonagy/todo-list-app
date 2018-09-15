import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { TaskService, TaskData } from './task.service';

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tableColumns: string[] = ['id', 'ime', 'opis', 'kreiran', 'izaberi'];
  dataSource = new MatTableDataSource<TaskData>();
  selection = new SelectionModel<TaskData>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    var ref = this.taskService.getTasks();
    ref.snapshotChanges().subscribe(item => {
      // Called for every change in database
      this.taskService.tasksArray = [];
      
      item.forEach(task => {
        var item = task.payload.toJSON();
        item['$key'] = task.key;
        this.taskService.tasksArray.push(item as TaskData);
      });

      this.dataSource.data = this.taskService.tasksArray;

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });

    this.dataSource.filterPredicate = (data, filter) => (
      data.id.indexOf(filter) !== -1 ||
      data.ime.trim().toLowerCase().indexOf(filter) !== -1 ||
      data.opis.trim().toLowerCase().indexOf(filter) !== -1 ||
      ((new Date(data.kreiran).toLocaleDateString('hr')).replace(/\s/g, '') + ', ' + 
      new Date(data.kreiran).toLocaleTimeString('hr')).indexOf(filter) !== -1 
    );
  }

  openModalAddTask() {
    this.taskService.createTask();
  }

  openModalEditTask(task) {
    var showExternalLink = true; 
    this.taskService.updateTask(task, showExternalLink);
  }

  openModalDeleteTask() {
    const selectedTasks = this.selection.selected;
    this.taskService.deleteTasks(selectedTasks, () => {
      this.selection.clear();
    });
  }


  applyFilter(filterValue: string) {
    this.dataSource.paginator.firstPage();
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sortTasks(sort: MatSort) {
    this.dataSource.paginator.firstPage();

    const data = [].concat(this.dataSource.data); // Copy array

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === "asc";
      switch (sort.active) {
        case "id": return compare(a.id, b.id, isAsc);
        case "kreiran": return compare(new Date(a.kreiran).getMilliseconds(),
                        new Date(b.kreiran).getMilliseconds(), isAsc);
        default: return 0;
      }
    });
  }
}
