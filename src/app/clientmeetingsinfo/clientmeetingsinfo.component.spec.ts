import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMeetingsInfoComponent } from './clientmeetingsinfo.component';

describe('ClientmeetingsinfoComponent', () => {
  let component: ClientMeetingsInfoComponent;
  let fixture: ComponentFixture<ClientMeetingsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientMeetingsInfoComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClientMeetingsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
