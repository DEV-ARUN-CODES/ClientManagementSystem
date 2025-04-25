import { Component, OnInit } from '@angular/core';
import { ClientService, Client } from '../client.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from '../../projectinfo/project.service';

@Component({
  selector: 'app-createclient',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './createclient.component.html',
  styleUrls: ['./createclient.component.scss']
})
export class CreateclientComponent implements OnInit {
  projects: any[] = [];

  client = {
    client_id: 0,
    client_name: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    status: 'Active',
    project_id: 0
  };

  constructor(
    private clientService: ClientService,
    private dialogRef: MatDialogRef<CreateclientComponent>,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe((data: any[]) => {
      this.projects = data;
    });
  }



  saveClient(): void {
    this.clientService.getClients().subscribe((clients: Client[]) => {
      const lastClient = clients[clients.length - 1];
      this.client.client_id = lastClient?.client_id ? lastClient.client_id + 1 : 1;


      this.clientService.addClient(this.client).subscribe(
        () => this.dialogRef.close(true),
        (error) => {
          console.error('Error saving client', error);
          alert('Failed to save client');
        }
      );
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

}
