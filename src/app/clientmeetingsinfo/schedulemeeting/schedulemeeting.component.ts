import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ClientService } from '../../clientinfo/client.service';

@Component({
  selector: 'app-schedulemeeting',
  imports: [FormsModule, CommonModule],
  templateUrl: './schedulemeeting.component.html',
  styleUrl: './schedulemeeting.component.scss'
})
export class SchedulemeetingComponent {
  newMeeting = {
    meeting_id: null,
    meeting_agenda: '',
    meeting_date: '',
    meeting_time: '',
    client_id: null
  };
  clients: any[] = [];
  constructor(public dialogRef: MatDialogRef<SchedulemeetingComponent>,
    private http: HttpClient, private clientService: ClientService) { }

  ngOnInit(): void {

    this.fetchClients();
  }
  fetchClients(): void {
    this.clientService.getClients().subscribe({
      next: (data) => {
        this.clients = data;
        console.log("Loaded clients for dropdown:", this.clients);
      },
      error: (err) => {
        console.error("Failed to load clients", err);
      }
    });
  }
  closeDialog(): void {
    this.dialogRef.close()
  }

}
