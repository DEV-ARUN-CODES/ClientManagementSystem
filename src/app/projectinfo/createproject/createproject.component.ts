import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-createproject',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.scss']
})
export class CreateprojectComponent {
  @Output() projectSaved = new EventEmitter<void>();
  successMessage = '';

  project = {
    project_id: 0,
    project_name: '',
    duration: '',
    start_date: '',
    end_date: '',
    status: ''
  };

  constructor(
    public dialogRef: MatDialogRef<CreateprojectComponent>,
    private http: HttpClient, private projectService: ProjectService
  ) { }


  calculateDuration(): void {
    if (this.project.start_date && this.project.end_date) {
      const start = new Date(this.project.start_date);
      const end = new Date(this.project.end_date);
      const timeDiff = end.getTime() - start.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      if (daysDiff >= 30) {
        const months = Math.floor(daysDiff / 30);
        const remainingDays = daysDiff % 30;
        this.project.duration = remainingDays > 0 ? `${months} months ${remainingDays} days` : `${months} months`;
      } else {
        this.project.duration = `${daysDiff} days`;
      }
    }
  }


  saveProject(): void {
    this.projectService.getProjects().subscribe((projects) => {
      const lastProject = projects[projects.length - 1];
      this.project.project_id = lastProject.project_id ? lastProject.project_id + 1 : 1;

      this.projectService.addProject(this.project).subscribe(() => {
        this.dialogRef.close(this.project);
      });
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
