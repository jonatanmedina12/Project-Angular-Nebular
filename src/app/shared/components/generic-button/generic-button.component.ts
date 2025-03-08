import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NbButtonModule, NbIconModule, NbSpinnerModule } from '@nebular/theme';

@Component({
  selector: 'app-generic-button',
  imports: [NbIconModule,NbButtonModule,NbSpinnerModule,CommonModule],
  templateUrl: './generic-button.component.html',
  styleUrl: './generic-button.component.scss'
})
export class GenericButtonComponent {
  @Input() text: string = '';
  @Input() icon: string = '';
  @Input() status: 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'basic' | 'control' = 'primary';
  @Input() size: 'tiny' | 'small' | 'medium' | 'large' | 'giant' = 'medium';
  @Input() shape: 'rectangle' | 'round' | 'semi-round' = 'rectangle';
  @Input() appearance: 'filled' | 'outline' | 'ghost' | 'hero' = 'filled';
  @Input() fullWidth: boolean = false;
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  
  @Output() buttonClick: EventEmitter<any> = new EventEmitter<any>();
  
  onClick(event: any): void {
    this.buttonClick.emit(event);
  }
}
