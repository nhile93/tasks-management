import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './tasks.component';
import { PipesModule } from '../pipes/pipes.module';
import { OverlayPanelModule } from "primeng/overlaypanel";
import { DetailComponent } from './detail/detail.component';
import { ComponentsModule } from '../components/components.module';
import { TagModule } from "primeng/tag";
import { ToastModule } from "primeng/toast";
import { MessageService } from 'primeng/api';
import { EditorComponent } from './editor/editor.component';
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputSwitchModule } from "primeng/inputswitch";
import { FilterService } from "primeng/api";

const routes: Routes = [
  { path: "", component: TasksComponent },
  { path: ":id", component: DetailComponent },
  { path: "edit/:id", component: EditorComponent}
];

@NgModule({
  declarations: [TasksComponent, DetailComponent, EditorComponent],
  imports: [
    CommonModule,
    PipesModule,
    OverlayPanelModule,
    ComponentsModule,
    TagModule,
    ToastModule,
    DialogModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    InputSwitchModule,
    RouterModule.forChild(routes),
  ],
  providers: [MessageService, FilterService],
})
export class TasksModule {}
