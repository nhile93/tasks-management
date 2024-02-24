import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BackendService, Task, User } from '../backend.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.scss"],
})
export class TasksComponent implements OnInit, AfterViewInit {
  @ViewChild("searchInput") searchInput: ElementRef;
  tasks: Task[];
  users: User[];
  selectedUser: User;
  isLoading: boolean = true;
  displayDialog: boolean = false;
  addTaskForm: FormGroup;
  searchedTasks: Task[] = null;

  constructor(
    private router: Router,
    private backend: BackendService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.fetchData();
    this.addTaskForm = this.formBuilder.group({
      taskDescription: ["", Validators.required],
      selectedUser: ["", Validators.required],
    });
  }

  ngAfterViewInit() {
    this.handleLoading();
  }

  fetchData() {
    return this.backend.tasks().subscribe((result: Task[]) => {
      this.tasks = result;
    });
  }

  handleLoading() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  gotoDetail(item: Task) {
    this.router.navigate([`/tasks/${item.id}`]);
  }

  editTask(item: Task) {
    this.router.navigate([`/tasks/edit/${item.id}`]);
  }

  completeTask(item: Task) {
    this.isLoading = true;
    this.backend.complete(item.id, true).subscribe(async () => {
      await this.fetchData();
      this.messageService.add({
        key: "message",
        severity: "success",
        summary: "Message",
        detail: "Task was completed",
      });
    });
    this.handleLoading();
  }

  openDialog() {
    this.backend.users().subscribe((result) => {
      if (result) {
        this.users = result;
        this.displayDialog = true;
      }
    });
  }

  cancelAdd() {
    this.displayDialog = false;
    this.addTaskForm.reset();
  }

  addNewTask() {
    if (this.addTaskForm.valid) {
      this.isLoading = true;
      const formData = {
        description: this.addTaskForm.value.taskDescription,
        assigneeId: this.addTaskForm.value.selectedUser.id,
      };

      this.backend.newTask(formData).subscribe(
        async () => {
          this.displayDialog = false;
          this.searchedTasks = null;
          await this.fetchData();
          this.handleLoading();
          this.messageService.add({
            key: "message",
            severity: "success",
            detail: "New task was added successfully",
          });
        },
        (error) => {
          this.messageService.add({
            key: "message",
            severity: "error",
            detail: error,
          });
        }
      );
      this.handleLoading();
    }
  }

  validateInput = (event: KeyboardEvent) => {
    const { charCode } = event;
    const inputChar = String.fromCharCode(charCode);
    const inputValue = (event.target as HTMLInputElement).value + inputChar;

    if (!/^\d{0,1}$/.test(inputValue)) {
      event.preventDefault();
    }
  };

  search() {
    const id = parseInt(this.searchInput.nativeElement.value, 10);
    if (id !=undefined && !Number.isNaN(id)) {
      this.searchedTasks = this.tasks.filter((task) => task.id === id);
    } else {
      this.searchedTasks = null;
    }
  }
}
