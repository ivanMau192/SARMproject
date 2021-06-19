import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetServiceModalComponent } from './get-service-modal.component';

describe('GetServiceModalComponent', () => {
  let component: GetServiceModalComponent;
  let fixture: ComponentFixture<GetServiceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetServiceModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetServiceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
