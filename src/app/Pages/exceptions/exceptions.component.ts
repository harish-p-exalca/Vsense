import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { VsenseapiService } from 'src/app/Services/vsenseapi.service';

@Component({
  selector: 'app-exceptions',
  templateUrl: './exceptions.component.html',
  styleUrls: ['./exceptions.component.scss']
})
export class ExceptionsComponent implements OnInit {

  ExceptionDisplayedColumns:string[]=["ExcepID","Site","Space","Asset","Class","PramID","Value","DateTime",
  "AssignedTo","Threshold","SLAStart","Status","Resolve"];
  ExceptionDataSource:MatTableDataSource<any>;
  Exceptions:any[]=[];
  SearchKey:any;

  constructor(
    private service:VsenseapiService,
    private spinner:NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.GetExceptions();
  }

  GetExceptions(){
    this.spinner.show();
    this.service.GetExceptions().subscribe(res=>{
      this.Exceptions=res;
      this.ExceptionDataSource=new MatTableDataSource(this.Exceptions);
      this.spinner.hide();
    },
    err=>{
      this.spinner.hide();
      console.log(err);
    });
  }

  applyFilter() {
    this.ExceptionDataSource.filter = this.SearchKey.trim().toLowerCase();
  }

}
