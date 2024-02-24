import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: "footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goHome() {
    this.router.navigateByUrl("/").then(() => {
      this.router.navigate([this.router.url]);
    });
  }
}
