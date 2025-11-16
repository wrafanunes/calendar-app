import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../../appointment.model';
import { CalendarService } from '../../../app/services/calendar.service';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { AppointmentFormComponent } from '../appointment-form/appointment-form';


@Component({
  selector: 'app-calendar',
  imports: [
    MatIconModule,
    MatButtonModule,
    DatePipe,
    DragDropModule,
    AppointmentFormComponent,
    MatCard,
    CommonModule
  ],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class Calendar implements OnInit {
  appointments: Observable<Appointment[]>;
  days: Date[] = [];
  appts: Appointment[] = [];
  hours = Array.from({ length: 18 }, (_, i) => i + 6);  // 6 até 23
  constructor(private calendarService: CalendarService) {
    this.appointments = this.calendarService.appointments$;
    const start = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
      this.days.push(d);
    }
  }
  ngOnInit(): void {

  }

  drop(event: CdkDragDrop<Appointment[]>, day: Date) {
    // event.item.data contains appointment; we'll clone and update date
    const appt: Appointment = JSON.parse(JSON.stringify(event.item.data));
    // compute same start time but new day
    const oldStart = new Date(appt.start);
    const duration = new Date(appt.end).getTime() - new Date(appt.start).getTime();
    appt.start = new Date(day.getFullYear(), day.getMonth(), day.getDate(), oldStart.getHours(), oldStart.getMinutes());
    appt.end = new Date(appt.start.getTime() + duration);


    this.calendarService.update(appt);
  }


  delete(id: string) {
    this.calendarService.remove(id);
  }

  formatDateOnly(d: Date): string {
    const date = new Date(d);
    return date.getFullYear().toString() +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      date.getDate().toString().padStart(2, '0');
  }

  getAppointmentsForDay(day: Date) {
    return this.appts.filter(a =>
      this.formatDateOnly(a.start) === this.formatDateOnly(day)
    );
  }
}


