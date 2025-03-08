import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbIconModule } from '@nebular/theme';
type StatusType = 'primary' | 'success' | 'info' | 'warning' | 'danger';
type TrendType = 'up' | 'down' | 'stable';
@Component({
  selector: 'app-statistics-card',
  imports: [NbCardModule,NbCardModule,NbIconModule,FormsModule,CommonModule],
  templateUrl: './statistics-card.component.html',
  styleUrl: './statistics-card.component.scss'
})
export class StatisticsCardComponent {


  @Input() title: string = '';
  @Input() value: string | number = '';
  @Input() icon: string = '';
  @Input() status: StatusType = 'primary';
  @Input() trend: TrendType = 'stable';
  @Input() percentage: number = 0;
  
  /**
   * Returns the appropriate icon name based on the trend direction
   * @returns Icon name for the current trend
   */
  getTrendIcon(): string {
    switch (this.trend) {
      case 'up': return 'trending-up-outline';
      case 'down': return 'trending-down-outline';
      default: return 'minus-outline';
    }
  }
  
  /**
   * Returns the CSS class name for styling based on trend direction
   * @returns CSS class for the current trend
   */
  getTrendClass(): string {
    switch (this.trend) {
      case 'up': return 'trend-up';
      case 'down': return 'trend-down';
      default: return 'trend-stable';
    }
  }
  constructor() { }
}
