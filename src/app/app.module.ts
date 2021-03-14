import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskAddDialogComponent } from './components/task-add-dialog/task-add-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskAddDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
