import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { VsenseapiService } from 'src/app/Services/vsenseapi.service';

@Component({
  selector: 'app-livefeed',
  templateUrl: './livefeed.component.html',
  styleUrls: ['./livefeed.component.scss']
})
export class LivefeedComponent implements OnInit {

  LiveFeeds:any[]=[];
  LiveFeedDisplayedColumns: string[] = [
    'LogID',
    'Site',
		'Space',
		'Asset',
		'EdgeID',
		'RefID',
		'DateTime',
		'PramTitle',
		'Value',
		'MinValue',
		'MaxValue',
		'AvgValue',
		'Threshold',
  ];
  LiveFeedDataSource:MatTableDataSource<any>;
  SearchKey:any;
  
  constructor(
    private service:VsenseapiService,
    private spinner:NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.GetLivFeeds();
  }

  GetLivFeeds(){
    this.spinner.show();
    this.service.GetLivFeeds().subscribe(res=>{
      this.LiveFeeds=res;
      this.LiveFeedDataSource=new MatTableDataSource(this.LiveFeeds);
      this.spinner.hide();
    },
    err=>{
      this.spinner.hide();
      console.log(err);
    });
  }

  applyFilter() {
    this.LiveFeedDataSource.filter = this.SearchKey.trim().toLowerCase();
  }

}
