/* checksum : 7a51bc1cc426c40f479fef8d3d8cb39b */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service ZNOM_CREATE_SRV {};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity ZNOM_CREATE_SRV.nomi_SaveSet {
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Gas Day'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Gasday : Timestamp not null;
  @sap.unicode : 'false'
  @sap.label : 'Sales Document'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Vbeln : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Item'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ItemNo : String(6);
  @sap.unicode : 'false'
  @sap.label : 'Item for Nomination'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  NomItem : String(5);
  @sap.unicode : 'false'
  @sap.label : 'Version'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Versn : String(3);
  @sap.unicode : 'false'
  @sap.label : 'Delivery Point'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  DeliveryPoint : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Redelivery Point'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  RedelivryPoint : String(20);
  @sap.unicode : 'false'
  @sap.label : 'time custom'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ValidTo : Time;
  @sap.unicode : 'false'
  @sap.label : 'time custom'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ValidFrom : Time;
  @sap.unicode : 'false'
  @sap.label : 'Material'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Material : String(40);
  @odata.Type : 'Edm.DateTime'
  @sap.unicode : 'false'
  @sap.label : 'Time Stamp'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Timestamp : DateTime;
  @sap.unicode : 'false'
  @sap.label : 'Nomination key'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Nomtk : String(20);
  @sap.unicode : 'false'
  @sap.label : 'Sold-To Party'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Kunnr : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Sales Doc. Type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Auart : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Daily ContractQty'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Ddcq : Decimal(13, 3);
  @sap.unicode : 'false'
  @sap.label : 'RDCQ'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Rdcq : Decimal(13, 3);
  @sap.unicode : 'false'
  @sap.label : 'Unit of Measure'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  @sap.semantics : 'unit-of-measure'
  Uom1 : String(3);
  @sap.unicode : 'false'
  @sap.label : 'DNQ'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Pdnq : Decimal(13, 3);
  @sap.unicode : 'false'
  @sap.label : 'Event Type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Event : String(40);
  @sap.unicode : 'false'
  @sap.label : 'Approved DNQ'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Adnq : Decimal(13, 3);
  @sap.unicode : 'false'
  @sap.label : 'RePublish DNQ'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Rpdnq : Decimal(13, 3);
  @sap.unicode : 'false'
  @sap.label : 'Nomination Number'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Znomtk : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Source'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Src : String(3);
  @sap.unicode : 'false'
  @sap.label : 'Long comment'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Remarks : String(255);
  @sap.unicode : 'false'
  @sap.label : 'Nom. Flag'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Flag : String(6);
  @sap.unicode : 'false'
  @sap.label : 'Action'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Action : String(1);
  @sap.unicode : 'false'
  @sap.label : 'Path'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Path : String(20);
  @sap.unicode : 'false'
  @sap.label : 'Customer Group'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  CustGrp : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Service Profile'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  SrvProfile : String(20);
  @sap.unicode : 'false'
  @sap.label : 'time custom'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Time2 : Time;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity ZNOM_CREATE_SRV.znom_headSet {
  @sap.unicode : 'false'
  @sap.label : 'Sales Document'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Vbeln : String(10) not null;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Gas Day'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Gasday : Timestamp;
  nomi_toitem : Association to many ZNOM_CREATE_SRV.nomi_SaveSet {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Create Nomination Data'
entity ZNOM_CREATE_SRV.ZNOMCPDATA {
  @sap.display.format : 'Date'
  @sap.label : 'Gas Day'
  @sap.quickinfo : 'Gas Day Date'
  key Gasday : Date not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales document'
  @sap.quickinfo : 'Sales Document'
  key Vbeln : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Sales Document Item'
  ItemNo : String(6);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Item Nomination'
  @sap.quickinfo : 'Item for Nomination'
  NomItem : String(5);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Version'
  Versn : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Delivery Point'
  DeliveryPoint : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Redelivery Point'
  @sap.quickinfo : 'Re-Delivery Ponit'
  RedelivryPoint : String(20);
  @sap.label : 'Time To'
  @sap.quickinfo : 'Time for Nomination'
  ValidTo : Time;
  @sap.label : 'Time From'
  ValidFrom : Time;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  Material : String(40);
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
  @sap.label : 'Daily ContractQty'
  @sap.quickinfo : 'DCQ'
  Ddcq : Decimal(13, 3);
  @sap.label : 'RDCQ'
  @sap.quickinfo : 'RE-DELIVERY DCQ'
  Rdcq : Decimal(13, 3);
  Uom1 : String(3);
  @sap.label : 'DNQ'
  @sap.quickinfo : 'daily nomination Quantity'
  Pdnq : Decimal(13, 3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Event Type'
  @sap.quickinfo : 'Nomination Event'
  Event : String(40);
  @sap.label : 'Approved DNQ'
  Adnq : Decimal(13, 3);
  @sap.label : 'RePublish DNQ'
  @sap.quickinfo : 'Re-Publish DNQ'
  Rpdnq : Decimal(13, 3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Nomination Number'
  Znomtk : String(10);
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
  @sap.display.format : 'UpperCase'
  @sap.label : 'Path'
  Path : String(20);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Customer Group'
  CustGrp : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Service Profile'
  SrvProfile : String(20);
  @sap.label : 'Valid To Time'
  @sap.quickinfo : 'time custom'
  Time2 : Time;
  @sap.display.format : 'UpperCase'
  @sap.label : 'createdby'
  Createdby : String(15);
  @sap.display.format : 'Date'
  @sap.label : 'CREATEDDT'
  @sap.quickinfo : 'Created Date'
  Createddate : Date;
  @sap.label : 'CREATEDTIME'
  @sap.quickinfo : 'Created Time'
  Createdtime : Time;
  @sap.display.format : 'UpperCase'
  @sap.label : 'ZCHANGEDBY1'
  @sap.quickinfo : 'CHANGED BY'
  Changedby : String(30);
  @sap.display.format : 'Date'
  @sap.label : 'ZCHANGEDDATE1'
  @sap.quickinfo : 'CHANGED DATE'
  Changeddate : Date;
  @sap.label : 'ZCHANGEDTIME1'
  @sap.quickinfo : 'CHANGED TIME'
  Changedtime : Time;
};

