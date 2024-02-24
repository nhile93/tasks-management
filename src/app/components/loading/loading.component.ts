import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <div *ngIf="isLoading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
  `,
  styles: [
    `
      .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 1);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
      }
      .loading-spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-left: 4px solid #3498db;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class LoadingComponent {
  @Input() isLoading: boolean = false;
}
