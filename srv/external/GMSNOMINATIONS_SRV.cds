/* checksum : b9fcff73a3c8571032679d29ac52552f */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service GMSNOMINATIONS_SRV {};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity GMSNOMINATIONS_SRV.Nom_DetailSet {
  @sap.unicode : 'false'
  @sap.label : 'DocumentNo'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Vbeln : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Redelivery Point'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Redelivrypoint : String(10) not null;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Valid From'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key ValidFrom : Timestamp not null;
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Valid To'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key ValidTo : Timestamp not null;
  @sap.unicode : 'false'
  @sap.label : 'Sold To Party'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  SoldToParty : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Material'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Material : String(40) not null;
  @sap.unicode : 'false'
  @sap.label : 'DNQ'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  DpDnq : Decimal(13, 3) not null;
  @sap.unicode : 'false'
  @sap.label : 'UOM'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Uom : String(5) not null;
  @sap.unicode : 'false'
  @sap.label : 'DNQ'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  RpDnq : Decimal(13, 3) not null;
  @sap.unicode : 'false'
  @sap.label : 'Delivery Point'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  DeliveryPoint : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Event'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Event : String(100) not null;
  @sap.unicode : 'false'
  @sap.label : 'Created By'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Createdby : String(15);
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Created Date'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Createddate : Timestamp;
  @sap.unicode : 'false'
  @sap.label : 'Created Time'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Createdtime : Time;
  @sap.unicode : 'false'
  @sap.label : 'Changed By'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Changedby : String(15);
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Change Date'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Changeddate : Timestamp;
  @sap.unicode : 'false'
  @sap.label : 'Change Time'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Changedtime : Time;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity GMSNOMINATIONS_SRV.nomi_SaveSet {
  @sap.display.format : 'Date'
  @sap.unicode : 'false'
  @sap.label : 'Gas Day'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Gasday : Date not null;
  @sap.unicode : 'false'
  @sap.label : 'Sales Document'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Vbeln : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Document Type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Contracttype : String(1) not null;
  @odata.Type : 'Edm.DateTime'
  @sap.unicode : 'false'
  @sap.label : 'Time Stamp'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Timestamp : DateTime;
  @sap.unicode : 'false'
  @sap.unit : 'Uom1'
  @sap.label : 'DNQ'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Pdnq : Decimal(13, 3) not null;
  @sap.unicode : 'false'
  @sap.label : 'Source'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Source : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Status'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Zstat : String(4) not null;
  @sap.unicode : 'false'
  @sap.label : 'Trans system'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Transys : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Item'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ItemNo : String(6);
  @sap.unicode : 'false'
  @sap.label : 'Nom. key item'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  NomItem : String(10);
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
  @sap.label : 'Customer'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Shiptoparty : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Vendor'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Vendor : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Time To'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ValidTo : Time;
  @sap.unicode : 'false'
  @sap.label : 'Time From'
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
  @sap.unit : 'Uom1'
  @sap.label : 'Daily ContractQty'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Ddcq : Decimal(13, 3);
  @sap.unicode : 'false'
  @sap.unit : 'Uom1'
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
  @sap.label : 'Event Type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Event : String(40);
  @sap.unicode : 'false'
  @sap.unit : 'Uom1'
  @sap.label : 'Approved DNQ'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Adnq : Decimal(13, 3);
  @sap.unicode : 'false'
  @sap.unit : 'Uom1'
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
  @sap.label : 'Created By'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Createdby : String(15);
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Created Date'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Createddate : Timestamp;
  @sap.unicode : 'false'
  @sap.label : 'Created Time'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Createdtime : Time;
  @sap.unicode : 'false'
  @sap.label : 'Changed By'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Changedby : String(15);
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Change Date'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Changeddate : Timestamp;
  @sap.unicode : 'false'
  @sap.label : 'Change Time'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Changedtime : Time;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity GMSNOMINATIONS_SRV.znom_headSet {
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
  nomi_toitem : Association to many GMSNOMINATIONS_SRV.nomi_SaveSet {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Create Nomination Data'
entity GMSNOMINATIONS_SRV.xGMSxCREATENOMINATION {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales document'
  @sap.quickinfo : 'Sales Document'
  key Vbeln : String(10) not null;
  @sap.display.format : 'Date'
  @sap.label : 'Gas Day'
  @sap.quickinfo : 'Gas Day Date'
  key Gasday : Date not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Sales Document Item'
  key item_no : String(6) not null;
  Versn : String(3);
  @sap.label : 'Name of Supplier'
  CustomerName : String(80);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Nomination key item'
  @sap.quickinfo : 'Nomination Key Item'
  NomItem : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Customer'
  @sap.quickinfo : 'Customer Number'
  shiptoparty : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Vendor'
  @sap.quickinfo : 'Account Number of Vendor or Creditor'
  vendor : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sold-To Party'
  kunnr : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Delivery Point'
  DeliveryPoint : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Redelivery Point'
  @sap.quickinfo : 'Re-Delivery Ponit'
  RedelivryPoint : String(20);
  @sap.label : 'Time To'
  @sap.quickinfo : 'Nomination Time'
  ValidTo : Time;
  @sap.label : ''
  @sap.quickinfo : 'Time From'
  ValidFrom : Time;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Status'
  Zstat : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  Material : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Nomination key'
  @sap.quickinfo : 'Nomination (technical) Key'
  Nomtk : String(20);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales Document Type'
  Auart : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Transport system'
  Transys : String(10);
  @sap.unit : 'Uom1'
  @sap.label : 'Daily ContractQty'
  @sap.quickinfo : 'DCQ'
  Ddcq : Decimal(13, 3);
  @sap.unit : 'Uom1'
  @sap.label : ''
  @sap.quickinfo : 'RDCQ'
  Rdcq : Decimal(13, 3);
  @sap.label : 'Unit of Measure'
  @sap.quickinfo : 'Unit of Measurement'
  @sap.semantics : 'unit-of-measure'
  Uom1 : String(3);
  @sap.unit : 'Uom1'
  @sap.label : 'DNQ'
  @sap.quickinfo : 'daily nomination Quantity'
  Pdnq : Decimal(13, 3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Event Type'
  @sap.quickinfo : 'Nomination Event'
  Event : String(40);
  @sap.unit : 'Uom1'
  @sap.label : 'Approved DNQ'
  Adnq : Decimal(13, 3);
  @sap.unit : 'Uom1'
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
  @sap.label : 'Source'
  Source : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Customer Group'
  CustGrp : String(10);
  @odata.Type : 'Edm.DateTimeOffset'
  @sap.label : 'Short Time Stamp'
  @sap.quickinfo : 'UTC Time Stamp in Short Form (YYYYMMDDhhmmss)'
  Timestamp : DateTime;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Service Profile'
  SrvProfile : String(20);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Document Type'
  Contracttype : String(1);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Fetch Nomination'
entity GMSNOMINATIONS_SRV.xGMSxFETCHNOMINATION {
  @sap.display.format : 'UpperCase'
  @sap.label : 'DocumentNo'
  @sap.quickinfo : 'Document Number'
  key DocNo : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Sales Document Item'
  key Item : String(6) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Delivery Point'
  key Delivery_Point : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Redelivery Point'
  key Redelivery_Point : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  key Material : String(40) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Delivery DCQ'
  key Delivery_Dcq : String(30) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'ReDelivery DCQ'
  @sap.quickinfo : 'Redelivery DCQ'
  key Redelivery_Dcq : String(30) not null;
  @sap.display.format : 'Date'
  @sap.label : 'Valid From'
  key Valid_Form : Date not null;
  @sap.display.format : 'Date'
  @sap.label : 'Valid To'
  key Valid_To : Date not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Service Profile'
  Profile : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales Contract Descr'
  @sap.quickinfo : 'Sales Contract Description'
  Contract_Description : String(20);
  @sap.label : 'Target Quantity UoM'
  @sap.semantics : 'unit-of-measure'
  UOM : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Nomination key'
  @sap.quickinfo : 'Nomination (technical) Key'
  nomtk : String(20);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales Document Type'
  Auart : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Vendor'
  @sap.quickinfo : 'Vendor''s account number'
  Vendor : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Calculated Value'
  Calculated_Value : String(20);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Document Type'
  Contracttype : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Service Parameter'
  Clause_Code : String(20);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sold-To Party'
  SoldToParty : String(10);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'FETCH FOR NOM DETAIL API'
entity GMSNOMINATIONS_SRV.xGMSxNOMDETAILS {
  @sap.display.format : 'UpperCase'
  @sap.label : 'DocumentNo'
  @sap.quickinfo : 'Document Number'
  key Vbeln : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Redelivery Point'
  key Redelivrypoint : String(10) not null;
  @sap.display.format : 'Date'
  @sap.label : 'Valid From'
  key ValidFrom : Date not null;
  @sap.display.format : 'Date'
  @sap.label : 'Valid To'
  key ValidTo : Date not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sold To Party'
  SoldToParty : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  Material : String(40);
  @sap.label : 'DNQ'
  @sap.quickinfo : 'daily nomination Quantity'
  DpDnq : Decimal(13, 3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'UOM'
  @sap.quickinfo : 'Unit of Measurment'
  Uom : String(5);
  @sap.label : 'DNQ'
  @sap.quickinfo : 'daily nomination Quantity'
  RpDnq : Decimal(13, 3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Delivery Point'
  DeliveryPoint : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Event'
  @sap.quickinfo : 'Capasity Release Event'
  Event : String(100);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Created By'
  Createdby : String(15);
  @sap.display.format : 'Date'
  @sap.label : 'Created Date'
  Createddate : Date;
  @sap.label : 'Created Time'
  Createdtime : Time;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Changed By'
  Changedby : String(15);
  @sap.display.format : 'Date'
  @sap.label : 'Change Date'
  @sap.quickinfo : 'Changed Date'
  Changeddate : Date;
  @sap.label : 'Change Time'
  @sap.quickinfo : 'Changed Time'
  Changedtime : Time;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'CDS for Service profile'
entity GMSNOMINATIONS_SRV.xGMSxSERVPROFILE {
  @sap.display.format : 'UpperCase'
  @sap.label : 'DocumentNo'
  @sap.quickinfo : 'Document Number'
  key Vbeln : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Sales Document Item'
  key ItemNo : String(6) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Service Parameter'
  key ServiceParam : String(20) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Version'
  key Versn : String(3) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Service Profile'
  ServProfile : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Parameter Type'
  ParamType : String(20);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Parameter Value'
  @sap.quickinfo : 'Service Parameter Value'
  ParamValue : String(50);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Created By'
  Createdby : String(15);
  @sap.display.format : 'Date'
  @sap.label : 'Change Date'
  @sap.quickinfo : 'Changed Date'
  Createddate : Date;
  @sap.label : 'Created Time'
  Createdtime : Time;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Changed By'
  Changedby : String(15);
  @sap.display.format : 'Date'
  @sap.label : 'Change Date'
  @sap.quickinfo : 'Changed Date'
  Changeddate : Date;
  @sap.label : 'Change Time'
  @sap.quickinfo : 'Changed Time'
  Changedtime : Time;
};

