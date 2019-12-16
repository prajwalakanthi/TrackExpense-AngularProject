import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {
  
  categories: any;
  closeResult: string;
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.getCategories();
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  getCategories(){
    this.categories = JSON.parse(localStorage.getItem("categories"));
  }

  addCategory(){   
    let categoryInput = document.getElementById('new_category') as HTMLInputElement;    
    let newCategory = categoryInput.value;    
    let currentcategories = JSON.parse(localStorage.getItem("categories"));    
    currentcategories.push(newCategory);
    localStorage.setItem("categories", JSON.stringify(currentcategories));
    this.getCategories();   
  }

  addExpense(){
    let category = document.getElementById('category') as HTMLInputElement;
    let amount = document.getElementById('amount') as HTMLInputElement;
    let date = document.getElementById('date') as HTMLInputElement;  
    document.getElementById('success').style.display = 'block';
    let expense = {
      "category":category.value,
      "amount":amount.value,
      "date":date.value
    };
    let currentexpenses = JSON.parse(localStorage.getItem("expenses"));    
    currentexpenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(currentexpenses));
  }
}
