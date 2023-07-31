import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteAddEditComponent } from './paciente-add-edit.component';

describe('PacienteAddEditComponent', () => {
  let component: PacienteAddEditComponent;
  let fixture: ComponentFixture<PacienteAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacienteAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacienteAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
