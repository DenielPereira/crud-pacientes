import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private _http: HttpClient) { }

  addpaciente(paciente: any): Observable<any>{
    return this._http.post('http://localhost:3000/pacientes', paciente);
  }

  getPacientesList(): Observable<any>{
    return this._http.get('http://localhost:3000/pacientes');
  }

  deletePaciente(id: number): Observable<any>{
    return this._http.delete(`http://localhost:3000/pacientes/${id}`);
  }

  updatePaciente(id: number, paciente: any): Observable<any>{
    return this._http.put(`http://localhost:3000/pacientes/${id}`, paciente);
  }
}
