import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { JobsService } from '../../services/jobs.service';
import { JobsData } from '../../models/jobs.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { JobsMetaService } from '../../services/jobs-meta.service';
import { JobsMeta } from '../../models/jobs-meta.model';
import { formatDate } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  MatDialog
} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-jobs-listing',
  templateUrl: './jobs-listing.component.html',
  styleUrls: ['./jobs-listing.component.css']
})
export class JobsListingComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<JobsData>()
  initColumns: JobsMeta[]
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private jobsService: JobsService, private jobsMetaService: JobsMetaService, private _liveAnnouncer: LiveAnnouncer, private dialog: MatDialog) {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    this.dialog.open(DialogComponent,{data: {
      dataKey: this.initColumns
    }});
  }

  getDisplayedColumns(): string[] {
    return this.initColumns?this.initColumns
      .filter(item => item.checked)
      .map(item_2 => item_2.data_key):[];
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
    this.jobsMetaService.getJobsMeta().subscribe(data => {
      this.initColumns = data.data
    })

    this.jobsService.getJobs().subscribe((data) => {
      this.dataSource.data = data.data
    })

    this.dataSource.filterPredicate = (data: JobsData, filter) => {
      const dataStr = Object.keys(data)
        .reduce((currentTerm, key) => {
          if (key == "work_order_number" || key == "job_title" || key == "job_priority") {
            return currentTerm + data[key] + '◬';
          } else if (key == "assigned_to") {
            return currentTerm + data[key][0].user.first_name + ' ' + data[key][0].user.last_name + '◬';
          } else if (key == "job_category") {
            return currentTerm + data[key].category_name + '◬';
          } else if (key == "current_job_status") {
            return currentTerm + data[key].status_name + '◬';
          } else if (key == "customer") {
            return currentTerm + data[key]?.customer_first_name + ' ' + data[key]?.customer_last_name + '◬';
          } else if (key == "scheduled_start_time") {
            return currentTerm + formatDate(data[key], 'dd/MM/yyyy HH:mm', 'en-US') + '◬';
          } else {
            return currentTerm;
          }
        }, '')
        .toLowerCase();
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) != -1;
    };

    this.dataSource.sortingDataAccessor = function (item, property) {
      switch (property) {
        case 'customer':
          return (item.customer?.customer_first_name + ' ' + item.customer?.customer_last_name).toLowerCase() || '';
        default:
          const propertyValue = item[property as keyof JobsData];
          return typeof propertyValue !== "object" ? typeof propertyValue === "string" ? propertyValue.toLowerCase() : propertyValue : '';
      }
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}

