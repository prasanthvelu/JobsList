import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {JobsService} from '../../services/jobs.service'

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  pageHeading: string
  totalJobs: number
  constructor(private router: Router, private jobsService: JobsService) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === "/dashboard") {
          this.pageHeading = "Dashboard"
        } else if (event.url === "/" || event.url === "/jobs-list") {
          this.pageHeading = "Jobs"
        } else if (event.url === "/settings") {
          this.pageHeading = "Settings"
        }
      }

    })
  }

  ngOnInit(): void {
    this.jobsService.getJobs().subscribe((data) => {
      this.totalJobs = data.data.length;       
    })
  }
}
