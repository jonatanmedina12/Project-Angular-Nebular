import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NbAlertModule, NbComponentStatus, NbIconModule } from '@nebular/theme';

@Component({
  selector: 'app-generic-alert',
  imports: [NbAlertModule,NbIconModule],
  templateUrl: './generic-alert.component.html',
  styleUrl: './generic-alert.component.scss'
})
export class GenericAlertComponent {
  @Input() message: string = '';
  @Input() status: NbComponentStatus = 'basic';
  @Input() icon: string = '';
  @Input() closable: boolean = false;
  
  // These properties need to be NbComponentStatus or empty string, not boolean
  @Input() outline: NbComponentStatus | '' = '';
  @Input() accent: NbComponentStatus | '' = '';
  
  @Input() size: 'tiny' | 'small' | 'medium' | 'large' | 'giant' = 'medium';
  
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  
  onClose(): void {
    this.close.emit();
  }
}
