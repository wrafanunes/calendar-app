import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CalendarService } from '../../../app/services/calendar.service';
import { Appointment } from '../../appointment.model';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './appointment-form.html',
  styleUrls: ['./appointment-form.css']
})
export class AppointmentFormComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder, private calendarService: CalendarService) {

    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      date: [new Date(), Validators.required],
      startTime: ['11:00', Validators.required],
      durationMins: [60, [Validators.required, Validators.min(15)]]
    });

    // Exemplo usando valueChanges (RxJS)
    this.form.get('date')!.valueChanges.subscribe(v => {
      console.log('date changed', v);
    });
  }

  submit() {
    if (this.form.invalid) return;

    const raw = this.form.value;

    // Quebra HH:mm
    const [h, m] = raw.startTime.split(':').map((n: string) => parseInt(n, 10));

    const date = new Date(raw.date);

    const start = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      h,
      m
    );

    const end = new Date(start.getTime() + raw.durationMins * 60000);

    const appt: Appointment = {
      id: crypto.randomUUID(),     // 🔥 Sempre cria ID válido
      title: raw.title!,
      start,
      end
    };

    this.calendarService.add(appt);

    // Reset
    this.form.reset({
      title: '',
      date: new Date(),
      startTime: '11:00',
      durationMins: 60
    });
  }
}
