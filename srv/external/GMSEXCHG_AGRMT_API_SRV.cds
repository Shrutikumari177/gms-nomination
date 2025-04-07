/* checksum : e710f70493773f36b592a39100f3dfaa */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.supported.formats : 'atom json xlsx'
service GMSEXCHG_AGRMT_API_SRV {};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.addressable : 'false'
@sap.content.version : '1'
entity GMSEXCHG_AGRMT_API_SRV.AssignSD {
  @sap.unicode : 'false'
  @sap.label : 'Exchange no.'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key ExgNumber : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Sales Document'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  DocNumber : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Message type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ReturnType : String(1) not null;
  @sap.unicode : 'false'
  @sap.label : 'Message Text'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ReturnMessage : String(220) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.addressable : 'false'
@sap.content.version : '1'
entity GMSEXCHG_AGRMT_API_SRV.AssignMM {
  @sap.unicode : 'false'
  @sap.label : 'Exchange no.'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key ExgNumber : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Purchasing Doc.'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  PoNumber : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'Message type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ReturnType : String(1) not null;
  @sap.unicode : 'false'
  @sap.label : 'Message Text'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ReturnMessage : String(220) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity GMSEXCHG_AGRMT_API_SRV.ExchangeAgreementSet {
  @sap.unicode : 'false'
  @sap.label : 'Exchange no.'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key ExchangeNumber : String(10) not null;
  @sap.display.format : 'Date'
  @sap.unicode : 'false'
  @sap.label : 'Starting date'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  StartOn : Date;
  @sap.display.format : 'Date'
  @sap.unicode : 'false'
  @sap.label : 'Closing date'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  CloseOn : Date;
  @sap.unicode : 'false'
  @sap.label : 'Exchange type'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ExchangeType : String(4) not null;
  @sap.unicode : 'false'
  @sap.label : 'Exg.partner'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  ExchangePartner : String(10) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
entity GMSEXCHG_AGRMT_API_SRV.TransAgreemSet {
  @sap.unicode : 'false'
  @sap.label : 'SalesCont'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Salescontract : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'PurCont'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Purchasecontract : String(10) not null;
  @sap.unicode : 'false'
  @sap.label : 'ExchangeCo'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Exchangecont : String(10) not null;
};

