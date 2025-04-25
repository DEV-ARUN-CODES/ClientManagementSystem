import { Component, OnInit } from '@angular/core';
import { ProjectService, Project } from './project.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CreateprojectComponent } from './createproject/createproject.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-projectinfo',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './projectinfo.component.html',
  styleUrls: ['./projectinfo.component.scss'],
  providers: [ProjectService]
})
export class ProjectinfoComponent implements OnInit {
  projects: Project[] = [];
  selectedProject: Project | null = null;

  constructor(
    private projectService: ProjectService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.projectService.getProjects().subscribe((data) => {
      this.projects = data;
      console.log(this.projects)
    });
  }

  openAddProjectDialog(): void {
    const dialogRef = this.dialog.open(CreateprojectComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getData();
      }
    });
  }

  deleteProject(id: number): void {
    if (confirm(`Are you sure you want to delete project ${id}?`)) {
      this.projectService.deleteProject(id).subscribe({
        next: () => {
          this.getData();
        },
        error: (err) => console.error('Delete failed:', err)
      });
    }
  }

  editProject(project: Project): void {
    this.selectedProject = { ...project };
  }

  updateProject(): void {
    if (this.selectedProject && this.selectedProject.project_id) {
      this.projectService.updateProject(this.selectedProject).subscribe({
        next: () => {
          this.getData();
          this.selectedProject = null;
        },
        error: (err) => console.error('Update failed:', err)
      });
    }
  }

  cancelEdit(): void {
    this.selectedProject = null;
  }
}
