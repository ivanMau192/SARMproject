import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteUploadComponent } from './waste-upload.component';

describe('WasteUploadComponent', () => {
  let component: WasteUploadComponent;
  let fixture: ComponentFixture<WasteUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WasteUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WasteUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
