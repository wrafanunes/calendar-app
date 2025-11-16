import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Appointment } from '../../calendar/appointment.model';


@Injectable({ providedIn: 'root' })
export class CalendarService {
    private _appointments = new BehaviorSubject<Appointment[]>([]);
    appointments$: Observable<Appointment[]> = this._appointments.asObservable();


    constructor() {
        // seed with a sample appointment
        const now = new Date();
        const sample: Appointment = {
            id: this._id(),
            title: 'Sample Meeting',
            start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 30),
            end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 30)
        };
        this._appointments.next([sample]);
    }


    private _id(): string {
        return Math.random().toString(36).slice(2, 9);
    }


    add(appt: Appointment) {
        const current = this._appointments.getValue();
        appt.id = appt.id || this._id();
        this._appointments.next([...current, appt]);
    }


    update(appt: Appointment) {
        const current = this._appointments.getValue().map(a => a.id === appt.id ? appt : a);
        this._appointments.next(current);
    }


    remove(id: string) {
        const current = this._appointments.getValue().filter(a => a.id !== id);
        this._appointments.next(current);
    }
}