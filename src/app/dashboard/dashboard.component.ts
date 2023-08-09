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
  sortBy: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';
  currentPage: number = 1;
  itemsPerPage: number = 10;

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

  getOrderedKeys(): string[] {
    return this.jsonData.length > 0 ? Object.keys(this.jsonData[0]) : [];
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  getEndIndex(): number {
    const endIndex = this.currentPage * this.itemsPerPage;
    return endIndex > this.jsonData.length ? this.jsonData.length : endIndex;
  }

  getPageNumbers(): number[] {
    const totalPageCount = Math.ceil(this.jsonData.length / this.itemsPerPage);
    return Array.from({ length: totalPageCount }, (_, index) => index + 1);
  }

  sortData(column: string) {
    if (this.sortBy === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortOrder = 'asc';
    }

    this.jsonData.sort((a, b) => {
      const aValue = a[this.sortBy];
      const bValue = b[this.sortBy];
      if (aValue < bValue) {
        return this.sortOrder === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return this.sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
  
}
