import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditarAnuncioComponent } from './dialog-editar-anuncio.component';

describe('DialogEditarAnuncioComponent', () => {
  let component: DialogEditarAnuncioComponent;
  let fixture: ComponentFixture<DialogEditarAnuncioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditarAnuncioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditarAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
