import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfilesModalComponent } from './add-profiles-modal.component';

describe('AddProfilesModalComponent', () => {
  let component: AddProfilesModalComponent;
  let fixture: ComponentFixture<AddProfilesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProfilesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProfilesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
