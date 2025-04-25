import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Meeting {
  meeting_id?: number;
  meeting_agenda: string;
  meeting_date: string;
  meeting_time: string;
  client_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class MeetingService {


  private baseUrl = 'http://localhost:3000/api/meetings';

  constructor(private http: HttpClient) { }

  getMeetings(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  addMeeting(meeting: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, meeting);
  }

  deleteMeeting(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  updateMeeting(meeting: Meeting): Observable<Meeting> {
    return this.http.put<Meeting>(`${this.baseUrl}/${meeting.meeting_id}`, meeting);
  }
}
