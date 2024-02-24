import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BackendService} from './backend.service';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ComponentsModule } from './components/components.module';

const routes: Routes = [
  { path: "", redirectTo: "tasks", pathMatch: "full" },
  {
    path: "tasks",
    loadChildren: () =>
      import("./tasks/tasks.module").then((m) => m.TasksModule),
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ComponentsModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  providers: [BackendService],
  bootstrap: [AppComponent],
})
export class AppModule {}
