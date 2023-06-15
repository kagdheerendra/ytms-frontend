import { Component, OnInit } from '@angular/core';
import { TrfService } from '../../service/trf.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trf-action',
  templateUrl: './trf-action.component.html',
  styleUrls: ['./trf-action.component.css']
})
export class TrfActionComponent implements OnInit {

  params: any;
  
  constructor(private router: Router, private trfService: TrfService) { }

  ngOnInit(): void {
  }

  agInit(params: any): void {
      this.params = params;
  }

  viewTrf(){
    this.trfService.getByTrfId(this.params.data.trfId)
    .subscribe(
      (data: any) =>{
        let obj = {
          mode : "view",
          data : data
        }
        this.router.navigate(['/private/trf/create'], { queryParams: { json : JSON.stringify(obj) }});
      },
      (err:any) =>{
        alert(err.error);
      }
    );  
    
  }

  editTrf(){
    this.trfService.getByTrfId(this.params.data.trfId)
    .subscribe(
      (data: any) =>{
        let obj = {
          mode : "edit",
          data : data
        }
        this.router.navigate(['/private/trf/create'], { queryParams: { json : JSON.stringify(obj) }});
      },
      (err:any) =>{
        alert(err.error);
      }
    ); 
  }
}
