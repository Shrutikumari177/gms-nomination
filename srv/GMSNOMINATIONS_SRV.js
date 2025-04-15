const cds = require('@sap/cds');

module.exports = async (srv) => 
{        
    // Using CDS API      
    const GMSNOMINATIONS_SRV = await cds.connect.to("GMSNOMINATIONS_SRV"); 
      srv.on('READ', 'xGMSxnewpast_nom', req => GMSNOMINATIONS_SRV.run(req.query)); 
}