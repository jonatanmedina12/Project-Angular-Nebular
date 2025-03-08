import { Component, Input } from '@angular/core';
import { NbSpinnerModule } from '@nebular/theme';

@Component({
  selector: 'app-loading-indicator',
  imports: [NbSpinnerModule],
  templateUrl: './loading-indicator.component.html',
  styleUrl: './loading-indicator.component.scss'
})
export class LoadingIndicatorComponent {
  @Input() size: 'tiny' | 'small' | 'medium' | 'large' | 'giant' = 'medium';
  @Input() status: 'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger' = 'primary';
  @Input() message: string = 'Cargando...';
  @Input() fullPage: boolean = false;
}
