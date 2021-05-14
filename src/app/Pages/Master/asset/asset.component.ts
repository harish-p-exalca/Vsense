import { Component, ElementRef, HostBinding, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {trigger, state, style, animate, transition} from '@angular/animations';
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { MAT_DATE_FORMATS } from '@angular/material/core';
   
export const MY_DATE_FORMATS = {
    parse: {
      dateInput: 'DD/MM/YYYY',
    },
    display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'MMMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY'
    },
};

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(45deg)' })),
      transition('rotated => default', animate('400ms ease-out')),
      transition('default => rotated', animate('400ms ease-in'))
  ])
]
})
export class AssetComponent implements OnInit {
  // scroll button part
  @ViewChild('widgetsContent', { read: ElementRef }) public widgetsContent: ElementRef<any>;

  public scrollRight(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 210), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 210), behavior: 'smooth' });
  }
// scroll button part

  devices=[1,2,3,4,5,56,8,7];
  ParamdisplayedColumns:string[]=["ParamID","Title","Unit","LongText","Min","Max","Icon","Soft-1-Ex.Threshold",
  "Soft-2-Ex.Threshold","Hard-1-Ex.Threshold","Hard-2-Ex.Threshold","Activity Graph Title","Action"];
  ParamDataSource:MatTableDataSource<any>=new MatTableDataSource(this.devices);
  any :string = "we";
  //animation
  state: string = 'default';
  //autocomplete
  options: string[] = ['Working', 'Not Working', 'Others'];
  //input field color
  isFocused:boolean = true;
  isFocused1:boolean = true;
  isFocused2:boolean = true;
  isFocused3:boolean = true;
  isFocused4:boolean = true;  isFocused5:boolean = true;
  // highlighting
  toggle: boolean = false;
  toggle1: boolean = false;
  toggle2: boolean = false;
  toggle3: boolean = false;
  toggle4: boolean = false;
  toggle5: boolean = false;
  toggle6: boolean = false;
  toggle7: boolean = false;
  toggle8: boolean = false;

// hovering
isActive: boolean = false;

  constructor(private doms: DomSanitizer) { }

  ngOnInit(): void {
  }
  //image angular animation
rotate() {
  this.state = (this.state === 'default' ? 'rotated' : 'default');
}
menuClosed(){
  this.rotate();
}
  //image angular animation

//highlighting
toggele(){
  this.toggle = !this.toggle;this.toggle1 = false
  this.toggle2 = false; this.toggle3 = false;this.toggle4 = false; this.toggle5 = false;this.toggle6 = false;this.toggle7 = false;  this.toggle8 = false;
}
toggele1(){
  this.toggle1 = !this.toggle1; this.toggle = false;  this.toggle2 = false; this.toggle3 = false; this.toggle4 = false;  this.toggle5 = false; this.toggle6 = false;  this.toggle7 = false; this.toggle8 = false;
}
toggele2(){
  this.toggle2 = !this.toggle2;this.toggle1 = false;
 this.toggle = false; this.toggle3 = false;  this.toggle4 = false; this.toggle5 = false; this.toggle6 = false; this.toggle7 = false;  this.toggle8 = false;
}
toggele3(){
  this.toggle3 = !this.toggle3; this.toggle1 = false;
  this.toggle2 = false;  this.toggle = false; this.toggle4 = false; this.toggle5 = false;  this.toggle6 = false; this.toggle7 = false; this.toggle8 = false;
}
toggele4(){
  this.toggle4 = !this.toggle4;  this.toggle1 = false;  this.toggle2 = false; this.toggle3 = false;
  this.toggle = false; this.toggle5 = false; this.toggle6 = false; this.toggle7 = false; this.toggle8 = false;
}
toggele5(){
  this.toggle5 = !this.toggle5; this.toggle1 = false; this.toggle2 = false; this.toggle3 = false;
  this.toggle4 = false; this.toggle = false; this.toggle6 = false; this.toggle7 = false; this.toggle8 = false;
}
toggele6(){
  this.toggle6 = !this.toggle6; this.toggle1 = false; this.toggle2 = false; this.toggle3 = false;this.toggle4 = false;
  this.toggle5 = false; this.toggle = false; this.toggle7 = false; this.toggle8 = false;
}
toggele7(){
  this.toggle7 = !this.toggle7; this.toggle1 = false;this.toggle2 = false;this.toggle3 = false;this.toggle4 = false;
  this.toggle5 = false; this.toggle6 = false; this.toggle = false; this.toggle8 = false;
}
toggele8(){
  this.toggle8 = !this.toggle8; this.toggle1 = false; this.toggle2 = false; this.toggle3 = false;this.toggle4 = false;
  this.toggle5 = false; this.toggle6 = false; this.toggle7 = false;this.toggle = false;
}
//hovering

openCurrentOrder() {
  this.isActive = true;
  console.log("opened");
}

closeCurrentOrder() {
  this.isActive = false;
  console.log("opened");
}
toggleCurrentOrder() {
  this.isActive = !this.isActive;
 
}

}