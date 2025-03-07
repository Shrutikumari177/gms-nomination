using GMSNOMINATIONS_SRV from './external/GMSNOMINATIONS_SRV.cds';

service GMSNOMINATIONS_SRVSampleService {
    @readonly
    entity nomi_SaveSet as projection on GMSNOMINATIONS_SRV.nomi_SaveSet
    {        key Gasday, key Vbeln, ItemNo, NomItem, Versn, DeliveryPoint, RedelivryPoint, ValidTo, ValidFrom, Material, Timestamp, Nomtk, Kunnr, Auart, Ddcq, Rdcq, Uom1, Pdnq, Event, Adnq, Rpdnq, Znomtk, Src, Remarks, Flag, Action, Path, CustGrp, SrvProfile, Createdby, Createddate, Createdtime, Changedby, Changeddate, Changedtime     }    
;
    @readonly
    entity xGMSxCREATENOMINATION as projection on GMSNOMINATIONS_SRV.xGMSxCREATENOMINATION
    {        key Gasday, key Vbeln, key ItemNo, key NomItem, key Versn, key DeliveryPoint, key RedelivryPoint, ValidTo, ValidFrom, Material, Timestamp, Nomtk, Kunnr, Auart, Ddcq, Rdcq, Uom1, Pdnq, Event, Adnq, Rpdnq, Znomtk, Src, Remarks, Flag, Action, Path, CustGrp, SrvProfile, Createdby, Createddate, Createdtime, Changedby, Changeddate, Changedtime     }    
;
    @readonly
    entity xGMSxFETCHNOMINATION as projection on GMSNOMINATIONS_SRV.xGMSxFETCHNOMINATION
    {        key DocNo, key Item, key Delivery_Point, key Redelivery_Point, key Material, key Delivery_Dcq, key Redelivery_Dcq, key Valid_Form, key Valid_To, UOM, ContractDescription, Calculated_Value, Contracttype, Clause_Code, SoldToParty     }    
;
    @readonly
    entity znom_headSet as projection on GMSNOMINATIONS_SRV.znom_headSet
    {        Gasday, key Vbeln     }    
;
}