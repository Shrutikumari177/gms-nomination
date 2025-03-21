


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
entity systemNomination {
    key Vbeln           : String;   // Contract Number
    key RedelivryPoint  : String;   // Unique Redelivery Point per Contract
        soldToParty     : String;
        Material        : String;
        Rdcq           : Decimal;
        Uom            : String;
        Rpdnq          : Decimal;
   key     ValidFrom      : Date;
   key     ValidTo        : Date;
}

