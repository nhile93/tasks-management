import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [LoadingComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule],
  exports: [LoadingComponent, HeaderComponent, FooterComponent],
})
export class ComponentsModule {}
