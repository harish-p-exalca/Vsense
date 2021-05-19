export class Common{
    IsActive: boolean;
    CreatedOn: Date;
    CreatedBy: string;
    ModifiedOn?: Date;
    ModifiedBy: string;
}
export class MSite extends Common{
    Title:string;
    Geo:string;
    Plant:string;
    EquipmentID:string;
}
export class MSpace extends Common{
    Title:string;
    WorkCenter:string;
    SiteID:number;
    ParantSpaceID:number;
   
}
export class MEdge extends Common{
    Title:string;
    Lifespan:number;
    Vcc:number;
    SoftwareVersion:string;
    PuttoUse:Date;
    Status:string;
}
export class MEdgeGroup extends Common{
    Title:string;
    EdgeGroup:number;
}
export class MEdgeGroupParam extends Common{
    EdgeGroup:number;
    ParamID:string;
    Title:string;
    Unit:string;
    LongText:string;
    Min:number;
    Max:number;
    Icon:string;
    IsPercentage:string;
    Color:string;
}
export class MEdgeGroupView extends MEdgeGroup{
    EdgeParams:MEdgeGroupParam[];
}

