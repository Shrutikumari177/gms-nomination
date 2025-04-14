using GMSNOMINATIONS_SRV from './external/GMSNOMINATIONS_SRV.cds';

service GMSNOMINATIONS_SRVSampleService {
    @readonly
    entity xGMSxCREATENOMINATION as projection on GMSNOMINATIONS_SRV.xGMSxCREATENOMINATION
    {        key Vbeln, key Gasday, key item_no, Versn, CustomerName, NomItem, shiptoparty, vendor, kunnr, DeliveryPoint, RedelivryPoint, ValidTo, ValidFrom, Zstat, Material, Nomtk, Auart, Transys, Ddcq, Rdcq, Uom1, Pdnq, Event, Adnq, Rpdnq, Znomtk, Src, Remarks, Flag, Action, Path, Source, CustGrp, Timestamp, SrvProfile, Contracttype     }    
;
}