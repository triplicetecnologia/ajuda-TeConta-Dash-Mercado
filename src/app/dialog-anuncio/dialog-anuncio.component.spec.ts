import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAnuncioComponent } from './dialog-anuncio.component';

describe('DialogAnuncioComponent', () => {
  let component: DialogAnuncioComponent;
  let fixture: ComponentFixture<DialogAnuncioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAnuncioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
