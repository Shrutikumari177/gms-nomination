using GMSNOMINATIONS_SRV from './external/GMSNOMINATIONS_SRV.cds';

service GMSNOMINATIONS_SRVSampleService {
    
    entity nomi_SaveSet as projection on GMSNOMINATIONS_SRV.nomi_SaveSet
    {        Timestamp, Contracttype, key Gasday, Pdnq, Source, Zstat, Transys, key Vbeln, ItemNo, NomItem, Versn, DeliveryPoint, RedelivryPoint, Shiptoparty, Vendor, ValidTo, ValidFrom, Material, Nomtk, Kunnr, Auart, Ddcq, Rdcq, Uom1, Event, Adnq, Rpdnq, Znomtk, Src, Remarks, Flag, Action, Path, CustGrp, SrvProfile, Createdby, Createddate, Createdtime, Changedby, Changeddate, Changedtime     }    
;
    
    entity xGMSxCREATENOMINATION as projection on GMSNOMINATIONS_SRV.xGMSxCREATENOMINATION
    {        key Gasday, key Vbeln, key ItemNo, key NomItem, key Versn, key DeliveryPoint, key RedelivryPoint, shiptoparty, vendor, ValidTo, ValidFrom, Material, Nomtk, Kunnr, Auart, Ddcq, Rdcq, Uom1, Event, Adnq, Pdnq, Rpdnq, Znomtk, Src, Remarks, Flag, Action, Path, CustGrp, SrvProfile, ContractType, Createdby, Createddate, Createdtime, Changedby, Changeddate, Changedtime     }    
;
    
    entity xGMSxFETCHNOMINATION as projection on GMSNOMINATIONS_SRV.xGMSxFETCHNOMINATION
    {        key DocNo, key Item, key Delivery_Point, key Redelivery_Point, key Material, key Delivery_Dcq, key Redelivery_Dcq, key Valid_Form, key Valid_To, Profile, Contract_Description, UOM, nomtk, Auart, Vendor, Calculated_Value, Contracttype, Clause_Code, SoldToParty     }    
;
    
    entity znom_headSet as projection on GMSNOMINATIONS_SRV.znom_headSet
    {        Gasday, key Vbeln     }    
;
}