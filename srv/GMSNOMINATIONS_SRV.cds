using GMSNOMINATIONS_SRV from './external/GMSNOMINATIONS_SRV.cds';

service GMSNOMINATIONS_SRVSampleService {
    @readonly
    entity xGMSxCREATENOMINATION as projection on GMSNOMINATIONS_SRV.xGMSxCREATENOMINATION
    {        key Vbeln, key Gasday, key item_no, Versn, CustomerName, NomItem, shiptoparty, vendor, kunnr, DeliveryPoint, RedelivryPoint, ValidTo, ValidFrom, Zstat, Material, Nomtk, Auart, Transys, Ddcq, Rdcq, Uom1, Pdnq, Event, Adnq, Rpdnq, Znomtk, Src, Remarks, Flag, Action, Path, Source, CustGrp, Timestamp, SrvProfile, Contracttype     }    
;
    @readonly
    entity xGMSxFETCHNOMINATION as projection on GMSNOMINATIONS_SRV.xGMSxFETCHNOMINATION
    {        key DocNo, key Item, key Delivery_Point, key Redelivery_Point, key Material, key Delivery_Dcq, key Redelivery_Dcq, key Valid_Form, key Valid_To, Profile, Contract_Description, UOM, nomtk, Auart, Vendor, Calculated_Value, Contracttype, Clause_Code, SoldToParty     }    
;
}