import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  async getListOfFiles(data: any): Promise<any> {
    const params = new HttpParams().set("username", data);
    const response = this.http.get(environment.baseUrl + '/user/files', { params });
    return await lastValueFrom(response);
  }

  async loginUser(data: any): Promise<any> {
    const res = this.http.post(environment.baseUrl + '/user/login', data);
    return await lastValueFrom(res);
  }

  async registerUser(data: any): Promise<any> {
    const res = this.http.post(environment.baseUrl + '/user/register', data);
    return await lastValueFrom(res);
  }

  async uploadFile(data: any): Promise<any> {
    const res = this.http.post(environment.baseUrl + '/user/upload', data);
    return await lastValueFrom(res);
  }

  async createFolder(data: any): Promise<any> {
    const res = this.http.post(environment.baseUrl + '/user/upload', data);
    return await lastValueFrom(res);
  }

  async downloadFile(data: any): Promise<any> {
    const res = this.http.post(environment.baseUrl + '/user/download', data);
    return await lastValueFrom(res);
  }

  async deleteFile(data: any): Promise<any> {
    const res = this.http.post(environment.baseUrl + '/user/delete', data);
    return await lastValueFrom(res);
  }
}
