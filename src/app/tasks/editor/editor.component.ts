import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { filter } from 'rxjs/operators';
import { BackendService, Task, User } from 'src/app/backend.service';

@Component({
  selector: "app-editor",
  templateUrl: "./editor.component.html",
  styleUrls: ["./editor.component.scss"],
})
export class EditorComponent implements OnInit, AfterViewInit {
  taskId: number;
  editTaskForm: FormGroup;
  taskData: Task;
  users: User[];
  selectedUser: User;
  isLoading: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private backend: BackendService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.taskId = parseInt(params["id"], 10);
    });
    this.editTaskForm = this.formBuilder.group({
      taskDescription: ["", Validators.required],
      selectedUser: ["", Validators.required],
      status: [false, Validators.required],
    });
  }

  ngOnInit() {
    this.backend.users().subscribe((result) => {
      this.users = result;
    });

    this.backend.task(this.taskId).subscribe(
      (task: Task) => {
        if (task) {
          this.taskData = task;
          this.backend.user(task.assigneeId).subscribe((result) => {
            this.editTaskForm.patchValue({
              taskDescription: task.description,
              selectedUser: { id: result.id, name: result.name },
              status: task.completed,
            });
          });
        } else {
          this.messageService.add({
            key: "message",
            severity: "warn",
            detail: "Task was not found",
          });

          setTimeout(() => {
            this.router
              .navigateByUrl("/")
              .then(() => {
                this.router.navigate([this.router.url]);
              });
          }, 3000);
        }
      }
    );
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  editTask() {
    if (this.editTaskForm.valid) {
      this.isLoading = true;
      const updates = {
        description: this.editTaskForm.value.taskDescription,
        assigneeId: this.editTaskForm.value.selectedUser.id,
        completed: this.editTaskForm.value.status,
      };
      this.backend.update(this.taskId, updates).subscribe(() => {
        this.isLoading = false;
        this.messageService.add({
          key: "message",
          severity: "success",
          detail: "Task was updated successfully",
        });
      });
    }
  }
}
