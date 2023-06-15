import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TrfService {

  constructor(private http: HttpClient) { }

  // get trf list
  getTrfList(): Observable<any> {
    return this.http.get(environment.baseUrl + environment.getTrlList);
  }

  // submit trf form data
  submit(form: any, associateList: any): Observable<any> {
    let obj = {
      "trainingTitle": form.value.trainingTitle,
      "trainingType": form.value.trainingType,
      "resourceType": form.value.resourceType,
      "duration": form.value.duration,
      "purposeOfTraining": form.value.purposeOfTraining,
      "initiatedFrom": form.value.initiatedFrom,
      "projectName": form.value.projectName,
      "skillToBeImpartent": form.value.trainingTitle,
      "noOfParticipants": form.value.noOfParticipants,
      "startDate": form.value.startDate,
      "endDate": form.value.endDate,
      "associates": associateList
    }
    return this.http.post(environment.baseUrl + environment.createTrf, JSON.stringify(obj),
      {
        headers:
          { 'Content-Type': 'application/json' }
      });
  }

  // get trf list
  getByTrfId(id: number): Observable<any> {
    return this.http.get(environment.baseUrl + environment.getByTrfId + '/' + id);
  }

  // update trf by id
  updateByTrfId(id: number, form: any, associateList: any): Observable<any> {
    let obj = {
      "trainingTitle": form.value.trainingTitle,
      "trainingType": form.value.trainingType,
      "resourceType": form.value.resourceType,
      "duration": form.value.duration,
      "purposeOfTraining": form.value.purposeOfTraining,
      "initiatedFrom": form.value.initiatedFrom,
      "projectName": form.value.projectName,
      "skillToBeImpartent": form.value.trainingTitle,
      "noOfParticipants": form.value.noOfParticipants,
      "startDate": form.value.startDate,
      "endDate": form.value.endDate,
      "associates": associateList
    }
    return this.http.put(environment.baseUrl + environment.updateTrf+"/"+id, JSON.stringify(obj),
      {
        headers:
          { 'Content-Type': 'application/json' }
      });
  }
}
