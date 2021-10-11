import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodosComponent } from './components/todos/todos.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, TodosComponent, LoginComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
