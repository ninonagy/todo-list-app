import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatTableModule, MatSelectModule, MatCheckboxModule, MatSortModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule } from '@angular/material';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TasksComponent } from './tasks.component';
import { TaskDetailComponent } from './task-detail.component'

import { ModalAddTask, ModalEditTask, ModalDeleteTask } from './task.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSortModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  entryComponents: [
    ModalAddTask,
    ModalDeleteTask,
    ModalEditTask
  ],
  declarations: [
    AppComponent,
    TasksComponent,
    TaskDetailComponent,
    ModalAddTask,
    ModalDeleteTask,
    ModalEditTask
  ],
  bootstrap: [ AppComponent ],
  providers: []
})
export class AppModule {}
