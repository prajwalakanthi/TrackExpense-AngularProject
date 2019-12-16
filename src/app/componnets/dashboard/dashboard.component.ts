import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  chart: any;
  expenses:any; 
  constructor() { }
  ngOnInit() {
    this.initData();
    this.displayChart();
    this.expenses = JSON.parse(localStorage.getItem("expenses"));      
  }
  initData(){
    let currentcategories = JSON.parse(localStorage.getItem("categories"));  
    // Initialize some data when the app starts
    if(!currentcategories){
      // Set some default categories
      var categories = ["Household","Grocery","Food","Taxi"];
      localStorage.setItem("categories", JSON.stringify(categories));
      // Add some dummy data
      var expenses = [
        {
          "category":"Household",
          "amount":100,
          "date": "2019-10-05"         
        },
        {
          "category":"Grocery",
          "amount":50,
          "date": "2019-11-05"   
        },
        {
          "category":"Food",
          "amount":70,
          "date": "2019-12-05"   
        }
      ];
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }
  }

  displayChart(){
    
    let amounts = [];
    let categories = [];
    let date = [];
    let currentexpenses = JSON.parse(localStorage.getItem("expenses")); 
    for(let expense of currentexpenses){ 
      categories.push(expense.category)     
      amounts.push(expense.amount); 
      date.push(expense.date);   
    }
    let color = [];
    
    this.chart = new Chart('canvas_bar', {
      type: 'bar',
      data: {
        labels: date,
        datasets: [
          { 
            data: amounts,
            backgroundColor:'rgba(255, 99, 132)',            
            borderColor: 'rgba(255, 99, 132)',
            borderWidth: 1,
            fill: true
          },
        ]
      },
      options: {
        responsive: true,
        legend: {         
          display: false,
                  },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });

    var dynamicColors = function() {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      return "rgb(" + r + "," + g + "," + b + ",1)";
   };

   for (var i in categories) {
    color.push(dynamicColors());
   }

    this.chart = new Chart('canvas_pie', {
      type: 'pie',
			data: {
				datasets: [{
          data:amounts,	
          backgroundColor:color,			
					label: 'Dataset 1'
				}],
				labels:categories
			},
			options: {
				responsive: true
			}
    });
  }

}
