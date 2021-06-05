import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WastesComponent } from './wastes.component';

describe('WastesComponent', () => {
  let component: WastesComponent;
  let fixture: ComponentFixture<WastesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WastesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WastesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
