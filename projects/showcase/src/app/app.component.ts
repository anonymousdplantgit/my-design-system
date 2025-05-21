import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ShowcaseComponent} from './showcase/showcase.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ShowcaseComponent,
    ShowcaseComponent
  ],
  template: `
    <app-showcase></app-showcase>
  `
})
export class AppComponent {}
