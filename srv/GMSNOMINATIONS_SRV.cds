using GMSNOMINATIONS_SRV from './external/GMSNOMINATIONS_SRV.cds';

service GMSNOMINATIONS_SRVSampleService {
    @readonly
    entity xGMSxnewpast_nom as projection on GMSNOMINATIONS_SRV.xGMSxnewpast_nom
    {        key Vbeln, key Gasday, key item_no, Versn, Adnq, Nomtk, Uom, Material, Material_Description, Rpdnq     }    
;
}