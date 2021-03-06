import { Component, Input, OnInit } from '@angular/core';
import { VsenseapiService } from 'src/app/Services/vsenseapi.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  @Input() page:string="";

  constructor(private service:VsenseapiService) { 
  }

  ngOnInit() {
    this.service.changeEmitted$.subscribe(
      text => {
          this.page=text;
      });
  }

}