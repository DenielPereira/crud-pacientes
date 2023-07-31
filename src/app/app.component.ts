import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PacienteAddEditComponent } from './paciente-add-edit/paciente-add-edit.component';
import { PacienteService } from './services/paciente.service';
import { OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'crud-pacientes';
  displayedColumns: string[] = ['id', 'nome', 'sobrenome', 'email', 'dataNascimento', 'genero', 'cpf', 'plano', 'ações'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog, 
    private _pacienteService: PacienteService,
    private _coreService: CoreService
    ) { }

  ngOnInit(): void {
    this.getPacientesList();
  }

  openAddEditPaciente() {
    const modal = this._dialog.open(PacienteAddEditComponent);
    modal.afterClosed().subscribe({
      next: (val) => {
        if (val) this.getPacientesList();
      }
    });
  }

  getPacientesList() {
    this._pacienteService.getPacientesList().subscribe({
      next: (result: any) => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: console.log
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deletePaciente(id: number) {
    const confirmation = window.confirm('Tem certeza que deseja excluir este paciente?');
  
    if (confirmation) {
      this.performDeletePaciente(id);
    } 
  }

  performDeletePaciente(id: number) {
    this._pacienteService.deletePaciente(id).subscribe({
      next: () => {
        this._coreService.openSnackBar('Paciente removido com sucesso!');
        this.getPacientesList();
      },
      error: console.error
    });
  }

  openEditPaciente(data: any) {
    const modal = this._dialog.open(PacienteAddEditComponent, { data });
    modal.afterClosed().subscribe({
      next: (val) => {
        if (val) this.getPacientesList();
      }
    });
  }
}
