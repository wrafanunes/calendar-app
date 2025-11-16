import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'calendar',
        pathMatch: 'full'
    },
    {
        path: '',
        loadChildren: () =>
            import('./calendar.routes')
                .then(m => m.CALENDAR_ROUTES)
    }
];
