import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
export interface List {
  // photos: string;
  LogID: string;
  Site: string;
  Space: string;
  Asset: string;
  EdgeID: string;
  RefID: string;
  DateTime: string;
  PramTitle: string;
  Value: string;
  MinValue: string;
  MaxValue: string;
  AvgValue: string;
  Threshold: string;
}
const LIST_DATA: List[] = [
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'},
 { LogID:'12345',Site:'site',Space:'space',Asset: 'asset',EdgeID:'EdgeID',RefID:'RefID',DateTime: '01/06/2021',
 PramTitle:'PramTitle',Value: 'Value',MinValue:'MinValue',MaxValue:'MaxValue',AvgValue: 'AvgValue',Threshold: 'Threshold'}
 
];

@Component({
  selector: 'app-livefeed',
  templateUrl: './livefeed.component.html',
  styleUrls: ['./livefeed.component.scss']
})
export class LivefeedComponent implements OnInit {
  displayedColumns: string[] = [
  
    'LogID',
    'Site',
		'Space',
		'Asset',
		'EdgeID',
		'RefID',
		'dateTime',
		'PramTitle',
		'value',
		'minValue',
		'maxValue',
		'avgValue',
		'Threshold',
    
  ];
  // dataSource = LIST_DATA;
  data = Object.assign(LIST_DATA);
dataSource = new MatTableDataSource<List>(this.data);
  constructor() { }

  ngOnInit(): void {
  }

}
