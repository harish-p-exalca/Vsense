export class MSite{
    Title:string;
    Geo:string;
    Plant:string;
    IsActive:boolean;
    ModifiedOn:Date;
    ModifiedBy:Date;
    EquipmentID:string;
}
export class MSpace{
    Title:string;
    WorkCenter:string;
    SiteID:number;
    ParantSpaceID:number;
   
}
export class MEdge{
    Title:string;
    Lifespan:number;
    Vcc:number;
    SoftwareVersion:string;
    PuttoUse:Date;
    Status:string;
}

