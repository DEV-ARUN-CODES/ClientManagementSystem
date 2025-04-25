import { Component, OnInit } from '@angular/core';
import { ClientService } from './client.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CreateclientComponent } from './createclient/createclient.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-clientinfo',
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './clientinfo.component.html',
  styleUrls: ['./clientinfo.component.scss'],
  standalone: true
})
export class ClientinfoComponent implements OnInit {
  clients: any[] = [];
  selectedClient: any = null;

  constructor(private clientService: ClientService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getClients();

  }

  getClients(): void {
    this.clientService.getClients().subscribe((data) => {
      this.clients = data;
      console.log("Clients data:", this.clients);
    });
  }

  openAddClientDialog(): void {
    const dialogRef = this.dialog.open(CreateclientComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getClients();
      }
    });
  }

  addClient(client: any): void {
    this.clientService.addClient(client).subscribe(() => {
      this.getClients();
      this.dialog.closeAll();
      this.snackBar.open('Client added successfully!', 'Close', { duration: 3000 });
    }, (error) => {
      this.snackBar.open('Failed to add client. Try again!', 'Close', { duration: 3000 });
    });
  }

  editClient(client: any): void {
    this.selectedClient = { ...client };
  }

  updateClient(): void {
    if (this.selectedClient && this.selectedClient.client_id) {
      this.clientService.updateClient(this.selectedClient.client_id, this.selectedClient)
        .subscribe({
          next: () => {
            this.clients = this.clients.map(client =>
              client.id === this.selectedClient.client_id ? this.selectedClient : client
            );
            this.selectedClient = null;
            this.dialog.closeAll();
            this.snackBar.open('Client updated successfully!', 'Close', { duration: 3000 });
            this.getClients();

          },
          error: (err) => {
            this.snackBar.open('Update failed. Try again!', 'Close', { duration: 3000 });
            console.error("Update failed:", err);
          }
        });
    } else {
      console.error("Client ID is missing!");
    }
  }

  deleteClient(id: number): void {
    if (confirm(`Are you sure you want to delete client ${id}?`)) {
      console.log(id)
      this.clientService.deleteClient(id).subscribe({
        next: () => {
          this.getClients();
        },
        error: (err) => {
          console.error("Failed to delete client:", err);
          alert('Failed to delete client. Try again!');
        }
      });
    }
  }


  cancelEdit(): void {
    this.selectedClient = null;
  }
}
