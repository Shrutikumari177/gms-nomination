const cds = require('@sap/cds');

module.exports = async (srv) => 
{        
    // Using CDS API      
    const GMSEXCHG_AGRMT_API_SRV = await cds.connect.to("GMSEXCHG_AGRMT_API_SRV"); 
      srv.on('READ', 'TransAgreemSet', req => GMSEXCHG_AGRMT_API_SRV.run(req.query)); 
}