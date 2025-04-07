using GMSEXCHG_AGRMT_API_SRV from './external/GMSEXCHG_AGRMT_API_SRV.cds';

service GMSEXCHG_AGRMT_API_SRVSampleService {
    
    entity TransAgreemSet as projection on GMSEXCHG_AGRMT_API_SRV.TransAgreemSet
    {        key Salescontract, Purchasecontract, Exchangecont     }    
;
}