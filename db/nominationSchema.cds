


namespace app.gms.nomination;

using {
    managed,
    cuid
} from '@sap/cds/common';


entity transportAgreementDetail {
    key salesNumber    : String;
        purchaseNumber : String;
        exchangeNumber : String;
}
