import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  jsonData: any[] = [];
  searchText: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getJsonData().subscribe(
      (data) => {
        this.jsonData = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
