import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColDef,GridOptions,GridReadyEvent } from 'ag-grid-community';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx'; 
import { ToastrService } from 'ngx-toastr';
import { TrfService } from '../../service/trf.service';

@Component({
  selector: 'app-create-trf',
  templateUrl: './create-trf.component.html',
  styleUrls: ['./create-trf.component.css']
})
export class CreateTrfComponent implements OnInit, AfterViewChecked {

  fileValue: any;
  associateList : any[] = [];
  mode : string  = "create";
  headerValue : string = "Create Form";
  trfId : number = 0;
  columnDefs: ColDef[] = [
    {headerName: 'Emp Id', field: 'empId', pinned: 'left', width:100 },
    {headerName: 'Emp Name', field: 'empName', pinned: 'left'},
    {headerName: 'Exprience', field: 'exprience', width:150},
    {headerName: 'Grade', field: 'grade', width:100},
    {headerName: 'Current Skill', field: 'currentSkill'},
    {headerName: 'Current Allocation', field: 'currentAllocation'},
    {headerName: 'Project', field: 'project'},
    {headerName: 'Upgraded Skill Set', field: 'upgradedSkillSet'}
    // {headerName: 'Action', pinned: 'right', width: 120} 
  ];
  rowData = [];

  trfForm = new FormGroup({
    trainingTitle: new FormControl(null, [Validators.required]),
    trainingType: new FormControl(null, [Validators.required]),
    resourceType: new FormControl(null, [Validators.required]),
    duration: new FormControl(null, [Validators.required]),
    projectName: new FormControl(null, [Validators.required]),
    purposeOfTraining: new FormControl(null, [Validators.required]),
    noOfParticipants: new FormControl(null, [Validators.required]),
    initiatedFrom: new FormControl(null, [Validators.required]),
    startDate: new FormControl(null, [Validators.required]),
    endDate: new FormControl(null, [Validators.required])
  })

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  public gridOptions : GridOptions = {
    columnDefs: this.columnDefs,
    rowSelection: 'single',
    onRowClicked: event => console.log('A row was clicked'),
    onColumnResized: event => console.log('A column was resized'),
    onGridReady: event => console.log('The grid is now ready'),
  }

  constructor(private router: Router, private route : ActivatedRoute, private toastrService: ToastrService, private trfService: TrfService) { }
  
  ngAfterViewChecked(): void {
    this.gridOptions.api?.setRowData(this.associateList);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
         if(params['json']){
          let json = JSON.parse(params['json']);
          if(json){
           this.mode = json.mode;
           if(this.mode === "view"){
            this.headerValue = "View Form";
           }else if(this.mode === "edit"){
            this.headerValue = "Update Form";
           }
           this.trfId = json.data.trfId;
           this.trfForm.setValue({
             trainingTitle: json.data.trainingTitle,
             trainingType: json.data.trainingType,
             resourceType: json.data.resourceType,
             duration: json.data.duration,
             projectName: json.data.projectName,
             purposeOfTraining: json.data.purposeOfTraining,
             noOfParticipants: json.data.noOfParticipants,
             initiatedFrom: json.data.initiatedFrom,
             startDate: json.data.startDate,
             endDate: json.data.endDate
           });
           if(this.mode === 'view'){
            this.trfForm.controls['trainingTitle'].disable();
            this.trfForm.controls['trainingType'].disable();
            this.trfForm.controls['resourceType'].disable();
            this.trfForm.controls['duration'].disable();
            this.trfForm.controls['projectName'].disable();
            this.trfForm.controls['purposeOfTraining'].disable();
            this.trfForm.controls['initiatedFrom'].disable();
            this.trfForm.controls['noOfParticipants'].disable();
            this.trfForm.controls['startDate'].disable();
            this.trfForm.controls['endDate'].disable();
           }
           this.associateList = json.data.associates;
          }
         }
      }
    )
  }

  onGridReady(params: GridReadyEvent) {
    let api = params.api;
    let columnApi = params.columnApi;
  }

  onFileChanged(evt: any) {
    let files = evt.target.files; // FileList object  
    this.parseExcel(files[0]);
    this.fileValue = undefined;
  }

  parseExcel(file: File) {
    let reader = new FileReader();
    reader.onload = (e) => {
      let data = (<any>e.target).result;
      let workbook = XLSX.read(data, {
        type: 'binary'
      });
      let jsonObj: any;
      workbook.SheetNames.forEach((function (sheetName: any) {
        // Here is your object  

        let XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        let json_object = JSON.stringify(XL_row_object);

        // bind the parse excel file data to Grid  
        jsonObj = JSON.parse(json_object);

      }).bind(this), this);
      this.associateList = jsonObj;
      this.gridOptions.api?.setRowData(jsonObj);

    };
    reader.onerror = function (ex) {
      console.log(ex);
    };
    reader.readAsBinaryString(file);
  };

  uploadAssociate() {

  }

  cancel() {
    this.router.navigateByUrl('/private/trf');
  }

  submit() {
    console.log(this.trfForm.value);
    if (!this.trfForm.valid) {
      return;
    }
    if (this.associateList.length == 0) {
      this.toastrService.warning('Please upload associates!', 'Warning', {
        timeOut: 3000,
      });
      return;
    }
    if(this.mode === "edit"){
      this.updateTrf();
    }else {
      this.createTrf();
    }
  }

  createTrf(){
    this.trfService.submit(this.trfForm, this.associateList).subscribe(res => {
      if (res) {
        this.toastrService.success('Request Created Successfully!', 'Success');
        this.router.navigateByUrl('/private/trf');
      } else {

      }
    },
    err => {
      this.toastrService.error('An error has occured, Please try again!', 'Error', {
        timeOut: 3000,
      });
    }); 
  }

  updateTrf(){
    this.trfService.updateByTrfId(this.trfId, this.trfForm, this.associateList, ).subscribe(res => {
      if (res) {
        this.toastrService.success('Request Updated Successfully!', 'Success');
        this.router.navigateByUrl('/private/trf');
      } else {

      }
    },
    err => {
      this.toastrService.error('An error has occured, Please try again!', 'Error', {
        timeOut: 3000,
      });
    }); 
  }
}
