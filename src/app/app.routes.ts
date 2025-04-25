import { Routes } from '@angular/router';
import { ClientinfoComponent } from './clientinfo/clientinfo.component';
import { ClientMeetingsInfoComponent } from './clientmeetingsinfo/clientmeetingsinfo.component';
import { ProjectinfoComponent } from './projectinfo/projectinfo.component';

export const routes: Routes = [
    { path: '', redirectTo: 'projectinfo', pathMatch: 'full' },
    { path: 'projectinfo', component: ProjectinfoComponent },
    { path: 'clientsinfo', component: ClientinfoComponent },
    { path: 'clientsmeetinginfo', component: ClientMeetingsInfoComponent },

];
