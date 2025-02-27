import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../Enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class CatandbrandsService {

  constructor(private httpClient:HttpClient) {  }


getAllBrands():Observable<any>{
  return this.httpClient.get(`${environment.baseUrl}/api/v1/brands`)
}
getSpecificBrand(id:string):Observable<any>{
  return this.httpClient.get(`${environment.baseUrl}/api/v1/brands/${id}`)
}

getAllCats():Observable<any>{
  return this.httpClient.get(`${environment.baseUrl}/api/v1/categories`)
}

getSpecificCat(id:string):Observable<any>{
  return this.httpClient.get(`${environment.baseUrl}/api/v1/categories/${id}/subcategories`)
}
}
