import { Pipe, PipeTransform } from "@angular/core";
import { BackendService } from "../backend.service";
import { map, take } from "rxjs/operators";
import { Observable } from "rxjs";

@Pipe({ name: "userName" })
export class UserNamePipe implements PipeTransform {
  constructor(private backend: BackendService) {}

  transform(assigneeId: number): Observable<string> {
    return this.backend
      .user(assigneeId)
      .pipe(map((user) => user.name.toString()));
  }
}
