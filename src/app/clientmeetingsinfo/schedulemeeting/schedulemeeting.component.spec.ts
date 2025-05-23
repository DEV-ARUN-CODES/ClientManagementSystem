import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulemeetingComponent } from './schedulemeeting.component';

describe('SchedulemeetingComponent', () => {
  let component: SchedulemeetingComponent;
  let fixture: ComponentFixture<SchedulemeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulemeetingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulemeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
