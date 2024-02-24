import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { filter } from 'rxjs/operators';
import { BackendService, Task } from 'src/app/backend.service';

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"],
})
export class DetailComponent implements OnInit, AfterViewChecked {
  taskData: Task;
  isLoading: boolean = true;
  taskId: number;

  constructor(
    private router: Router,
    private backend: BackendService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.taskId = parseInt(params["id"], 10);
    });
  }

  ngOnInit() {
    this.backend.task(this.taskId)
      .pipe(filter((data) => !!data))
      .subscribe((task: Task) => {
        this.taskData = task;
      });
  }

  ngAfterViewChecked() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  editTask(id: number) {
    this.router.navigate([`/tasks/edit/${id}`]);
  }
}
