import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Calendar } from './components/calendar/calendar';


const routes: Routes = [
    { path: '', component: Calendar }
];


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DragDropModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,   // <--- NECESSÁRIO
    MatCardModule,
    RouterModule.forChild(routes)
  ]
})
export class CalendarModule { }