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
    SiteID:number
}
export class MSpace extends Common{
    SpaceID:number;
    Title:string;
    WorkCenter:string;
    SiteID:number;
    ParantSpaceID:number;
}
export class MEdge extends Common{
    EdgeID:number;
    Title:string;
    Lifespan:number;
    Vcc:number;
    SoftwareVersion:string;
    PuttoUse:Date;
    Status:string;
    Battery:number=0;
    EdgeGroup:number;
    ParantEdgeID:number;
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

export class Rule extends Common{
    RuleID:number;
    Title:string;
    SiteID:number;
    SpaceID?:number;
    AssetID?:number;
    Threshold?:number;
    SLA:string;
    Level1:string;
    Level2:string;
    Level3:string;
    Notif1:string;
    Notif2:string;
    EmailTemplate:string;
}

export class MEdgeGroupView extends  MEdgeGroupParam{
    EdgeParams:MEdgeGroupParam[]=[];
}

export class MAsset extends Common{
    AssetID:number;
    Title:string;
    Class:string;
    SpaceID:number;
    Status:string;
}
export class MEdgeAssign extends Common{
    AssignmentID:number;
    EdgeID:number;
    AssetID:number;
    SpaceID:number;
    SiteID:number;
    StartDateTime:Date;
    EndDateTime:Date;
    Frequency:number;
}
export class MEdgeAssignParam extends Common{
    AssignmentID: number;
    PramID:string;
    Title:string;
    Unit:string;
    LongText:string;
    Max:number;
    Min:number;
    Icon:string;
    Soft1ExceptionThreshold:number;
    Soft2ExceptionThreshold:number;
    Hard1ExceptionThreshold:number;
    Hard2ExceptionThreshold:number;
    ActivityGraphTitle:string;
    IsActive=true;
}

export class AssetView extends MAsset{
    Assignments:Assignment[]=[];
}

export class Assignment extends MEdgeAssign{
    AssignParams:MEdgeAssignParam[]=[];
}
