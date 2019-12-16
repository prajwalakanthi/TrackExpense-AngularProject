import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
 url:string = '/assets/expenses.json'
  constructor(private http:HttpClient) { }

  getCategory(){
    return JSON.parse(sessionStorage.getItem("categories"));
  }

  addCategory(category:string){
    let currentcategories = JSON.parse(sessionStorage.getItem("categories"));
    currentcategories.push(category);
    sessionStorage.setItem("categories", JSON.stringify(currentcategories));
  }
}
