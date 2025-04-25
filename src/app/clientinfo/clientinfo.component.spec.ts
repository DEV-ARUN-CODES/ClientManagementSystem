import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientinfoComponent } from './clientinfo.component';

describe('ClientinfoComponent', () => {
  let component: ClientinfoComponent;
  let fixture: ComponentFixture<ClientinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientinfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
