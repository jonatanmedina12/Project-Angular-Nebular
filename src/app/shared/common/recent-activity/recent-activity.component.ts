import { Component, Input } from '@angular/core';
import { GenericCardComponent } from "../../components/generic-card/generic-card.component";
import { GenericButtonComponent } from "../../components/generic-button/generic-button.component";
import { NbIconModule, NbListModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';
interface Activity {
  user: string;
  action: string;
  time: string;
  icon: string;
  color: string;
}
@Component({
  selector: 'app-recent-activity',
  imports: [GenericCardComponent, GenericButtonComponent,NbListModule,NbIconModule,CommonModule],
  templateUrl: './recent-activity.component.html',
  styleUrl: './recent-activity.component.scss'
})
export class RecentActivityComponent {
  @Input() activities: Activity[] = [];

}
