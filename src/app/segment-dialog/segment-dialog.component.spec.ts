import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentDialogComponent } from './segment-dialog.component';

describe('SegmentDialogComponent', () => {
  let component: SegmentDialogComponent;
  let fixture: ComponentFixture<SegmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegmentDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SegmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
