import { Component, OnInit } from '@angular/core';
import { Meeting, MeetingService } from './meeting.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SchedulemeetingComponent } from './schedulemeeting/schedulemeeting.component';

@Component({
  selector: 'app-clientmeetingsinfo',
  templateUrl: './clientmeetingsinfo.component.html',
  styleUrls: ['./clientmeetingsinfo.component.scss'],
  imports: [FormsModule, CommonModule],
})
export class ClientMeetingsInfoComponent implements OnInit {
  meetings: Meeting[] = [];
  showMeetingForm = false;
  selectedMeeting: Meeting | null = null;

  newMeeting = {
    meeting_id: null,
    meeting_agenda: '',
    meeting_date: '',
    meeting_time: '',
    client_id: null
  };

  constructor(private meetingService: MeetingService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getMeetings();
  }

  getMeetings(): void {
    this.meetingService.getMeetings().subscribe((data) => {
      this.meetings = data;
    });
  }
  editMeeting(meeting: Meeting) {
    this.selectedMeeting = { ...meeting };

  }

  toggleMeetingForm(): void {
    // this.showMeetingForm = !this.showMeetingForm;
    // this.resetForm();
    const dialogRef = this.dialog.open(SchedulemeetingComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getMeetings();
      }
    });
  }

  addMeeting(): void {
    if (this.newMeeting.meeting_agenda && this.newMeeting.meeting_date && this.newMeeting.meeting_time && this.newMeeting.client_id) {
      this.meetingService.addMeeting(this.newMeeting).subscribe(() => {
        this.getMeetings();
        this.toggleMeetingForm();
      });
    }
  }

  deleteMeeting(id: number): void {
    if (confirm(`Are you sure you want to delete meeting ${id}?`)) {
      this.meetingService.deleteMeeting(id).subscribe(() => {
        this.getMeetings();
      });
    }
  }

  // resetForm(): void {
  //   this.newMeeting = {
  //     meetingAgenda: '',
  //     meetingDate: '',
  //     meetingTime: '',
  //     clientId: null
  //   };
  // }

  updateMeeting(): void {
    if (this.selectedMeeting) {
      this.meetingService.updateMeeting(this.selectedMeeting).subscribe(() => {
        this.getMeetings();
        this.selectedMeeting = null;
      });
    }
  }

  cancelEdit(): void {
    this.selectedMeeting = null;
  }
}
