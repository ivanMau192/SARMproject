import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatProfilesPickerRenderComponent } from './mat-profiles-picker-render.component';

describe('MatProfilesPickerRenderComponent', () => {
  let component: MatProfilesPickerRenderComponent;
  let fixture: ComponentFixture<MatProfilesPickerRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatProfilesPickerRenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatProfilesPickerRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
