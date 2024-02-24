import { Component, Input } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  selector: "header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  @Input() title: string = "Header";
  @Input() backButton?: boolean = false;

  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
