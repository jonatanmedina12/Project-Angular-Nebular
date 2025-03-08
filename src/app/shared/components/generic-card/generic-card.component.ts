import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NbCardModule } from '@nebular/theme';

@Component({
  selector: 'app-generic-card',
  imports: [NbCardModule,CommonModule],
  templateUrl: './generic-card.component.html',
  styleUrl: './generic-card.component.scss'
})
export class GenericCardComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() status: 'primary' | 'success' | 'info' | 'warning' | 'danger' = 'primary';
  @Input() accent: 'primary' | 'success' | 'info' | 'warning' | 'danger' | '' = '';
  @Input() size: 'tiny' | 'small' | 'medium' | 'large' | 'giant' = 'medium';
  @Input() hasFooter: boolean = false; 
  constructor() { }

  ngOnInit(): void { }
}
