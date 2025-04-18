using {GMS_CONFIG} from './external/GMS_CONFIG';
using GMSNOMCP_GMS_SRV from './external/GMSNOMCP_GMS_SRV.cds';
using {app.gms.nomination as db} from '../db/nominationSchema';
using ZNOM_CREATE_SRV from './external/ZNOM_CREATE_SRV.cds';
using GMSNOMINATIONS_SRV from './external/GMSNOMINATIONS_SRV.cds';
using GMSEXCHG_AGRMT_API_SRV from './external/GMSEXCHG_AGRMT_API_SRV.cds';


//  @(requires: 'system-user')
service nominationServices {


    entity VirtualNominations : NominationDataType {
        key Gasday : Date;
        key Vbeln  : String;
    }


    // action handleSystemNomination ( ) returns String;


    function getNominationsByCustomer(SoldToParty : String)                                                           returns array of String;
    function getContractDetailsAndPastNom(DocNo : String)                                                             returns array of String;
    function getContractDetail(DocNo : String, Material : String, Redelivery_Point : String)                          returns array of String;
    function getMinMaxDCQByGasDate(Gasday : Date,DocNo : String, Material : String, Redelivery_Point : String)                          returns array of String;

    function getContractMatDetailsByGasday(Gasday : Date, DocNo : String)                                             returns array of String;
    function getRenominationContractData(DocNo : String, Material : String, Redelivery_Point : String, Gasday : Date) returns array of String;
    function getContractsByCustomerNDocType(SoldToParty : String, DocTyp : String)                                    returns array of String;
    function getPastNominationdata(DocNo : String, Material : String)  returns array of String;


    type NominationDataType {
        Contracttype   : String;
        Source         : String;
        Gasday         : Date;
        Vbeln          : String;
        ItemNo         : String;
        NomItem        : String;
        DeliveryPoint  : String;
        RedelivryPoint : String;
        ValidTo        : Time;
        ValidFrom      : Time;
        Material       : String;
        Timestamp      : Timestamp;
        Nomtk          : String;
        Kunnr          : String;
        Auart          : String;
        Ddcq           : Decimal;
        Rdcq           : Decimal;
        Uom1           : String;
        Pdnq           : Decimal;
        Event          : String;
        Adnq           : Decimal;
        Rpdnq          : Decimal;
        Znomtk         : String;
        Src            : String;
        Remarks        : String;
        Flag           : String;
        Action         : String;
        Path           : String;
        CustGrp        : String;
        SrvProfile     : String;
        Shiptoparty    : String;
        Vendor         : String;

    }

    action   updateNomination(nominations : array of NominationDataType)                                              returns String;

    entity ZNOMCPDATA                    as
        projection on ZNOM_CREATE_SRV.ZNOMCPDATA {
            key Gasday,
            key Vbeln,
                ItemNo,
                NomItem,
                Versn,
                DeliveryPoint,
                RedelivryPoint,
                ValidTo,
                ValidFrom,
                Material,
                Timestamp,
                Nomtk,
                Kunnr,
                Auart,
                Ddcq,
                Rdcq,
                Uom1,
                Pdnq,
                Event,
                Adnq,
                Rpdnq,
                Znomtk,
                Src,
                Remarks,
                Flag,
                Action,
                Path,
                CustGrp,
                SrvProfile,
                Time2,
                Createdby,
                Createddate,
                Createdtime,
                Changedby,
                Changeddate,
                Changedtime
        };


    // entity nomi_SaveSet                  as
    //     projection on ZNOM_CREATE_SRV.nomi_SaveSet {
    //             Gasday,
    //         key Vbeln,
    //             ItemNo,
    //             NomItem,
    //             Versn,
    //             DeliveryPoint,
    //             RedelivryPoint,
    //             ValidTo,
    //             ValidFrom,
    //             Material,
    //             Timestamp,
    //             Nomtk,
    //             Kunnr,
    //             Auart,
    //             Ddcq,
    //             Rdcq,
    //             Uom1,
    //             Pdnq,
    //             Event,
    //             Adnq,
    //             Rpdnq,
    //             Znomtk,
    //             Src,
    //             Remarks,
    //             Flag,
    //             Action,
    //             Path,
    //             CustGrp,
    //             SrvProfile,
    //             Time2
    //     };

    // entity znom_headSet                  as
    //     projection on ZNOM_CREATE_SRV.znom_headSet {
    //         key Gasday,
    //         key Vbeln,
    //             nomi_toitem
    //     };

    entity ZNOMMASTER6                   as
        projection on GMSNOMCP_GMS_SRV.ZNOMMASTER6 {
            key Vbeln,
            key ItemNo,
            key Material,
            key ServProfile,
                MaterialName,
                DCQ,
                UOM
        };

    entity ZNOMMASTER5                   as
        projection on GMSNOMCP_GMS_SRV.ZNOMMASTER5 {
            key Vbeln,
            key Customer,
                Vbeln_p,
                Vbeln_s,
                CustomerName,
                Auart,
                ValidFrom,
                ValidTo,
                ContractDescription,
                DocType
        };

    entity nomi_SaveSet                  as
        projection on GMSNOMINATIONS_SRV.nomi_SaveSet {
                Timestamp,
                Contracttype,
            key Gasday,
                Pdnq,
                Source,
                Zstat,
                Transys,
            key Vbeln,
                ItemNo,
                NomItem,
                Versn,
                DeliveryPoint,
                RedelivryPoint,
                Shiptoparty,
                Vendor,
                ValidTo,
                ValidFrom,
                Material,
                Nomtk,
                Kunnr,
                Auart,
                Ddcq,
                Rdcq,
                Uom1,
                Event,
                Adnq,
                Rpdnq,
                Znomtk,
                Src,
                Remarks,
                Flag,
                Action,
                Path,
                CustGrp,
                SrvProfile,
                Createdby,
                Createddate,
                Createdtime,
                Changedby,
                Changeddate,
                Changedtime
        };

      entity xGMSxCREATENOMINATION as projection on GMSNOMINATIONS_SRV.xGMSxCREATENOMINATION
    {        key Vbeln, key Gasday, key item_no, Versn, CustomerName, NomItem, shiptoparty, vendor, kunnr, DeliveryPoint, RedelivryPoint, ValidTo, ValidFrom, Zstat, Material, Nomtk, Auart, Transys, Ddcq, Rdcq, Uom1, Pdnq, Event, Adnq, Rpdnq, Znomtk, Src, Remarks, Flag, Action, Path, Source, CustGrp, Timestamp, SrvProfile, Contracttype     }    
;
    // entity xGMSxFETCHNOMINATION          as
    //     projection on GMSNOMINATIONS_SRV.xGMSxFETCHNOMINATION {
    //         key DocNo,
    //         key Item,
    //         key Delivery_Point,
    //         key Redelivery_Point,
    //         key Material,
    //         key Delivery_Dcq,
    //         key Redelivery_Dcq,
    //         key Valid_Form,
    //         key Valid_To,
    //             Profile,
    //             Contract_Description,
    //             UOM,
    //             nomtk,
    //             Auart,
    //             Vendor,
    //             Calculated_Value,
    //             Contracttype,
    //             Clause_Code,
    //             SoldToParty
    //     };
    entity xGMSxFETCHNOMINATION as projection on GMSNOMINATIONS_SRV.xGMSxFETCHNOMINATION
    {        key DocNo, key Item, key Delivery_Point, key Redelivery_Point, key Material, key Delivery_Dcq, key Redelivery_Dcq, key Valid_From_DCQ, key Valid_To_DCQ, Profile, Contract_Description, UOM, nomtk, Auart, Vendor, Valid_From_Cont, Valid_To_Cont, Calculated_Value, Contracttype, Clause_Code, SoldToParty     }    
;
    entity znom_headSet                  as
        projection on GMSNOMINATIONS_SRV.znom_headSet {
                Gasday,
            key Vbeln,
                nomi_toitem
        };


    entity ZNOMMASTER15                  as
        projection on GMSNOMCP_GMS_SRV.ZNOMMASTER15 {
            key ExchangeAgreement,
            key PurchasingDocument,
            key SalesDocument,
                PurchasingOrganization,
                ValidFrom,
                ValidTo,
                PurchaseContractCreationDate,
                PurchaseContractCreatedByUser,
                PurchaseContractText,
                SalesOrganization,
                SalesContractCreationDate,
                SalesContractCreatedByUser,
                SalesContractText
        };

    entity ZNOMMASTER14                  as
        projection on GMSNOMCP_GMS_SRV.ZNOMMASTER14 {
            key Customer,
                CustomerName,
                CorrespondingCustomer,
                CorrespondingCustomerName
        };

    entity ZNOMMASTER10                  as
        projection on GMSNOMCP_GMS_SRV.ZNOMMASTER10 {
            key Vbeln,
            key ItemNo,
            key Material,
            key ClauseCode,
            key Path,
                ValidFrom,
                ValidTo,
                ThresholdP,
                ThreshRef,
                Remark,
                CalculatedValue,
                DocType
        };


    entity ZNOMMASTER8                   as
        projection on GMSNOMCP_GMS_SRV.ZNOMMASTER8 {
            key Customer,
                CustomerName,
                Supplier,
                SupplierName,
                to_contract,

        };


    entity xGMSxGMS_nom                  as
        projection on GMSNOMCP_GMS_SRV.xGMSxGMS_nom {
            key Gasday,
            key deliveryPoint,
            key Redelivery,
            key Vbeln,
            key Posnr,
            key Versn,
                Timestamp,
                Nomtk,
                Kunnr,
                Auart,
                Rank,
                Time2,
                Dcq,
                Uom1,
                PDnq,
                Uom2,
                Event,
                Adnq,
                Rpdnq,
                Uom4,
                Znomtk,
                Zstat,
                Dtolp,
                Dtolq,
                ZpotentialSf,
                Src,
                Remarks,
                Flag,
                Action,
                Srvparam1,
                Srvparam2,
                Path,
                CustGrp,
                SrvProfile,
                Material,
                Transys
        };

    entity xGMSxPast_Nom                 as
        projection on GMSNOMCP_GMS_SRV.xGMSxPast_Nom {
            key Gasday,
            key Vbeln,
            key Versn,
                Nomtk,
                Material,
                Material_Description,
                Adnq,
                Rpdnq,
                Uom4
        };

    entity znompudelivery                as
        projection on GMSNOMCP_GMS_SRV.znompudelivery {
            key Vbeln,
            key ItemNo,
            key Material,
                DeliveryPt,
                RedeliveryPt
        };

    entity TransAgreemSet                as
        projection on GMSEXCHG_AGRMT_API_SRV.TransAgreemSet {
            key Salescontract,
                Purchasecontract,
                Exchangecont
        };

entity xGMSxNOMDETAILS as projection on GMSNOMINATIONS_SRV.xGMSxNOMDETAILS
    {        key Vbeln, key Redelivrypoint, key ValidFrom, key ValidTo, SoldToParty, Material, DpDnq, Uom, RpDnq, DeliveryPoint, Event, Createdby, Createddate, Createdtime, Changedby, Changeddate, Changedtime     }    
;
    
    entity Nom_DetailSet as projection on GMSNOMINATIONS_SRV.Nom_DetailSet
    {        key Vbeln, key Redelivrypoint, key ValidFrom, key ValidTo, SoldToParty, Material, DpDnq, Uom, RpDnq, DeliveryPoint, Event, Createdby, Createddate, Createdtime, Changedby, Changeddate, Changedtime     }    
;


    entity pathAndFuelMapping            as projection on GMS_CONFIG.pathAndFuelMapping;
    entity DocumentNoProfileMapping      as projection on GMS_CONFIG.DocumentNoProfileMapping;
    entity Nominationlogic               as projection on GMS_CONFIG.Nominationlogic;
    entity serviceProfileParametersItems as projection on GMS_CONFIG.serviceProfileParametersItems;
    entity ServiceProfileMaster          as projection on GMS_CONFIG.ServiceProfileMaster;
    entity transportAgreementDetail      as projection on db.transportAgreementDetail;
    entity systemNomination              as projection on db.systemNomination;


}
