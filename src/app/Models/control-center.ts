export class AssignParamLogView{
    PramID:string;
    Title:string;
    ActivityGraphTitle:string;
    Min:number;
    Max:number;
    Unit:string;
    Value:number;
    MinValue:number;
    MaxValue:number;
    AvgValue:number;
    DateTime:string | Date | null;
    IsLogExist:boolean;
}
export class ControlCenterFeed{
    Site:string;
    Space:string;
    Asset:string;
    Title:string;
    value:number;
    Status:boolean;
    LastFeed:string | Date | null;
}