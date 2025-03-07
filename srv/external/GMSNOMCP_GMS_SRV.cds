/* checksum : c6687935cbe1b4743aa6aae5550bf3bd */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service GMSNOMCP_GMS_SRV {};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'GMS Allocation type'
entity GMSNOMCP_GMS_SRV.xGMSxallocation {
  @sap.display.format : 'UpperCase'
  @sap.label : 'DocumentNo'
  @sap.quickinfo : 'Document Number'
  key Vbeln : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Sales Document Item'
  key ItemNo : String(6) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Path'
  key Path : String(50) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Service Profile'
  key ServProfile : String(40) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Service Parameter'
  key ServiceParam : String(20) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Parameter Type'
  key ParamType : String(20) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Parameter Value'
  @sap.quickinfo : 'Service Parameter Value'
  ParamValue : String(50);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Delivery Point'
  DeliveryPt : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Redelivery Point'
  RedeliveryPt : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales Contract Descr'
  @sap.quickinfo : 'Sales Contract Description'
  SalesDesc : String(20);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  Material : String(40);
  @sap.label : 'Fuel%'
  FuelPercentage : Decimal(5, 2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Document Type'
  DocType : String(1);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Billing Quantity for Contract'
entity GMSNOMCP_GMS_SRV.xGMSxCBILLQTY {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Billing Document'
  key SalesDocument : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Item'
  @sap.quickinfo : 'Billing Item'
  key SalesDocumentItem : String(6) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Contract number'
  @sap.quickinfo : 'Outline agreement: contract'
  key Contract : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Ref. contract item'
  @sap.quickinfo : 'Reference contract line item number'
  key ContractItem : String(6) not null;
  @sap.unit : 'BillingQuantityUnit'
  @sap.label : 'Billed Quantity'
  @sap.quickinfo : 'Actual billed quantity'
  BillingQuantity : Decimal(13, 3);
  @sap.unit : 'PA6BFC3E56266B15E39F5E491FBC2A679'
  @sap.label : 'Sales unit'
  @sap.semantics : 'unit-of-measure'
  BillingQuantityUnit : String(3);
  @sap.display.format : 'Date'
  @sap.label : 'Billing Date'
  BillingDate : Date;
  BillDay : String(2);
  BillMonth : String(2);
  BillYear : String(4);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Contract Header for GMS Contracts'
entity GMSNOMCP_GMS_SRV.xGMSxCONHEAD {
  @sap.display.format : 'UpperCase'
  @sap.label : 'DocumentNo'
  @sap.quickinfo : 'Document Number'
  key Vbeln : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Sales Document Item'
  key ItemNo : String(6) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  key Material : String(40) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Delivery Point'
  key DeliveryPt : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Redelivery Point'
  key RedeliveryPt : String(10) not null;
  @sap.label : 'Daily ContractQty'
  @sap.quickinfo : 'DCQ'
  Dcq : Decimal(13, 3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Path'
  Path : String(50);
  @sap.label : 'Fuel%'
  FuelPercentage : Decimal(5, 2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Document Type'
  DocType : String(1);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Delivery Point'
entity GMSNOMCP_GMS_SRV.xGMSxDelivery_Point {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Delivery Point'
  key DeliveryPoint : String(10) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Parameter Fetch Allocation'
entity GMSNOMCP_GMS_SRV.xGMSxGetNom_Param {
  @sap.display.format : 'UpperCase'
  @sap.label : 'DocumentNo'
  @sap.quickinfo : 'Document Number'
  key Vbeln : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Sales Document Item'
  key ItemNo : String(6) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Path'
  key Path : String(50) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Service Profile'
  key ServProfile : String(40) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Service Parameter'
  key ServiceParam : String(20) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Parameter Type'
  key ParamType : String(20) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Nomination Data for Ticketing 01'
entity GMSNOMCP_GMS_SRV.xGMSxGETNOM_TKT03 {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Nomination key'
  @sap.quickinfo : 'Nomination (technical) Key'
  key Nomtk : String(20) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Nomination key item'
  @sap.quickinfo : 'Nomination Key Item'
  key Nomit : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Schedule type'
  Sityp : String(2);
  @sap.display.format : 'Date'
  @sap.label : 'Scheduled date'
  Idate : Date;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Location ID'
  Locid : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Demand material'
  MatnrI : String(40);
  @sap.unit : 'UnitI'
  @sap.label : 'Scheduled qty'
  Menge : Decimal(13, 3);
  @sap.label : 'SchedUoM'
  @sap.quickinfo : 'Scheduled UoM'
  @sap.semantics : 'unit-of-measure'
  UnitI : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Reference document'
  @sap.quickinfo : 'Nomination Reference Document'
  Docnr : String(10);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Reference Doc. Item'
  @sap.quickinfo : 'Nomination Reference Document Item'
  Docitm : String(6);
  @sap.label : 'Ref. Doc. Type'
  @sap.quickinfo : 'Reference Document Type'
  Doctyp : String(4);
  DocType : String(1);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'GMS Nomination'
entity GMSNOMCP_GMS_SRV.xGMSxGMS_nom {
  @sap.display.format : 'Date'
  @sap.label : 'Gas Day'
  @sap.quickinfo : 'Gas Day Date'
  key Gasday : Date not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Delivery Point'
  key deliveryPoint : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Redelivery Point'
  @sap.quickinfo : 'Re-Delivery Ponit'
  key Redelivery : String(20) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales document'
  @sap.quickinfo : 'Sales Document'
  key Vbeln : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Sales Document Item'
  key Posnr : String(6) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Version'
  key Versn : String(3) not null;
  @odata.Type : 'Edm.DateTimeOffset'
  @sap.label : 'Short Time Stamp'
  @sap.quickinfo : 'UTC Time Stamp in Short Form (YYYYMMDDhhmmss)'
  Timestamp : DateTime;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Nomination key'
  @sap.quickinfo : 'Nomination (technical) Key'
  Nomtk : String(20);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sold-To Party'
  Kunnr : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales Document Type'
  Auart : String(4);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Priority'
  Rank : String(3);
  @sap.label : ''
  @sap.quickinfo : 'time custom'
  Time2 : Time;
  @sap.unit : 'PD19375344F44540D135691C223862EB4'
  @sap.label : 'Daily ContractQty'
  @sap.quickinfo : 'DCQ'
  Dcq : Decimal(13, 3);
  Uom1 : String(3);
  @sap.unit : 'PD19375344F44540D135691C223862EB4'
  @sap.label : 'DNQ'
  @sap.quickinfo : 'daily nomination Quantity'
  PDnq : Decimal(13, 3);
  Uom2 : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Event Type'
  @sap.quickinfo : 'Nomination Event'
  Event : String(40);
  @sap.unit : 'PD19375344F44540D135691C223862EB4'
  @sap.label : 'Approved DNQ'
  Adnq : Decimal(13, 3);
  @sap.unit : 'PD19375344F44540D135691C223862EB4'
  @sap.label : 'RePublish DNQ'
  @sap.quickinfo : 'Re-Publish DNQ'
  Rpdnq : Decimal(13, 3);
  Uom4 : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Nomination Number'
  Znomtk : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Status'
  Zstat : String(4);
  @sap.label : 'Delivery Tolerace %'
  @sap.quickinfo : 'Delivery Tolerance %'
  Dtolp : Decimal(5, 2);
  @sap.unit : 'PD19375344F44540D135691C223862EB4'
  @sap.label : 'Delivery Tolerace Q'
  @sap.quickinfo : 'Delivery Tolerance Quantity'
  Dtolq : Decimal(13, 3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Potential Shortfall'
  ZpotentialSf : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Source'
  Src : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Long comment'
  @sap.quickinfo : 'iSeries: Long comment of a table, view or table field'
  Remarks : String(255);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Nomination Flag'
  @sap.quickinfo : 'flag for customer nomination'
  Flag : String(6);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Action'
  Action : String(1);
  @sap.label : 'Service Param'
  @sap.quickinfo : 'Service Parameter'
  Srvparam1 : String(20);
  @sap.label : 'Service Param'
  @sap.quickinfo : 'Service Parameter'
  Srvparam2 : String(20);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Path'
  Path : String(20);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Customer Group'
  CustGrp : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Service Profile'
  SrvProfile : String(20);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  Material : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Transport system'
  Transys : String(10);
  to_alloc : Association to many GMSNOMCP_GMS_SRV.xGMSxallocation {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Material Data for Nom'
entity GMSNOMCP_GMS_SRV.xGMSxMat_valueHelp {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  key Material : String(40) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Nomination contract'
entity GMSNOMCP_GMS_SRV.xGMSxnomcontract {
  @sap.display.format : 'UpperCase'
  @sap.label : 'DocumentNo'
  @sap.quickinfo : 'Document Number'
  key Vbeln : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Sales Document Item'
  key Posnr : String(6) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales Contract Descr'
  @sap.quickinfo : 'Sales Contract Description'
  salesDesc : String(20);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sold-To Party'
  kunnr : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Document Type'
  DocType : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  Material : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Delivery Point'
  DeliveryPt : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Redelivery Point'
  RedeliveryPt : String(10);
  to_Contract : Association to many GMSNOMCP_GMS_SRV.xGMSxNOMIFETCH {  };
  to_ContrHeader : Association to many GMSNOMCP_GMS_SRV.xGMSxCONHEAD {  };
  to_Event : Association to many GMSNOMCP_GMS_SRV.xGMSxNom_Event {  };
  to_Material : Association to GMSNOMCP_GMS_SRV.I_MaterialText {  };
  to_PastNom : Association to many GMSNOMCP_GMS_SRV.xGMSxPast_Nom {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Nomination Fetch'
entity GMSNOMCP_GMS_SRV.xGMSxNOMIFETCH {
  @sap.display.format : 'UpperCase'
  @sap.label : 'DocumentNo'
  @sap.quickinfo : 'Document Number'
  key Vbeln : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Sales Document Item'
  key ItemNo : String(6) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Path'
  key Path : String(50) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Service Profile'
  key ServProfile : String(40) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Parameter Type'
  key ParamType : String(20) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Service Parameter'
  key ServiceParam : String(20) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Service Parameter'
  key clause_code : String(20) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Sales Document Item'
  key Posnr : String(6) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Document Type'
  key DocType : String(1) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Calculated Value'
  calculated_value : String(20);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Parameter Value'
  @sap.quickinfo : 'Service Parameter Value'
  ParamValue : String(50);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Delivery Point'
  DeliveryPt : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Redelivery Point'
  RedeliveryPt : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales Contract Descr'
  @sap.quickinfo : 'Sales Contract Description'
  SalesDesc : String(20);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  Material : String(40);
  @sap.label : 'Order Unit'
  @sap.quickinfo : 'Purchase Order Unit of Measure'
  @sap.semantics : 'unit-of-measure'
  UoM : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Customer'
  @sap.quickinfo : 'Customer Number'
  Kunnr : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  Matnr : String(40);
  @sap.label : 'Short Text'
  Arktx : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Purchasing Doc. Type'
  @sap.quickinfo : 'Purchasing Document Type'
  auart : String(4);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Fetch data for nomination gas day'
entity GMSNOMCP_GMS_SRV.xGMSxNomination_gasday {
  @sap.display.format : 'Date'
  @sap.label : 'Gas Day'
  @sap.quickinfo : 'Gas Day Date'
  key Gas_day : Date not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales document'
  @sap.quickinfo : 'Sales Document'
  key vbeln : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Sales Document Item'
  key posnr : String(6) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Version'
  key versn : String(3) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Delivery Point'
  key del_point : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Redelivery Point'
  @sap.quickinfo : 'Re-Delivery Ponit'
  key redel_point : String(20) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales Document Type'
  auart : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sold-To Party'
  kunnr : String(10);
  @sap.label : 'Daily ContractQty'
  @sap.quickinfo : 'DCQ'
  dcq : Decimal(13, 3);
  @sap.label : 'DNQ'
  @sap.quickinfo : 'daily nomination Quantity'
  pdnq : Decimal(13, 3);
  uom1 : String(3);
  uom2 : String(3);
  DocType : String(1);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Event and gasday from nom'
entity GMSNOMCP_GMS_SRV.xGMSxNom_Event {
  @sap.display.format : 'Date'
  @sap.label : 'Gas Day'
  @sap.quickinfo : 'Gas Day Date'
  key Gasday : Date not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales document'
  @sap.quickinfo : 'Sales Document'
  key Vbeln : String(10) not null;
  @odata.Type : 'Edm.DateTimeOffset'
  @sap.label : 'Short Time Stamp'
  @sap.quickinfo : 'UTC Time Stamp in Short Form (YYYYMMDDhhmmss)'
  Timestamp : DateTime;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Event Type'
  @sap.quickinfo : 'Nomination Event'
  Event : String(40);
  @sap.label : 'Approved DNQ'
  Adnq : Decimal(13, 3);
  @sap.label : 'Daily ContractQty'
  @sap.quickinfo : 'DCQ'
  Dcq : Decimal(13, 3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Long comment'
  @sap.quickinfo : 'iSeries: Long comment of a table, view or table field'
  Remarks : String(255);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Past Nomination'
entity GMSNOMCP_GMS_SRV.xGMSxPast_Nom {
  @sap.display.format : 'Date'
  @sap.label : 'Gas Day'
  @sap.quickinfo : 'Gas Day Date'
  key Gasday : Date not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales document'
  @sap.quickinfo : 'Sales Document'
  key Vbeln : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Version'
  key Versn : String(3) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Nomination key'
  @sap.quickinfo : 'Nomination (technical) Key'
  Nomtk : String(20);
  @sap.display.format : 'UpperCase'
  @sap.text : 'Material_Description'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  Material : String(40);
  @sap.label : 'Material description'
  Material_Description : String(40);
  @sap.unit : 'PC7CC09063064497903FE229433F7C278'
  @sap.label : 'Approved DNQ'
  Adnq : Decimal(13, 3);
  @sap.unit : 'PC7CC09063064497903FE229433F7C278'
  @sap.label : 'RePublish DNQ'
  @sap.quickinfo : 'Re-Publish DNQ'
  Rpdnq : Decimal(13, 3);
  Uom4 : String(3);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Redelivey Point for nom'
entity GMSNOMCP_GMS_SRV.xGMSxredelivry_pointV {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Redelivery Point'
  @sap.quickinfo : 'Re-Delivery Ponit'
  key Redelivery_point : String(20) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'transport_value help for nom'
entity GMSNOMCP_GMS_SRV.xGMSxTRANSPORT_V {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Transport system'
  key Tranpor : String(10) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Contract Target Qty v/s Billed Qty'
entity GMSNOMCP_GMS_SRV.xGMSxTRGTVSBILL {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales document'
  @sap.quickinfo : 'Sales Document'
  key Contract : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Sales Document Item'
  key ContractItem : String(6) not null;
  @sap.unit : 'TargetQuantityUnit'
  @sap.label : 'Target Quantity'
  @sap.quickinfo : 'Target Quantity in Sales Units'
  TargetQuantity : Decimal(13, 3);
  @sap.label : 'Target Quantity UoM'
  @sap.semantics : 'unit-of-measure'
  TargetQuantityUnit : String(3);
  to_billqty : Association to many GMSNOMCP_GMS_SRV.xGMSxCBILLQTY {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Vendor, POrg, and Comp Code'
entity GMSNOMCP_GMS_SRV.xGMSxVendPurchOrgCo {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Vendor'
  @sap.quickinfo : 'Vendor''s account number'
  @sap.value.list : 'standard'
  key Supplier : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.text : 'PurchasingOrganizationName'
  @sap.label : 'Purch. organization'
  @sap.quickinfo : 'Purchasing organization'
  key PurchasingOrganization : String(4) not null;
  @sap.label : 'Purch. Org. Name'
  @sap.quickinfo : 'Purchasing Organization Name'
  PurchasingOrganizationName : String(20);
  @sap.display.format : 'UpperCase'
  @sap.text : 'PurchasingGroupName'
  @sap.label : 'Purchasing Group'
  PurchasingGroup : String(3);
  @sap.label : 'Purchasing Grp Name'
  @sap.quickinfo : 'Purchasing Group Name'
  PurchasingGroupName : String(18);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Company Code'
  CompanyCode : String(4);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.searchable : 'true'
@sap.content.version : '1'
@sap.label : 'Business Area'
@sap.value.list : 'true'
entity GMSNOMCP_GMS_SRV.I_BusinessAreaStdVH {
  @sap.display.format : 'UpperCase'
  @sap.text : 'BusinessArea_Text'
  @sap.label : 'Business Area'
  key BusinessArea : String(4) not null;
  @sap.label : 'BA Description'
  @sap.quickinfo : 'Business Area Description'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  BusinessArea_Text : String(30);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.searchable : 'true'
@sap.content.version : '1'
@sap.label : 'Material'
@sap.value.list : 'true'
entity GMSNOMCP_GMS_SRV.I_MaterialStdVH {
  @sap.display.format : 'UpperCase'
  @sap.text : 'Material_Text'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  key Material : String(40) not null;
  @sap.label : 'Material description'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  Material_Text : String(40);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Material Text'
entity GMSNOMCP_GMS_SRV.I_MaterialText {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  key Material : String(40) not null;
  @sap.label : 'Language Key'
  key Language : String(2) not null;
  @sap.label : 'Material description'
  MaterialName : String(40);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Purchase Contract Item'
entity GMSNOMCP_GMS_SRV.I_PurchaseContractItem {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Purchase Contract'
  @sap.quickinfo : 'Purchasing Contract Header'
  key PurchaseContract : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Item'
  @sap.quickinfo : 'Item Number of Purchasing Contract'
  key PurchaseContractItem : String(5) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Document Item'
  @sap.quickinfo : 'Concatenation of EBELN and EBELP'
  PurchaseContractItemUniqueID : String(15);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  Material : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material number'
  ManufacturerMaterial : String(40);
  @sap.label : 'Short Text'
  PurchaseContractItemText : String(40);
  @sap.unit : 'DocumentCurrency'
  @sap.label : 'Net Order Price'
  @sap.quickinfo : 'Net Price in Purchasing Document (in Document Currency)'
  ContractNetPriceAmount : Decimal(12, 3);
  @sap.label : 'Order Price Unit'
  @sap.quickinfo : 'Order Price Unit (Purchasing)'
  @sap.semantics : 'unit-of-measure'
  OrderPriceUnit : String(3);
  @sap.label : 'Volume unit'
  @sap.semantics : 'unit-of-measure'
  VolumeUnit : String(3);
  @sap.label : 'Order Unit'
  @sap.quickinfo : 'Purchase Order Unit of Measure'
  @sap.semantics : 'unit-of-measure'
  OrderQuantityUnit : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material Group'
  MaterialGroup : String(9);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Customer'
  Customer : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Supplier'
  @sap.quickinfo : 'Supplier to be Supplied/Who is to Receive Delivery'
  Subcontractor : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Reference Address'
  @sap.quickinfo : 'Reference Delivery Address'
  ReferenceDeliveryAddressID : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Address'
  @sap.quickinfo : 'Manual address number in purchasing document item'
  ManualDeliveryAddressID : String(10);
  @sap.label : 'Address'
  @sap.quickinfo : 'Contact Card Address (with output conversion)'
  DeliveryAddressID : String(200);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Plant'
  Plant : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Storage Location'
  StorageLocation : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Acct Assignment Cat.'
  @sap.quickinfo : 'Account Assignment Category'
  AccountAssignmentCategory : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Goods receipt'
  @sap.quickinfo : 'Goods Receipt Indicator'
  GoodsReceiptIsExpected : Boolean;
  @sap.unit : 'OrderPriceUnit'
  @sap.label : 'Price Unit'
  NetPriceQuantity : Decimal(5, 0);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Distrib. Indicator'
  @sap.quickinfo : 'Distribution Indicator for Multiple Account Assignment'
  MultipleAcctAssgmtDistribution : String(1);
  @sap.unit : 'OrderQuantityUnit'
  @sap.label : 'Target Quantity'
  TargetQuantity : Decimal(13, 3);
  @sap.unit : 'DocumentCurrency'
  @sap.label : 'OA Target Value'
  @sap.quickinfo : 'Target Value for Outline Agreement in Document Currency'
  TargetAmount : Decimal(14, 3);
  @sap.label : 'Currency'
  @sap.quickinfo : 'Currency Key'
  @sap.semantics : 'currency-code'
  DocumentCurrency : String(5);
  @sap.label : 'Quantity Conversion'
  @sap.quickinfo : 'Denominator for Conv. of Order Price Unit into Order Unit'
  OrdPriceUnitToOrderUnitDnmntr : Decimal(5, 0);
  @sap.label : 'Qty. Conv. Numerator'
  @sap.quickinfo : 'Numerator for Conversion of Order Price Unit into Order Unit'
  OrderPriceUnitToOrderUnitNmrtr : Decimal(5, 0);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Item category'
  @sap.quickinfo : 'Item category in purchasing document'
  PurchasingDocumentItemCategory : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Supplier Mat. No.'
  @sap.quickinfo : 'Material Number Used by Supplier'
  SupplierMaterialNumber : String(35);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Eval. receipt sett.'
  @sap.quickinfo : 'Evaluated Receipt Settlement (ERS)'
  EvaldRcptSettlmtIsAllowed : Boolean;
  @sap.label : 'Underdel. Tolerance'
  @sap.quickinfo : 'Underdelivery Tolerance'
  UnderdelivTolrtdLmtRatioInPct : Decimal(3, 1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Print Price'
  @sap.quickinfo : 'Price Printout'
  PriceIsToBePrinted : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Confirmation Control'
  @sap.quickinfo : 'Confirmation Control Key'
  ConfirmationControl : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Confirmation Control'
  @sap.quickinfo : 'Confirmation Control Key'
  SupplierConfirmationControlKey : String(4);
  @sap.label : 'Overdeliv. Tolerance'
  @sap.quickinfo : 'Overdelivery Tolerance'
  OverdelivTolrtdLmtRatioInPct : Decimal(3, 1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Unltd Overdelivery'
  @sap.quickinfo : 'Indicator: Unlimited Overdelivery Allowed'
  UnlimitedOverdeliveryIsAllowed : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Invoice receipt'
  @sap.quickinfo : 'Invoice receipt indicator'
  InvoiceIsExpected : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'GR-Based Inv. Verif.'
  @sap.quickinfo : 'Indicator: GR-Based Invoice Verification'
  InvoiceIsGoodsReceiptBased : Boolean;
  @sap.display.format : 'Date'
  @sap.label : 'Price Date'
  @sap.quickinfo : 'Date of Price Determination'
  PurgDocPriceDate : Date;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Info Record Update'
  @sap.quickinfo : 'Indicator: Update Info Record'
  IsInfoRecordUpdated : String(1);
  @sap.label : 'Stand.rel.order.qty.'
  @sap.quickinfo : 'Standard release order quantity'
  PurgDocReleaseOrderQuantity : Decimal(13, 3);
  @sap.label : 'Order Acknowledgment'
  @sap.quickinfo : 'Order Acknowledgment Number'
  PurgDocOrderAcknNumber : String(20);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Estimated Price'
  @sap.quickinfo : 'Indicator: Estimated Price'
  PurgDocEstimatedPrice : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'InfoAtReg.'
  @sap.quickinfo : 'Info at Registration'
  IsInfoAtRegistration : Boolean;
  @sap.label : '1st Reminder/Exped.'
  @sap.quickinfo : 'Number of Days for First Reminder/Expediter'
  NoDaysReminder1 : Decimal(3, 0);
  @sap.label : '2nd Reminder/Exped.'
  @sap.quickinfo : 'Number of Days for Second Reminder/Expediter'
  NoDaysReminder2 : Decimal(3, 0);
  @sap.label : '3rd Reminder/Exped.'
  @sap.quickinfo : 'Number of Days for Third Reminder/Expediter'
  NoDaysReminder3 : Decimal(3, 0);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Stock Type'
  StockType : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Tax Code'
  @sap.quickinfo : 'Tax on sales/purchases code'
  TaxCode : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Req. Tracking Number'
  @sap.quickinfo : 'Requirement Tracking Number'
  RequirementTracking : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Acknowledgment Reqd'
  @sap.quickinfo : 'Order Acknowledgment Requirement'
  IsOrderAcknRqd : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Shipping Instr.'
  @sap.quickinfo : 'Shipping Instructions'
  ShippingInstruction : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'GR non-valuated'
  @sap.quickinfo : 'Goods Receipt, Non-Valuated'
  GoodsReceiptIsNonValuated : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Service Performer'
  ServicePerformer : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Product Type Group'
  ProductType : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material type'
  MaterialType : String(4);
  FormattedPurchaseContractItem : String(15);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Deletion indicator'
  @sap.quickinfo : 'Deletion indicator in purchasing document'
  PurchasingContractDeletionCode : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Purchase Requisition'
  @sap.quickinfo : 'Purchase Requisition Number'
  PurchaseRequisition : String(10);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Item of requisition'
  @sap.quickinfo : 'Item number of purchase requisition'
  PurchaseRequisitionItem : String(5);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Partial invoice'
  @sap.quickinfo : 'Partial invoice indicator'
  PartialInvoiceDistribution : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Mfr Part Number'
  @sap.quickinfo : 'Manufacturer Part Number'
  ManufacturerPartNmbr : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Manufacturer'
  @sap.quickinfo : 'Manufacturer number'
  Manufacturer : String(10);
  @sap.display.format : 'UpperCase'
  @sap.text : 'PurgCatName'
  @sap.label : 'Purchasing Category'
  @sap.quickinfo : 'Purchasing Category ID'
  PurchasingCategory : String(20);
  @sap.label : 'Purchasing Cat. Name'
  @sap.quickinfo : 'Name of Purchasing Category'
  PurgCatName : String(60);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Purchasing Doc. Type'
  @sap.quickinfo : 'Purchasing Document Type'
  PurchaseContractType : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Purch. organization'
  @sap.quickinfo : 'Purchasing organization'
  PurchasingOrganization : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Purchasing Group'
  PurchasingGroup : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Stock Segment'
  StockSegment : String(40);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.semantics : 'aggregate'
@sap.label : 'Sales Contract Item'
entity GMSNOMCP_GMS_SRV.I_SalesContractItem {
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key ID : LargeString not null;
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales Contract'
  @sap.value.list : 'standard'
  SalesContract : String(10);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'NonNegative'
  @sap.text : 'SalesContractItemText'
  @sap.label : 'Sales Contract Item'
  SalesContractItem : String(6);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Item category'
  @sap.quickinfo : 'Sales document item category'
  SalesContractItemCategory : String(4);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Item Type'
  SalesDocumentItemType : String(1);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Returns'
  @sap.quickinfo : 'Returns Item'
  IsReturnsItem : Boolean;
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Completion Rule'
  @sap.quickinfo : 'Completion Rule for Quotation / Contract'
  CompletionRule : String(1);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Created by'
  @sap.quickinfo : 'Name of Person who Created the Object'
  CreatedByUser : String(12);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'Date'
  @sap.label : 'Created on'
  @sap.quickinfo : 'Date on which the record was created'
  CreationDate : Date;
  @sap.aggregation.role : 'dimension'
  @sap.label : 'Created At'
  @sap.quickinfo : 'Time at Which Record Was Created'
  CreationTime : Time;
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'Date'
  @sap.label : 'Changed On'
  @sap.quickinfo : 'Date of Last Change'
  LastChangeDate : Date;
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Division'
  Division : String(2);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.text : 'Material_Text'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  @sap.value.list : 'standard'
  Material : String(40);
  @sap.label : 'Material description'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  Material_Text : String(40);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.text : 'OriginallyRequestedMaterial_Text'
  @sap.label : 'Material Entered'
  @sap.quickinfo : 'Material entered'
  @sap.value.list : 'standard'
  OriginallyRequestedMaterial : String(40);
  @sap.label : 'Material description'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  OriginallyRequestedMaterial_Text : String(40);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Customer Material'
  @sap.quickinfo : 'Material Number Used by Customer'
  MaterialByCustomer : String(35);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'EAN/UPC'
  @sap.quickinfo : 'International Article Number (EAN/UPC)'
  InternationalArticleNumber : String(18);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Batch'
  @sap.quickinfo : 'Batch Number'
  Batch : String(10);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Product hierarchy'
  ProductHierarchyNode : String(18);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Catalog'
  @sap.quickinfo : 'Product catalog number'
  ProductCatalog : String(10);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Substitution Reason'
  @sap.quickinfo : 'Reason for material substitution'
  MaterialSubstitutionReason : String(4);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material Group'
  MaterialGroup : String(9);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material Price Grp'
  @sap.quickinfo : 'Material Price Group'
  MaterialPricingGroup : String(2);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material Group 1'
  @sap.quickinfo : 'Material group 1'
  AdditionalMaterialGroup1 : String(3);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material Group 2'
  @sap.quickinfo : 'Material group 2'
  AdditionalMaterialGroup2 : String(3);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material Group 3'
  @sap.quickinfo : 'Material group 3'
  AdditionalMaterialGroup3 : String(3);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material Group 4'
  @sap.quickinfo : 'Material group 4'
  AdditionalMaterialGroup4 : String(3);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material Group 5'
  @sap.quickinfo : 'Material group 5'
  AdditionalMaterialGroup5 : String(3);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Plant'
  @sap.quickinfo : 'Plant (Own or External)'
  Plant : String(4);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Storage location'
  StorageLocation : String(4);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'NonNegative'
  @sap.label : 'Configuration'
  ProductConfiguration : String(18);
  @sap.label : 'Item Description'
  @sap.quickinfo : 'Short text for sales order item'
  SalesContractItemText : String(40);
  @sap.aggregation.role : 'dimension'
  @sap.label : 'Customer Reference'
  PurchaseOrderByCustomer : String(35);
  @sap.aggregation.role : 'measure'
  @sap.unit : 'OrderQuantityUnit'
  @sap.label : 'Order Quantity'
  @sap.quickinfo : 'Cumulative order quantity in sales units'
  @sap.filterable : 'false'
  OrderQuantity : Decimal(15, 3);
  @sap.aggregation.role : 'dimension'
  @sap.label : 'Sales unit'
  @sap.semantics : 'unit-of-measure'
  OrderQuantityUnit : String(3);
  @sap.aggregation.role : 'dimension'
  @sap.label : 'Denominator'
  @sap.quickinfo : 'Denominator (Divisor) for Conversion of Sales Qty into SKU'
  OrderToBaseQuantityDnmntr : Decimal(5, 0);
  @sap.aggregation.role : 'dimension'
  @sap.label : 'Numerator'
  @sap.quickinfo : 'Numerator (factor) for conversion of sales quantity into SKU'
  OrderToBaseQuantityNmrtr : Decimal(5, 0);
  @sap.aggregation.role : 'dimension'
  @sap.label : 'Base Unit of Measure'
  @sap.semantics : 'unit-of-measure'
  BaseUnit : String(3);
  @sap.aggregation.role : 'measure'
  @sap.unit : 'TargetQuantityUnit'
  @sap.label : 'Target Quantity'
  @sap.quickinfo : 'Target Quantity in Sales Units'
  @sap.filterable : 'false'
  TargetQuantity : Decimal(13, 3);
  @sap.aggregation.role : 'dimension'
  @sap.label : 'Target Quantity UoM'
  @sap.semantics : 'unit-of-measure'
  TargetQuantityUnit : String(3);
  @sap.aggregation.role : 'dimension'
  @sap.label : 'Conversion Factor'
  @sap.quickinfo : 'Factor for Converting Sales Units to Base Units (Target Qty)'
  TargetToBaseQuantityDnmntr : Decimal(5, 0);
  @sap.aggregation.role : 'dimension'
  @sap.label : 'Conversion Factor'
  @sap.quickinfo : 'Factor for Converting Sales Units to Base Units (Target Qty)'
  TargetToBaseQuantityNmrtr : Decimal(5, 0);
  @sap.aggregation.role : 'measure'
  @sap.unit : 'RequestedQuantityUnit'
  @sap.label : 'Requested Quantity'
  @sap.filterable : 'false'
  RequestedQuantity : Decimal(15, 3);
  @sap.aggregation.role : 'dimension'
  @sap.label : 'Requested Qty Unit'
  @sap.quickinfo : 'Requested Quantity Unit'
  @sap.semantics : 'unit-of-measure'
  RequestedQuantityUnit : String(3);
  @sap.aggregation.role : 'measure'
  @sap.unit : 'BaseUnit'
  @sap.label : 'Requ.SalesOrder Qty.'
  @sap.quickinfo : 'Requested Order Quantity in Base Unit'
  @sap.filterable : 'false'
  RequestedQuantityInBaseUnit : Decimal(15, 3);
  @sap.aggregation.role : 'measure'
  @sap.unit : 'ItemWeightUnit'
  @sap.label : 'Gross Weight'
  @sap.quickinfo : 'Gross Weight of the Item'
  @sap.filterable : 'false'
  ItemGrossWeight : Decimal(15, 3);
  @sap.aggregation.role : 'measure'
  @sap.unit : 'ItemWeightUnit'
  @sap.label : 'Net Weight'
  @sap.quickinfo : 'Net Weight of the Item'
  @sap.filterable : 'false'
  ItemNetWeight : Decimal(15, 3);
  @sap.aggregation.role : 'dimension'
  @sap.label : 'Weight unit'
  @sap.quickinfo : 'Weight Unit'
  @sap.semantics : 'unit-of-measure'
  ItemWeightUnit : String(3);
  @sap.aggregation.role : 'measure'
  @sap.unit : 'ItemVolumeUnit'
  @sap.label : 'Volume'
  @sap.quickinfo : 'Volume of the item'
  @sap.filterable : 'false'
  ItemVolume : Decimal(15, 3);
  @sap.aggregation.role : 'dimension'
  @sap.label : 'Volume unit'
  @sap.semantics : 'unit-of-measure'
  ItemVolumeUnit : String(3);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'Date'
  @sap.label : 'Serv. Rendered Date'
  @sap.quickinfo : 'Date on which services are rendered'
  ServicesRenderedDate : Date;
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales District'
  SalesDistrict : String(6);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales Deal'
  @sap.quickinfo : 'Sales deal'
  @sap.value.list : 'standard'
  SalesDeal : String(10);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales Promotion'
  SalesPromotion : String(10);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Promotion'
  RetailPromotion : String(10);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Customer Group'
  CustomerGroup : String(2);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Reason for Rejection'
  @sap.quickinfo : 'Reason for Rejection of Sales Documents'
  SalesDocumentRjcnReason : String(2);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'NonNegative'
  @sap.label : 'Order Probability'
  @sap.quickinfo : 'Order Probability of the Item'
  ItemOrderProbabilityInPercent : String(3);
  @sap.aggregation.role : 'measure'
  @sap.unit : 'TransactionCurrency'
  @sap.label : 'OA Target Value'
  @sap.quickinfo : 'Target Value for Outline Agreement in Document Currency'
  @sap.filterable : 'false'
  OutlineAgreementTargetAmount : Decimal(14, 3);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'Date'
  @sap.label : 'Contract Start Date'
  SalesContractValidityStartDate : Date;
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'Date'
  @sap.label : 'Contract End Date'
  SalesContractValidityEndDate : Date;
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'NonNegative'
  @sap.label : 'Contract Val.Period'
  @sap.quickinfo : 'Validity Period of Contract'
  NmbrOfSalesContractValdtyPerd : String(3);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Unit Validity Period'
  @sap.quickinfo : 'Unit of Validity Period of Contract'
  SalesContractValidityPerdUnit : String(1);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Val.Period.Category'
  @sap.quickinfo : 'Validity Period Category of Contract'
  SalesContractValidityPerdCat : String(2);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'Date'
  @sap.label : 'Contract Signed'
  @sap.quickinfo : 'Date on Which Contract Is Signed'
  SalesContractSignedDate : Date;
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'Date'
  @sap.label : 'Installation Date'
  EquipmentInstallationDate : Date;
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'Date'
  @sap.label : 'Acceptance Date'
  @sap.quickinfo : 'Agreement Acceptance Date'
  EquipmentDeliveryAccptcDate : Date;
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'Date'
  @sap.label : 'Dismantling Date'
  EquipmentDismantlingDate : Date;
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Cancellation Proced.'
  @sap.quickinfo : 'Assignment Cancellation Procedure/Cancellation Rule'
  SalesContractCanclnProcedure : String(4);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'Date'
  @sap.label : 'Req.Cancellat.Date'
  @sap.quickinfo : 'Requested Cancellation Date'
  RequestedCancellationDate : Date;
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'Date'
  @sap.label : 'Receipt of Canc.'
  @sap.quickinfo : 'Date on Which Cancellation Request Was Received'
  SlsContractCanclnReqRcptDate : Date;
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Cancel.Doc.for Part.'
  @sap.quickinfo : 'Cancellation Document Number of Contract Partner'
  CanclnDocByContrPartner : String(20);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'Date'
  @sap.label : 'Date of Canc.Doc.'
  @sap.quickinfo : 'Date of Cancellation Document from Contract Partner'
  ContractPartnerCanclnDocDate : Date;
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Cancellation Party'
  SalesContractCanclnParty : String(1);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Reason for Cancel.'
  @sap.quickinfo : 'Reason for Cancellation of Contract'
  SalesContractCanclnReason : String(2);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Action'
  @sap.quickinfo : 'Action at end of contract'
  SalesContractFollowUpAction : String(4);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'Date'
  @sap.label : 'Action Date'
  @sap.quickinfo : 'Date for Action'
  SlsContractFollowUpActionDate : Date;
  @sap.aggregation.role : 'measure'
  @sap.unit : 'TransactionCurrency'
  @sap.label : 'Net Value'
  @sap.quickinfo : 'Net Value of the Order Item in Document Currency'
  @sap.filterable : 'false'
  NetAmount : Decimal(16, 3);
  @sap.aggregation.role : 'dimension'
  @sap.label : 'Document Currency'
  @sap.quickinfo : 'SD document currency'
  @sap.semantics : 'currency-code'
  TransactionCurrency : String(5);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'Date'
  @sap.label : 'Pricing Date'
  @sap.quickinfo : 'Date for Pricing and Exchange Rate'
  PricingDate : Date;
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'Date'
  @sap.label : 'Translation date'
  ExchangeRateDate : Date;
  @sap.aggregation.role : 'dimension'
  @sap.label : 'Exchange Rate'
  @sap.quickinfo : 'Exchange Rate for Price Determination'
  PriceDetnExchangeRate : Decimal(9, 5);
  @sap.aggregation.role : 'dimension'
  @sap.unit : 'TransactionCurrency'
  @sap.label : 'Net Price'
  NetPriceAmount : Decimal(12, 3);
  @sap.aggregation.role : 'dimension'
  @sap.unit : 'NetPriceQuantityUnit'
  @sap.label : 'Pricing Unit'
  @sap.quickinfo : 'Condition Pricing Unit'
  NetPriceQuantity : Decimal(5, 0);
  @sap.aggregation.role : 'dimension'
  @sap.label : 'Unit of Measure'
  @sap.quickinfo : 'Condition Unit'
  @sap.semantics : 'unit-of-measure'
  NetPriceQuantityUnit : String(3);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Statistical Value'
  @sap.quickinfo : 'Statistical Values'
  StatisticalValueControl : String(1);
  @sap.aggregation.role : 'dimension'
  @sap.unit : 'TransactionCurrency'
  @sap.label : 'Tax Amount'
  @sap.quickinfo : 'Tax amount in document currency'
  TaxAmount : Decimal(14, 3);
  @sap.aggregation.role : 'dimension'
  @sap.unit : 'TransactionCurrency'
  @sap.label : 'Cost'
  @sap.quickinfo : 'Cost in document currency'
  CostAmount : Decimal(14, 3);
  @sap.aggregation.role : 'dimension'
  @sap.unit : 'TransactionCurrency'
  @sap.label : 'Subtotal 1'
  @sap.quickinfo : 'Subtotal 1 from pricing procedure for condition'
  Subtotal1Amount : Decimal(14, 3);
  @sap.aggregation.role : 'dimension'
  @sap.unit : 'TransactionCurrency'
  @sap.label : 'Subtotal 2'
  @sap.quickinfo : 'Subtotal 2 from pricing procedure for condition'
  Subtotal2Amount : Decimal(14, 3);
  @sap.aggregation.role : 'dimension'
  @sap.unit : 'TransactionCurrency'
  @sap.label : 'Subtotal 3'
  @sap.quickinfo : 'Subtotal 3 from pricing procedure for condition'
  Subtotal3Amount : Decimal(14, 3);
  @sap.aggregation.role : 'dimension'
  @sap.unit : 'TransactionCurrency'
  @sap.label : 'Subtotal 4'
  @sap.quickinfo : 'Subtotal 4 from pricing procedure for condition'
  Subtotal4Amount : Decimal(14, 3);
  @sap.aggregation.role : 'dimension'
  @sap.unit : 'TransactionCurrency'
  @sap.label : 'Subtotal 5'
  @sap.quickinfo : 'Subtotal 5 from pricing procedure for condition'
  Subtotal5Amount : Decimal(14, 3);
  @sap.aggregation.role : 'dimension'
  @sap.unit : 'TransactionCurrency'
  @sap.label : 'Subtotal 6'
  @sap.quickinfo : 'Subtotal 6 from pricing procedure for condition'
  Subtotal6Amount : Decimal(14, 3);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.text : 'ShippingPoint_Text'
  @sap.label : 'Shipping Point'
  @sap.quickinfo : 'Shipping Point / Receiving Point'
  @sap.value.list : 'standard'
  ShippingPoint : String(4);
  @sap.label : 'Description'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ShippingPoint_Text : String(30);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Incoterms'
  @sap.quickinfo : 'Incoterms (Part 1)'
  IncotermsClassification : String(3);
  @sap.aggregation.role : 'dimension'
  @sap.label : 'Incoterms (Part 2)'
  IncotermsTransferLocation : String(28);
  @sap.aggregation.role : 'dimension'
  @sap.label : 'Incoterms Location 1'
  IncotermsLocation1 : String(70);
  @sap.aggregation.role : 'dimension'
  @sap.label : 'Incoterms Location 2'
  IncotermsLocation2 : String(70);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Incoterms Version'
  IncotermsVersion : String(4);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'Date'
  @sap.label : 'Billing Date'
  BillingDocumentDate : Date;
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Billing Block'
  @sap.quickinfo : 'Billing Block for Item'
  ItemBillingBlockReason : String(2);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Payment terms'
  @sap.quickinfo : 'Terms of payment key'
  CustomerPaymentTerms : String(4);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Payment Method'
  PaymentMethod : String(1);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'Date'
  @sap.label : 'Fixed Value Date'
  FixedValueDate : Date;
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'NonNegative'
  @sap.label : 'Addit. Value Days'
  @sap.quickinfo : 'Additional Value Days'
  AdditionalValueDays : String(2);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'NonNegative'
  @sap.label : 'Fiscal Year'
  FiscalYear : String(4);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'NonNegative'
  @sap.label : 'Posting period'
  FiscalPeriod : String(3);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Acct Assmt Grp Cust.'
  @sap.quickinfo : 'Account Assignment Group for this customer'
  CustomerAccountAssignmentGroup : String(2);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.text : 'BusinessArea_Text'
  @sap.label : 'Business Area'
  @sap.value.list : 'standard'
  BusinessArea : String(4);
  @sap.label : 'BA Description'
  @sap.quickinfo : 'Business Area Description'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  BusinessArea_Text : String(30);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Profit Center'
  ProfitCenter : String(10);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'NonNegative'
  @sap.label : 'WBS Element'
  @sap.quickinfo : 'Work Breakdown Structure Element (WBS Element)'
  WBSElement : String(24);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Order'
  @sap.quickinfo : 'Order Number'
  OrderID : String(12);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Object No.Item'
  @sap.quickinfo : 'Object Number at Item Level'
  ControllingObject : String(22);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'NonNegative'
  @sap.label : 'Profitab. Segmt No.'
  @sap.quickinfo : 'Profitability Segment Number (CO-PA)'
  ProfitabilitySegment : String(10);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Originating document'
  @sap.quickinfo : 'Originating Document'
  OriginSDDocument : String(10);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'NonNegative'
  @sap.label : 'Item'
  @sap.quickinfo : 'Originating item'
  OriginSDDocumentItem : String(6);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Reference document'
  @sap.quickinfo : 'Document number of the reference document'
  @sap.value.list : 'standard'
  ReferenceSDDocument : String(10);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'NonNegative'
  @sap.label : 'Reference Item'
  @sap.quickinfo : 'Item number of the reference item'
  @sap.value.list : 'standard'
  ReferenceSDDocumentItem : String(6);
  @sap.aggregation.role : 'dimension'
  @sap.label : 'Preceding Doc.Categ.'
  @sap.quickinfo : 'Document Category of Preceding SD Document'
  ReferenceSDDocumentCategory : String(4);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'NonNegative'
  @sap.label : 'Higher-Level Item'
  @sap.quickinfo : 'Higher-Level item in bill of material structures'
  HigherLevelItem : String(6);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Overall Status'
  @sap.quickinfo : 'Overall Processing Status (Item)'
  SDProcessStatus : String(1);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Item Data'
  @sap.quickinfo : 'Incompletion Status (Item)'
  ItemGeneralIncompletionStatus : String(1);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Item Billing Data...'
  @sap.quickinfo : 'Billing Incompletion Status (Item)'
  ItemBillingIncompletionStatus : String(1);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Pricing'
  @sap.quickinfo : 'Pricing Incompletion Status (Item)'
  PricingIncompletionStatus : String(1);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Item Data for Deliv.'
  @sap.quickinfo : 'Delivery Incompletion Status (Item)'
  ItemDeliveryIncompletionStatus : String(1);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Rejection Status'
  @sap.quickinfo : 'Rejection Status (Item)'
  SDDocumentRejectionStatus : String(1);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Reference Status'
  @sap.quickinfo : 'Overall Reference Status (Item)'
  TotalSDDocReferenceStatus : String(1);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Reference Status'
  @sap.quickinfo : 'Reference Status (Item)'
  SDDocReferenceStatus : String(1);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Requirement Segment'
  RequirementSegment : String(40);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Sales Contract'
@sap.value.list : 'true'
entity GMSNOMCP_GMS_SRV.I_SalesContractStdVH {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales Contract'
  key SalesContract : String(10) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Sales Deal'
@sap.value.list : 'true'
entity GMSNOMCP_GMS_SRV.I_SalesDealStdVH {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Agreement'
  @sap.quickinfo : 'Agreement (various conditions grouped together)'
  key SalesDeal : String(10) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Sales Document Item'
@sap.value.list : 'true'
entity GMSNOMCP_GMS_SRV.I_SalesDocumentItemStdVH {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales document'
  @sap.quickinfo : 'Sales Document'
  key SalesDocument : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.text : 'SalesDocumentItemText'
  @sap.label : 'Sales Document Item'
  key SalesDocumentItem : String(6) not null;
  @sap.label : 'Item Description'
  @sap.quickinfo : 'Short text for sales order item'
  SalesDocumentItemText : String(40);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Sales Document'
@sap.value.list : 'true'
entity GMSNOMCP_GMS_SRV.I_SalesDocumentStdVH {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales document'
  @sap.quickinfo : 'Sales Document'
  key SalesDocument : String(10) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Shipping Point'
@sap.value.list : 'true'
entity GMSNOMCP_GMS_SRV.I_ShippingPointStdVH {
  @sap.display.format : 'UpperCase'
  @sap.text : 'ShippingPoint_Text'
  @sap.label : 'Shipping Point'
  @sap.quickinfo : 'Shipping Point / Receiving Point'
  key ShippingPoint : String(4) not null;
  @sap.label : 'Description'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ShippingPoint_Text : String(30);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.searchable : 'true'
@sap.content.version : '1'
@sap.label : 'Value Help for Supplier'
@sap.value.list : 'true'
entity GMSNOMCP_GMS_SRV.I_Supplier_VH {
  @sap.display.format : 'UpperCase'
  @sap.text : 'SupplierName'
  @sap.label : 'Vendor'
  @sap.quickinfo : 'Account Number of Vendor or Creditor'
  key Supplier : String(10) not null;
  @sap.label : 'Name'
  @sap.quickinfo : 'Name 1'
  SupplierName : String(35);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Authorization'
  @sap.quickinfo : 'Authorization Group'
  AuthorizationGroup : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Account group'
  @sap.quickinfo : 'Vendor account group'
  SupplierAccountGroup : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Purpose Completed'
  @sap.quickinfo : 'Business Purpose Completed Flag'
  IsBusinessPurposeCompleted : String(1);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'zgmsnompudeliv2'
entity GMSNOMCP_GMS_SRV.zgmsnompudeliv2 {
  @sap.display.format : 'UpperCase'
  @sap.label : 'DocumentNo'
  @sap.quickinfo : 'Document Number'
  key Vbeln : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Sales Document Item'
  key ItemNo : String(6) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  key Material : String(40) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Service Profile'
  key ServProfile : String(40) not null;
  @sap.label : 'Material description'
  MaterialName : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Parameter Value'
  @sap.quickinfo : 'Service Parameter Value'
  DCQ : String(50);
  @sap.label : 'Target Quantity UoM'
  @sap.semantics : 'unit-of-measure'
  UOM : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Delivery Point'
  delivery_pt : String(10);
  to_dp : Association to many GMSNOMCP_GMS_SRV.znompudelivery {  };
  to_item : Association to many GMSNOMCP_GMS_SRV.ZNOMMASTER10 {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'NomMstr - ServItem'
entity GMSNOMCP_GMS_SRV.ZNOMMASTER10 {
  @sap.display.format : 'UpperCase'
  @sap.label : 'DocumentNo'
  @sap.quickinfo : 'Document Number'
  key Vbeln : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Sales Document Item'
  key ItemNo : String(6) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  key Material : String(40) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Service Parameter'
  key ClauseCode : String(20) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Path'
  key Path : String(50) not null;
  @sap.display.format : 'Date'
  @sap.label : 'Valid From'
  ValidFrom : Date;
  @sap.display.format : 'Date'
  @sap.label : 'Valid To'
  ValidTo : Date;
  @sap.label : 'Threshold Perc'
  @sap.quickinfo : 'Threshold Percentage'
  ThresholdP : Decimal(3, 0);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Service Parameter'
  ThreshRef : String(20);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Remark'
  @sap.quickinfo : 'Remarks'
  Remark : String(50);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Calculated Value'
  CalculatedValue : String(20);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Document Type'
  DocType : String(1);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Nomination Master - Supplier'
entity GMSNOMCP_GMS_SRV.ZNOMMASTER14 {
  @sap.display.format : 'UpperCase'
  @sap.text : 'SupplierName'
  @sap.label : 'Vendor'
  @sap.quickinfo : 'Account Number of Vendor or Creditor'
  key Customer : String(10) not null;
  @sap.label : 'Name of Supplier'
  CustomerName : String(80);
  @sap.display.format : 'UpperCase'
  @sap.text : 'CustomerName'
  @sap.label : 'Customer'
  @sap.quickinfo : 'Customer Number'
  CorrespondingCustomer : String(10);
  @sap.label : 'Name of Customer'
  CorrespondingCustomerName : String(80);
  to_contract : Association to many GMSNOMCP_GMS_SRV.ZNOMMASTER5 {  };
  to_vendpurchorg : Association to many GMSNOMCP_GMS_SRV.xGMSxVendPurchOrgCo {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Nomination Master - Exchange Agreement'
entity GMSNOMCP_GMS_SRV.ZNOMMASTER15 {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Exchange number'
  @sap.quickinfo : 'Exchange agreement number'
  key ExchangeAgreement : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Purchasing Document'
  @sap.quickinfo : 'Purchasing Document Number'
  key PurchasingDocument : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales document'
  @sap.quickinfo : 'Sales Document'
  key SalesDocument : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Purch. organization'
  @sap.quickinfo : 'Purchasing organization'
  PurchasingOrganization : String(4);
  @sap.display.format : 'Date'
  @sap.label : 'Validity Per. Start'
  @sap.quickinfo : 'Start of Validity Period'
  ValidFrom : Date;
  @sap.display.format : 'Date'
  @sap.label : 'Validity Period End'
  @sap.quickinfo : 'End of Validity Period'
  ValidTo : Date;
  @sap.display.format : 'Date'
  @sap.label : 'Created on'
  @sap.quickinfo : 'Date on which the record was created'
  PurchaseContractCreationDate : Date;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Created by'
  @sap.quickinfo : 'Name of Person who Created the Object'
  PurchaseContractCreatedByUser : String(12);
  @sap.label : 'Text'
  @sap.quickinfo : 'Text (80 Characters)'
  PurchaseContractText : String(80);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales Organization'
  SalesOrganization : String(4);
  @sap.display.format : 'Date'
  @sap.label : 'Created on'
  @sap.quickinfo : 'Date on which the record was created'
  SalesContractCreationDate : Date;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Created by'
  @sap.quickinfo : 'Name of Person who Created the Object'
  SalesContractCreatedByUser : String(12);
  @sap.label : 'Text'
  @sap.quickinfo : 'Text (80 Characters)'
  SalesContractText : String(80);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'NomMstr - ServHeader & VBAK-EKKO Combine'
entity GMSNOMCP_GMS_SRV.ZNOMMASTER5 {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales document'
  @sap.quickinfo : 'Sales Document'
  key Vbeln : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.text : 'CustomerName'
  @sap.label : 'Customer'
  @sap.quickinfo : 'Customer Number'
  key Customer : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Purchasing Document'
  @sap.quickinfo : 'Purchasing Document Number'
  Vbeln_p : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales document'
  @sap.quickinfo : 'Sales Document'
  Vbeln_s : String(10);
  @sap.label : 'Name of Customer'
  CustomerName : String(80);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales Document Type'
  Auart : String(4);
  @sap.display.format : 'Date'
  @sap.label : 'Valid-From Date'
  @sap.quickinfo : 'Valid-From Date (Outline Agreements, Product Proposals)'
  ValidFrom : Date;
  @sap.display.format : 'Date'
  @sap.label : 'Valid-To Date'
  @sap.quickinfo : 'Valid-To Date (Outline Agreements, Product Proposals)'
  ValidTo : Date;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales Contract Descr'
  @sap.quickinfo : 'Sales Contract Description'
  ContractDescription : String(20);
  DocType : String(1);
  to_exchange_p : Association to GMSNOMCP_GMS_SRV.ZNOMMASTER15 {  };
  to_exchange_s : Association to GMSNOMCP_GMS_SRV.ZNOMMASTER15 {  };
  to_material : Association to many GMSNOMCP_GMS_SRV.ZNOMMASTER6 {  };
  to_tgtQty_P : Association to many GMSNOMCP_GMS_SRV.I_PurchaseContractItem {  };
  to_tgtQty_S : Association to many GMSNOMCP_GMS_SRV.I_SalesContractItem {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Nomination Master - ServHeader(Material)'
entity GMSNOMCP_GMS_SRV.ZNOMMASTER6 {
  @sap.display.format : 'UpperCase'
  @sap.label : 'DocumentNo'
  @sap.quickinfo : 'Document Number'
  key Vbeln : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Sales Document Item'
  key ItemNo : String(6) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  key Material : String(40) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Service Profile'
  key ServProfile : String(40) not null;
  @sap.label : 'Material description'
  MaterialName : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Parameter Value'
  @sap.quickinfo : 'Service Parameter Value'
  DCQ : String(50);
  @sap.label : 'Target Quantity UoM'
  @sap.semantics : 'unit-of-measure'
  UOM : String(3);
  to_dp : Association to many GMSNOMCP_GMS_SRV.zgmsnompudeliv2 {  };
  to_item : Association to many GMSNOMCP_GMS_SRV.ZNOMMASTER10 {  };
  to_rdp : Association to many GMSNOMCP_GMS_SRV.ZNOMMASTER7 {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Nomination Master - Contract Header(RDP)'
entity GMSNOMCP_GMS_SRV.ZNOMMASTER7 {
  @sap.display.format : 'UpperCase'
  @sap.label : 'DocumentNo'
  @sap.quickinfo : 'Document Number'
  key Vbeln : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  key Material : String(40) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Sales Document Item'
  key ItemNo : String(6) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Redelivery Point'
  key RedeliveryPt : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Delivery Point'
  key DeliveryPt : String(10) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Nomination Master - Customer'
entity GMSNOMCP_GMS_SRV.ZNOMMASTER8 {
  @sap.display.format : 'UpperCase'
  @sap.text : 'CustomerName'
  @sap.label : 'Customer'
  @sap.quickinfo : 'Customer Number'
  key Customer : String(10) not null;
  @sap.label : 'Name of Customer'
  CustomerName : String(80);
  @sap.display.format : 'UpperCase'
  @sap.text : 'SupplierName'
  @sap.label : 'Vendor'
  @sap.quickinfo : 'Account Number of Vendor or Creditor'
  Supplier : String(10);
  @sap.label : 'Name of Supplier'
  SupplierName : String(80);
  to_contract : Association to many GMSNOMCP_GMS_SRV.ZNOMMASTER5 {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'znommaster_customer'
entity GMSNOMCP_GMS_SRV.znommaster_customer {
  @sap.display.format : 'UpperCase'
  @sap.label : 'DocumentNo'
  @sap.quickinfo : 'Document Number'
  key Vbeln : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Sales Document Item'
  key ItemNo : String(6) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  key Material : String(40) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Service Profile'
  key ServProfile : String(40) not null;
  @sap.label : 'Material description'
  MaterialName : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Parameter Value'
  @sap.quickinfo : 'Service Parameter Value'
  DCQ : String(50);
  @sap.label : 'Target Quantity UoM'
  @sap.semantics : 'unit-of-measure'
  UOM : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Customer'
  @sap.quickinfo : 'Customer Number'
  Customer : String(10);
  @sap.label : 'Name of Customer'
  CustomerName : String(80);
  to_dp : Association to many GMSNOMCP_GMS_SRV.zgmsnompudeliv2 {  };
  to_item : Association to many GMSNOMCP_GMS_SRV.ZNOMMASTER10 {  };
  to_rdp : Association to many GMSNOMCP_GMS_SRV.ZNOMMASTER7 {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Nom purc_deliv'
entity GMSNOMCP_GMS_SRV.znompudelivery {
  @sap.display.format : 'UpperCase'
  @sap.label : 'DocumentNo'
  @sap.quickinfo : 'Document Number'
  key Vbeln : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Sales Document Item'
  key ItemNo : String(6) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  key Material : String(40) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Delivery Point'
  DeliveryPt : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Redelivery Point'
  RedeliveryPt : String(10);
};

