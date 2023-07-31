import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PacienteService } from '../services/paciente.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-paciente-add-edit',
  templateUrl: './paciente-add-edit.component.html',
  styleUrls: ['./paciente-add-edit.component.scss']
})
export class PacienteAddEditComponent implements OnInit{
  pacienteForm: FormGroup;
  plano: string[] = ['Particular', 'Unimed', 'Bradesco', 'SulAmérica', 'Amil', 'Outro'];

  constructor(
    private _fb: FormBuilder,
    private _pacienteService: PacienteService,
    private _dialogRef: MatDialogRef<PacienteAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.pacienteForm = this._fb.group({
      nome: [''],
      sobrenome: [''],
      email: [''],
      dataNascimento: [''],
      genero: [''],
      cpf: [''],
      plano: [''],
    });
  }

  onFormSubmit() {
    if (this.pacienteForm.valid) {
      if (this.data) {
        this._pacienteService.updatePaciente(this.data.id, this.pacienteForm.value).subscribe({
          next: (result: any) => {
            this._coreService.openSnackBar('Paciente editado com sucesso!');
            this._dialogRef.close(true);
          },
          error: (error: any) => {
            console.error(error);
          }
        });
      } else {
        this._pacienteService.addpaciente(this.pacienteForm.value).subscribe({
          next: (result: any) => {
            this._coreService.openSnackBar('Paciente adicionado com sucesso!');
            this._dialogRef.close(true);
          },
          error: (error: any) => {
            console.error(error);
          }
        });
      }
    }
  }

  ngOnInit(): void {
    if (this.data) {
      this.pacienteForm.patchValue(this.data);
    }
  }
}
