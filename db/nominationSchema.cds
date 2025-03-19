


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

entity systemNomination{
    key Vbeln : String;
        soldToParty :String;
        Material :String;
        Rdcq :Decimal;
        Uom :String;
        RedelivryPoint:String;
        Rpdnq :Decimal;
        ValidTo: Time;
        ValidFrom: Time;

}