import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatPaginator} from "@angular/material/paginator";
import {FormControl} from "@angular/forms";
import {MatSort, Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {ProjectStoreRepository} from "../project.store";

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.css']
})
export class ProjectsTableComponent implements OnInit, AfterViewInit{
  constructor(private httpClient: HttpClient,
              private _liveAnnouncer: LiveAnnouncer,
              private projectStoreRepository: ProjectStoreRepository) {
  }

  getAvergeScore() {
    return (this.dataSource?.filteredData?.map((a: any) => a.score).reduce((a: number, b: number) => a + b, 0) / this.dataSource?.filteredData?.length).toFixed(2) || 0;
  }

  getDadeLineProject() {
    return (((this.dataSource?.filteredData?.filter((a: any) => a.madeDadeline == true)?.length / this.dataSource?.filteredData?.length) || 0) * 100).toFixed(2) + '%';
  }

  displayedColumns: string[] = ['id', 'name', 'score', 'durationInDays', 'bugsCount', 'madeDadeline'];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  filteredValues = {
    id: '', name: '', score: '',
    durationInDays: '', bugsCount: '', madeDadeline: ''
  };
  dataSource: any;
  idFilter = new FormControl();
  nameFilter = new FormControl();
  scoreFilter = new FormControl();
  durationInDaysFilter = new FormControl();
  bugsCountFilter = new FormControl();
  madeDadelineFilter = new FormControl();

  ngOnInit() {
    this.updateDataSource(this.projectStoreRepository.getAllProjects())
    this.setFilters();
  }

  updateDataSource(data: any) {
    this.dataSource = new MatTableDataSource(data);
  }

  setFilters() {
    this.idFilter.valueChanges.subscribe((value) => {
      this.filteredValues['id'] = value;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.nameFilter.valueChanges.subscribe((value) => {
      this.filteredValues['name'] = value;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.scoreFilter.valueChanges.subscribe((value) => {
      this.filteredValues['score'] = value;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.durationInDaysFilter.valueChanges.subscribe((value) => {
      this.filteredValues['durationInDays'] = value;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.bugsCountFilter.valueChanges.subscribe((value) => {
      this.filteredValues['bugsCount'] = value;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.madeDadelineFilter.valueChanges.subscribe((value) => {
      this.filteredValues['madeDadeline'] = value;
      this.dataSource.filter = JSON.stringify(this.filteredValues);

    });
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data: any, filter: any): boolean {
      let searchTerms = JSON.parse(filter);

      return data.id.toLowerCase().indexOf(searchTerms.id) !== -1
        && data.name.toLowerCase().indexOf(searchTerms.name) !== -1
        && data.score.toString().indexOf(searchTerms.score) !== -1
        && data.durationInDays.toString().indexOf(searchTerms.durationInDays) !== -1
        && data.bugsCount.toString().indexOf(searchTerms.bugsCount) !== -1
        && data.madeDadeline.toString().indexOf(searchTerms.madeDadeline) !== -1
    }
    return filterFunction;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.createFilter();
  }

}



