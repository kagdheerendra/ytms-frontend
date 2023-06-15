import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef,GridOptions,GridReadyEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { TrfService } from './service/trf.service';
import { TrfActionComponent } from './componets/trf-action/trf-action.component';

@Component({
  selector: 'app-trf',
  templateUrl: './trf.component.html',
  styleUrls: ['./trf.component.css']
})
export class TrfComponent implements OnInit {

  searchValue : any;
  columnDefs: ColDef[] = [
    { headerName: 'Status', field: "status", pinned: 'left', width: 100,},
    { headerName: 'Training Title', field: "trainingTitle", pinned: 'left', width: 200, },
    { headerName: 'Training Type', field: "trainingType", width: 150 },
    { headerName: 'Project Name', field: "projectName" },
    { headerName: 'Duration(InDays)', field: "duration", width: 150 },
    { headerName: 'No. Of Participants', field: "noOfParticipants", width: 150 },
    { headerName: 'Purpose Of Training', field: "purposeOfTraining" },
    { headerName: 'Initiated From', field: "initiatedFrom", width: 150 },
    { headerName: 'Resource Type', field: "resourceType" },
    { headerName: 'Skills to be imparted', field: "skillToBeImpartent" },
    { headerName: 'Start Date', field: "startDate", width: 150 },
    { headerName: 'End Date', field: "endDate", width: 150 },
    // {
    //   headerName: 'Action', field: "", pinned: 'right', width: 80, cellRenderer: function () {
    //     return '<i class="fa fa-ellipsis-v" aria-hidden="true" style="color: #293e40;"></i>'
    //   }
    // },
    {headerName: 'Action', pinned: 'right', width: 100, cellRendererFramework: TrfActionComponent}
  ];

  rowData = [];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true
  };

  public gridOptions : GridOptions = {
    columnDefs: this.columnDefs,
    rowSelection: 'single',
    // onRowClicked: event => console.log('A row was clicked'),
    onColumnResized: event => console.log('A column was resized'),
    onGridReady: event => console.log('The grid is now ready'),
    // getRowHeight: (params) => 100
  }

  constructor(private router: Router, private trfService: TrfService) { }

  ngOnInit(): void {
  }

  onGridReady(params: GridReadyEvent) {
      this.trfService.getTrfList()
      .subscribe(
        (data: any) =>{
          this.rowData = data;
        },
        (err:any) =>{
          alert(err.error);
        }
      );  
  }

  createTrf() {
    this.router.navigateByUrl('/private/trf/create');
  }
}
