import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class UploadService {

 

  URL: string = "http://localhost:4200/src/assets/"
  constructor(private httpClient: HttpClient) { }

  public upload(formData) {
    console.log(formData);
    return this.httpClient.post<any>(this.URL, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}